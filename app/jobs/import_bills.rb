class ImportBills
  include Worker

  class Attributes
    attr_accessor :bill, :documents
  end

  def initialize(redis = Redis.new, open_states_service = OpenStatesService.new, step_parser = BillsStepParser.new)
    @redis = redis
    @open_states_service = open_states_service
    @step_parser = step_parser
  end

  def perform
    import_date = @redis.get(:import_bills_job_date)&.to_time

    # collect the attributes
    parsed_attributes = @open_states_service
      .fetch_bills(fields: fields, updated_since: import_date)
      .map { |data| parse_attributes(data) }
      .reject(&:nil?)

    # upsert the records
    parsed_attributes.each do |attributes|
      bill = Bill.upsert_by!(:external_id, attributes.bill)

      attributes.documents.each do |attrs|
        doc_attrs = attrs.merge(bill: bill)
        Document.upsert_by!(:number, doc_attrs)
      end

      # enqueue the details job for each bill
      ImportIlgaBill.perform_async(bill.id)
    end

    @redis.set(:import_bills_job_date, Time.zone.now)
  end

  private

  def parse_attributes(data)
    # scrape out relevant ids from the ilga source url
    source_url = data['sources'].reduce(nil) do |memo, source|
      url = source['url']
      memo || url if url.starts_with?('http://ilga.gov/legislation/BillStatus.asp')
    end

    # throw out this entry if we can't find a source url
    if source_url.nil?
      info("> failed to find ilga url for #{data['bill_id']}")
      return nil
    end

    # return an attrs object with extracted bill / document data
    attrs = Attributes.new
    attrs.bill = parse_bill_attributes(source_url, data)
    attrs.documents = data['versions'].map do |version_data|
      parse_document_attributes(version_data, data)
    end

    attrs
  end

  def parse_bill_attributes(source_url, data)
    params = CGI.parse(URI.parse(source_url).query)
      .transform_values(&:first)

    bill_attrs = {
      external_id: params['LegId'],
      os_id: data['id'],
      actions: data['actions'],
      steps: @step_parser.parse(data['actions']),
      title: data['title'],
      session_number: data['session'].gsub(/[a-z]+/, '')
    }

    # use the ilga source params to generate other useful urls
    query = params.slice('GAID', 'SessionID', 'DocTypeID', 'DocNum').to_query
    bill_attrs[:details_url] = ilga_url('legislation/billstatus.asp', query)

    # use the first primary sponsor for now
    sponsor = data['sponsors'].find { |s| s['type'] == 'primary' }
    bill_attrs[:sponsor_name] = sponsor['name'] if sponsor.present?

    bill_attrs
  end

  def parse_document_attributes(version_data, data)
    document_attrs = {
      os_id: version_data['doc_id'],
      number: data['bill_id'].gsub(/\s+/, ''),
      full_text_url: version_data['url'],
      is_amendment: false
    }

    document_attrs
  end

  def ilga_url(page, query)
    "http://www.ilga.gov/#{page}?#{query}"
  end

  def fields
    @fields ||= begin
      fields = %i[
        id
        bill_id
        session
        title
        chamber
        actions
        versions
        sources
        sponsors
        type
      ]

      fields.join(',')
    end
  end
end

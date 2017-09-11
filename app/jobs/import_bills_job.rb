class ImportBillsJob
  include Worker

  class Attributes
    attr_accessor :bill, :documents, :actions
  end

  def initialize(redis = Redis.new, service = OpenStatesService.new)
    @redis = redis
    @service = service
  end

  def perform
    import_date = @redis.get(:import_bills_job_date)&.to_time

    # collect the attributes
    parsed_attributes = @service
      .fetch_bills(fields: fields, updated_since: import_date)
      .map { |data| parse_attributes(data) }
      .reject(&:nil?)

    # upsert the records
    parsed_attributes.each do |attributes|
      bill = Bill.upsert_by!(:external_id, attributes.bill)
      bill.actions.delete_all

      attributes.actions.each do |attrs|
        action_attrs = attrs.merge(bill: bill)
        Action.create!(action_attrs)
      end

      attributes.documents.each do |attrs|
        doc_attrs = attrs.merge(bill: bill)
        Document.upsert_by!(:number, doc_attrs)
      end

      # enqueue the details job for each bill
      ImportBillDetailsJob.perform_async(bill.id)
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

    # update the attrs map with extracted bill / document data
    attrs = Attributes.new
    response = parse_bill_attributes(source_url, data)
    attrs.bill = response['bill_attrs']

    attrs.actions = response['actions'].map do |action_data|
      parse_action_attributes(action_data)
    end

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
      title: data['title'],
      session_number: data['session'].gsub(/[a-z]+/, '')
    }

    # use the ilga source params to generate other useful urls
    query = params.slice('GAID', 'SessionID', 'DocTypeID', 'DocNum').to_query
    bill_attrs[:details_url] = ilga_url('legislation/billstatus.asp', query)

    # use the first primary sponsor for now
    sponsor = data['sponsors'].find { |s| s['type'] == 'primary' }
    bill_attrs[:sponsor_name] = sponsor['name'] if sponsor.present?

    {
    'bill_attrs' => bill_attrs,
    'actions' => data['actions']
    }

  end

  def parse_action_attributes(action_data)
    action_attrs = {
      name: action_data['action'],
      stage: action_data['actor'],
      action_type: action_data['type'].last,
      datetime: DateTime.parse(action_data['date'])
    }

    action_attrs
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

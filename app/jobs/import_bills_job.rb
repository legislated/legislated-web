class ImportBillsJob
  include Worker

  def redis
    @redis ||= Redis.new
  end

  def service
    @service ||= OpenStatesService.new
  end

  def perform
    import_date = redis.get(:import_bills_job_date)&.to_time

    bill_attrs = service
      .fetch_bills(fields: fields, updated_since: import_date)
      .map { |data| parse_attributes(data) }
      .compact

    bill_attrs.each do |attrs|
      bill = Bill.find_or_initialize_by(attrs.slice(:external_id))
      bill.assign_attributes(attrs)
      bill.save!
    end

    redis.set(:import_bills_job_date, Time.zone.now)
  end

  private

  def parse_attributes(data)
    # scrape out relevant ids from the ilga source url
    source_url = data['sources'].reduce(nil) do |memo, source|
      url = source['url']
      memo || url if url.starts_with?('http://ilga.gov/legislation/BillStatus.asp')
    end

    # throw out this entry if we can't find a
    if source_url.blank?
      info("> failed to find ilga url for #{data['bill_id']}")
      return nil
    end

    params = CGI.parse(URI.parse(source_url).query)
      .transform_values(&:first)

    attrs = {
      external_id: params['LegId'],
      os_id: data['id'],
      title: data['title'],
      document_number: data['bill_id'].gsub(/\s+/, ''),
      session_number: data['session'].gsub(/[a-z]+/, '')
    }

    # use the ilga source params to generate other useful urls
    query = params.slice('GAID', 'SessionID', 'DocTypeID', 'DocNum').to_query
    attrs[:details_url] = ilga_url('legislation/billstatus.asp', query)
    attrs[:full_text_url] = ilga_url('legislation/fulltext.asp', query)

    # use the first primary sponsor for now
    sponsor = data['sponsors'].find { |s| s['type'] == 'primary' }
    attrs[:sponsor_name] = sponsor['name'] if sponsor.present?

    attrs
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
        versions
        sources
        sponsors
        type
      ]

      fields.join(',')
    end
  end
end

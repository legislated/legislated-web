module OpenStates
  class ParseBill
    Data = Struct.new(
      :bill,
      :documents
    )

    Bill = Struct.new(
      :ilga_id,
      :os_id,
      :actions,
      :steps,
      :title,
      :session_number,
      :details_url,
      :sponsor_name
    )

    Document = Struct.new(
      :os_id,
      :number,
      :full_text_url,
      :is_amendment
    )

    def initialize(parse_steps = ParseBillSteps.new)
      @parse_steps = parse_steps
    end

    def call(data)
      # find ilga source url to scrape out relevant ids from
      source_url = data['sources'].reduce(nil) do |memo, source|
        url = source['url']
        memo || url if url.starts_with?('http://ilga.gov/legislation/BillStatus.asp')
      end

      # throw out this entry if we can't find a source url
      if source_url.nil?
        info("> failed to find ilga url for #{data['bill_id']}")
        return nil
      end

      # return extracted bill & document data
      Data.new(
        parse_bill(data, source_url),
        parse_documents(data)
      )
    end

    private

    attr_reader :parse_steps

    def parse_bill(data, source_url)
      params = parse_query(source_url)

      details_url = ilga_url(
        'legislation/billstatus.asp',
        params.slice('GAID', 'SessionID', 'DocTypeID', 'DocNum')
      )

      primary_sponsor = data['sponsors'].find do |sponsor|
        sponsor['type'] == 'primary'
      end

      Bill.new(
        params['LegId'], # ilga_id
        data['id'], # os_id
        data['actions'], # actions
        parse_steps.call(data['actions']), # steps
        data['title'], # title
        data['session'].gsub(/[a-z]+/, ''), # session_number
        details_url,
        primary_sponsor&.[]('name') # sponsor_name
      )
    end

    def parse_documents(data)
      data['versions'].map do |version_data|
        Document.new(
          version_data['doc_id'], # os_id
          data['bill_id'].gsub(/\s+/, ''), # number
          version_data['url'], # full_text_url
          false # is_amendment
        )
      end
    end

    def parse_query(url)
      CGI.parse(URI.parse(url).query).transform_values(&:first)
    end

    def ilga_url(page, query)
      "http://www.ilga.gov/#{page}?#{query.to_query}"
    end
  end
end

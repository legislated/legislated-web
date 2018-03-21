module OpenStates
  class FetchBills
    include Request::OpenStates

    default_params({
      state: 'il',
      search_window: 'session',
      per_page: 50,
    })

    fields %i[
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

    def initialize(parse = ParseBill.new)
      @parse = parse
    end

    def call(query = {})
      updated_since = query[:updated_since]
      if !updated_since.nil?
        query[:updated_since] = updated_since.strftime('%Y-%m-%d')
      end

      bills = fetch_pages do |page_number|
        fetch_bills_page(page_number, query)
      end

      bills.map { |bill| parse.call(bill) }.reject(&:nil?)
    end

    private

    attr_reader :parse

    def fetch_bills_page(page_number, query)
      self.class.get('/bills', {
        query: query.merge({
          page: page_number
        })
      })
    end
  end
end

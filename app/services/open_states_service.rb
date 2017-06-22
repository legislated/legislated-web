require 'httparty'

class OpenStatesService
  include HTTParty
  base_uri 'https://openstates.org/api/v1'

  def initialize
    @options = {
      headers: {
        'X-API-KEY': ENV['OPEN_STATES_KEY']
      }
    }
  end

  def fetch_bills(query = {})
    result = []
    page = nil
    page_number = 1

    loop do
      page = fetch_bills_page(page_number, query)
      page_number += 1

      return result if page.blank?
      result.concat(page)
    end
  end

  private

  def fetch_bills_page(page_number, query)
    base_query = {
      state: 'il',
      page: page_number,
      per_page: 50
    }

    self.class.get('/bills', @options.deep_merge({
      query: base_query.merge(query)
    }))
  end
end

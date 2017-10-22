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
    updated_since = query[:updated_since]
    if updated_since
      query[:updated_since] = updated_since.strftime('%Y-%m-%d')
    end

    enumerate_pages do |page_number|
      fetch_bills_page(page_number, query)
    end
  end

  def fetch_legislators(query = {})
    base_query = {
      state: 'il'
    }

    result = self.class.get('/legislators', @options.deep_merge({
      query: base_query.merge(query)
    }))

    result.lazy
  end

  private

  def enumerate_pages
    enumerator = Enumerator.new do |item|
      page_number = 1

      loop do
        page = yield(page_number)
        break if page.blank?
        page_number += 1
        page.each { |record| item.yield(record) }
      end
    end

    enumerator.lazy
  end

  def fetch_bills_page(page_number, query)
    base_query = {
      state: 'il',
      search_window: 'session',
      page: page_number,
      per_page: 50
    }

    self.class.get('/bills', @options.deep_merge({
      query: base_query.merge(query)
    }))
  end
end

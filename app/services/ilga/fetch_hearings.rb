require 'httparty'

module Ilga
  class FetchHearings
    include HTTParty

    PAGE_SIZE = 50

    def self.date_option(delta: 0.days)
      date = Time.current.midnight + delta
      date.strftime('%D %T')
    end

    base_uri(
      'http://my.ilga.gov/Hearing/_GetPostedHearingsByDateRange'
    )

    headers({
      'X-Requested-With': 'XMLHttpRequest'
    })

    default_params({
      committeeid: 0,
      begindate: date_option,
      enddate: date_option(delta: 30.days)
    })

    def initialize(parse = ParseHearing.new)
      @parse = parse
    end

    def call(chamber)
      enumerator = Enumerator.new do |handler|
        page_number = 1

        loop do
          page = fetch_page(chamber, page_number)
          data = page['data']
          break if data.blank?

          page_number += 1
          data.each do |item|
            handler.yield(@parse.call(item))
          end
        end
      end

      enumerator.lazy
    end

    private

    def fetch_page(chamber, page = 1)
      response = self.class.post('', {
        body: {
          size: PAGE_SIZE,
          page: page
        },
        query: {
          chamber: chamber_key(chamber)
        }
      })

      JSON.parse(response.body)
    end

    def chamber_key(chamber)
      keys = { house: 'H', senate: 'S' }
      keys[chamber.kind.to_sym]
    end
  end
end

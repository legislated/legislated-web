require 'httparty'

module Ilga
  class FetchHearings
    include Request

    PAGE_SIZE = 50

    base_uri(
      'http://my.ilga.gov/Hearing/_GetPostedHearingsByDateRange'
    )

    headers({
      'X-Requested-With': 'XMLHttpRequest'
    })

    default_params({
      committeeid: 0
    })

    def initialize(parse = ParseHearing.new)
      @parse = parse
    end

    def call(chamber)
      hearings = fetch_pages do |page_number|
        page = fetch_page(chamber, page_number)
        page['data']
      end

      hearings.map { |hearing| parse.call(hearing) }
    end

    private

    attr_reader :parse

    def fetch_page(chamber, page_number = 1)
      response = self.class.post('', {
        body: {
          size: PAGE_SIZE,
          page: page_number
        },
        query: {
          chamber: chamber_param(chamber),
          begindate: date_param,
          enddate: date_param(delta: 30.days)
        }
      })

      JSON.parse(response.body)
    end

    def chamber_param(chamber)
      case chamber.to_sym
      when :lower
        'H'
      when :upper
        'S'
      end
    end

    def date_param(delta: 0.days)
      date = Time.current.midnight + delta
      date.strftime('%D %T')
    end
  end
end

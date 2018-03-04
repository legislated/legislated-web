require 'httparty'

module Ilga
  class FetchHearings
    include HTTParty
    base_uri 'http://my.ilga.gov/Hearing/_GetPostedHearingsByDateRange'

    def fetch(chamber, page_number)
      midnight = Time.current.midnight

      self.class.get('/Hearing/_GetPostedHearingsByDateRange', options.deep_merge({
        query: {
          chamber: chamber_key(chamber),
          committeeid: 0,
          begindate: format_datetime(midnight),
          enddate: format_datetime(midnight + 30.days)
        },
        body: {
          size: 50,
          page: page_number + 1
        }
      }))

      # transform response to map committee id
      response_data = response['data']
      response_data.reduce({}) do |memo, data|
        entry = ActiveSupport::HashWithIndifferentAccess.new(data)
        memo[entry[:CommitteeId]] = entry
        memo
      end
    end

    private

    def options
      @options ||= {
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      }
    end

    def self.chamber_key(chamber)
      keys = { house: 'H', senate: 'S' }
      keys[chamber.kind.to_sym]
    end

    def self.format_datetime(datetime)
      datetime.strftime('%D %T')
    end
  end
end

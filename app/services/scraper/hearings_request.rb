require 'httparty'

module Scraper
  module HearingsRequest
    # Fetches a page of committee hearings for the given chamber
    # Parameters:
    #   - chamber: a Chamber model to fetch hearings for
    #   - page_number: the page of committee hearings to fetch
    # Returns:
    #   - a map of committee id -> committee-hearing data
    def self.fetch(chamber, page_number)
      hearings_url = 'http://my.ilga.gov/Hearing/_GetPostedHearingsByDateRange'

      # modeled after curl request extracted from chrome
      # curl \
      #   'http://my.ilga.gov/Hearing/_GetPostedHearingsByDateRange?chamber=H&committeeid=0&begindate=03%2F08%2F2017%2000%3A00%3A00&enddate=04%2F07%2F2017%2000%3A00%3A00&nodays=30&_=1489036405367' \
      #   -H 'X-Requested-With: XMLHttpRequest' \
      #   --data 'page=2&size=50' --compressed
      midnight = Time.current.midnight
      response = HTTParty.post(hearings_url, {
        headers: {
          "X-Requested-With": 'XMLHttpRequest'
        },
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
      })

      # transform response to map committee id
      response_data = response['data']
      response_data.reduce({}) do |memo, data|
        entry = ActiveSupport::HashWithIndifferentAccess.new(data)
        memo[entry[:CommitteeId]] = entry
        memo
      end
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

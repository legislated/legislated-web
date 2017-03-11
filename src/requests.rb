require "httparty"
require "active_support/all"

module Scraper
  # sample curl request extracted from chrome
  # curl \
  #   'http://my.ilga.gov/Hearing/_GetPostedHearingsByDateRange?chamber=H&committeeid=0&begindate=03%2F08%2F2017%2000%3A00%3A00&enddate=04%2F07%2F2017%2000%3A00%3A00&nodays=30&_=1489036405367' \
  #   -H 'X-Requested-With: XMLHttpRequest' \
  #   --data 'page=2&size=50' --compressed
  module CommitteeHearingsRequest
    def self.url
      "http://my.ilga.gov/Hearing/_GetPostedHearingsByDateRange"
    end

    # fetches a page of committee hearings for the given chamber
    # returns a map of committee id -> committee-hearing data
    def self.fetch(chamber, page_number)
      start_date = DateTime.now.midnight

      response = HTTParty.post(url,
        headers: {
          "X-Requested-With": "XMLHttpRequest"
        },
        query: {
          chamber: chamber.key,
          committeeid: 0,
          begindate: format_datetime(start_date),
          enddate: format_datetime(start_date + 30.days),
        },
        body: {
          size: 50,
          page: page_number + 1
        }
      )

      # transform response to map committee id
      response_data = response["data"]
      response_data.reduce({}) do |memo, data|
        entry = ActiveSupport::HashWithIndifferentAccess.new(data)
        memo[entry[:CommitteeId]] = entry
        memo
      end
    end

    private

    def self.format_datetime(datetime)
      datetime.strftime("%D %T")
    end
  end
end

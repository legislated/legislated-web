require "json"
require_relative "./bill"
require_relative "./committee"

module Scraper
  class Hearing
    attr_accessor :id, :url, :location, :date_time, :allows_slips, :is_cancelled, :committee, :bills

    # serialization
    def to_json(*a)
      { id: id,
        url: url,
        location: location,
        date: date_time.to_s,
        is_cancelled: is_cancelled,
        allows_slips: allows_slips,
        committee: committee,
        bills: bills }.to_json(*a)
    end
  end
end

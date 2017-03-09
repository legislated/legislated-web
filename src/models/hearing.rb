require "json"
require_relative "./bill"

module Scraper
  class Hearing
    attr_accessor :url, :committee_name, :location, :date_time, :bills

    def date
      date_time&.split(" - ")&.first
    end

    def time
      date_time&.split(" - ")&.last
    end

    def to_json(*a)
      { url: url,
        committee_name: committee_name,
        location: location,
        date: date,
        time: time,
        bills: bills }.to_json(*a)
    end
  end
end

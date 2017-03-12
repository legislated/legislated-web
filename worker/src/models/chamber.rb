require "json"
require_relative "./hearing"

module Scraper
  class Chamber
    attr_accessor :name, :key, :hearings

    def initialize(attrs)
      self.key = attrs[:key]
      self.name = attrs[:name]
    end

    # accessors
    def url
      "http://my.ilga.gov/Hearing/AllHearings?chamber=#{key}"
    end

    # serialization
    def to_json(*a)
      { name: name,
        hearings: hearings }.to_json(*a)
    end
  end
end

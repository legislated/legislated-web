require "json"
require_relative "./hearing"

module Scraper
  class Chamber
    attr_accessor :url, :name, :hearings

    def initialize(attrs)
      self.url = attrs[:url]
      self.name = attrs[:name]
    end

    def to_json(*a)
      { name: name,
        hearings: hearings }.to_json(*a)
    end
  end
end

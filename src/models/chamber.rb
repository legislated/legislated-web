require_relative "./hearing"

module Scraper
  class Chamber
    attr_accessor :url, :name, :hearings

    def initialize(attrs)
      self.url = attrs[:url]
      self.name = attrs[:name]
    end
  end
end

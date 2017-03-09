require "json"

module Scraper
  module Serializer
    def self.serialize(object)
      json = object.to_json
      File.write("./slips.json", json)
    end
  end
end

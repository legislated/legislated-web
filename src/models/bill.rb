require "json"

module Scraper
  class Bill
    attr_accessor :number, :description, :sponsor_name, :witness_slip_url

    def to_json(*a)
      { number: number,
        description: description,
        sponsor_name: sponsor_name,
        witness_slip_url: witness_slip_url }.to_json(*a)
    end
  end
end

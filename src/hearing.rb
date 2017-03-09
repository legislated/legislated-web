require_relative "./bill"

module Scraper
  class Hearing
    attr_accessor :url, :committee_name, :location, :date_time, :bills
  end
end

module Scraper
  class Committee
    attr_accessor :id, :name

    def to_json(*a)
      { id: id,
        name: name }.to_json(*a)
    end
  end
end

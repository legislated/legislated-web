require "json"

module Scraper
  class Bill
    attr_accessor :id, :url, :document, :description, :synopsis, :sponsor_name, :witness_slip_url

    # accessors
    def url
      # TODO: figure out how to scrape GAID and SessionID, if possible
      "http://www.ilga.gov/legislation/BillStatus.asp?DocNum=#{document_number}&GAID=14&DocTypeID=#{document_type}&SessionID=91"
    end

    def primary_document_name
      document.split("-").first&.strip
    end

    def document_type
      primary_document_name[0..1]
    end

    def document_number
      primary_document_name[2..-1]
    end

    # serialization
    def to_json(*a)
      { id: id,
        url: url,
        document: document,
        description: description,
        synopsis: synopsis,
        sponsor_name: sponsor_name,
        witness_slip_url: witness_slip_url }.to_json(*a)
    end
  end
end

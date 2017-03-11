require "json"

module Scraper
  class Bill
    attr_accessor :id, :url, :document, :description, :sponsor_name, :witness_slip_url

    # accessors
    def primary_document_name
      document.split("-").first&.strip
    end

    def document_type
      primary_document_name[0..1]
    end

    def document_number
      primary_document_name[2..-1]
    end

    def url
      "http://www.ilga.gov/legislation/BillStatus.asp?DocNum=#{document_number}&GAID=14&DocTypeID=#{document_type}&SessionID=91"
    end

    # serialization
    def to_json(*a)
      { id: id,
        document: document,
        description: description,
        sponsor_name: sponsor_name,
        witness_slip_url: witness_slip_url }.to_json(*a)
    end
  end
end

class Bill < ApplicationRecord
  belongs_to :hearing

  # accessors
  def url
    # TODO: figure out how to scrape GAID and SessionID, if possible
    "http://www.ilga.gov/legislation/BillStatus.asp?DocNum=#{document_number}&GAID=14&DocTypeID=#{document_type}&SessionID=91"
  end

  def primary_document_name
    document_name.split("-").first&.strip
  end

  def document_type
    primary_document_name[0..1]
  end

  def document_number
    primary_document_name[2..-1]
  end
end

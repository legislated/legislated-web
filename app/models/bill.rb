class Bill < ApplicationRecord
  belongs_to :hearing

  # scopes
  scope :by_date, -> (start_date = nil) do
    start_date.present? ? ordered_by_date.where("hearings.date >= ?", start_date) : ordered_by_date
  end

  scope :ordered_by_date, -> do
    includes(:hearing).references(:hearings).order("hearings.date ASC")
  end

  # accessors
  def details_url
    doc_number = document_number.split("-").first&.strip # strip off amendment
    document_type = doc_number[0..1]
    document_index = doc_number[2..-1]

    # TODO: figure out how to scrape GAID and SessionID, if possible
    "http://www.ilga.gov/legislation/BillStatus.asp?DocNum=#{document_index}&GAID=14&DocTypeID=#{document_type}&SessionID=91"
  end
end

class Bill < ApplicationRecord
  belongs_to :hearing

  # scopes
  scope :by_date, (-> (range = {}) do
    query = includes(:hearing).references(:hearings).order('hearings.date ASC')
    query = query.where('hearings.date >= ?', range[:start]) if range[:start]
    query = query.where('hearings.date <= ?', range[:end]) if range[:end]
    query
  end)

  # accessors
  def details_url
    ilga_url('http://www.ilga.gov/legislation/billstatus.asp')
  end

  def full_text_url
    ilga_url('http://www.ilga.gov/legislation/fulltext.asp')
  end

  private

  # tacks on bill-identifiying query params
  def ilga_url(page)
    document_type, document_index = document_number.match(/(\D+)(\d+)/).captures
    # TODO: figure out how to scrape GAID and SessionID, if possible
    "#{page}?DocNum=#{document_index}&GAID=14&DocTypeID=#{document_type}&SessionID=91"
  end
end

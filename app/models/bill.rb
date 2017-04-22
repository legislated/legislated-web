class Bill < ApplicationRecord
  include PgSearch

  belongs_to :hearing

  # scopes
  pg_search_scope :by_keyword,
    against: [:title, :summary],
    using: {
      tsearch: { prefix: true }
    }

  pg_search_scope :by_fuzzy_title,
    against: :title,
    using: {
      trigram: { threshold: 0.1 }
    }

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

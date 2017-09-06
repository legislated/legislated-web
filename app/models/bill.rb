class Bill < ApplicationRecord
  include PgSearch

  # relationships
  has_many :documents
  belongs_to :hearing
  has_many :actions

  # scopes
  pg_search_scope :by_keyword, {
    against: %i[title summary],
    using: {
      tsearch: { prefix: true }
    }
  }

  pg_search_scope :by_fuzzy_title, {
    against: :title,
    using: {
      trigram: { threshold: 0.1 }
    }
  }

  scope :by_date, (-> (range = {}) do
    query = includes(:hearing).references(:hearings).order('hearings.date ASC')
    query = query.where('hearings.date >= ?', range[:start]) if range[:start]
    query = query.where('hearings.date <= ?', range[:end]) if range[:end]
    query
  end)

  # accessors
  def details_url
    self[:details_url] || ilga_url('legislation/billstatus.asp')
  end

  private

  def ilga_url(page)
    document_number = documents.first&.number
    return nil unless document_number
    document_type, document_index = document_number.match(/(\D+)(\d+)/).captures
    "http://www.ilga.gov/#{page}?DocNum=#{document_index}&GAID=14&DocTypeID=#{document_type}&SessionID=91"
  end
end

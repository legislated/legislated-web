class Bill < ApplicationRecord
  include PgSearch

  # relationships
  has_many :documents, dependent: :destroy
  belongs_to :hearing, optional: true

  # scopes
  pg_search_scope :with_keyword, {
    against: %i[title summary],
    using: {
      tsearch: { prefix: true }
    }
  }

  pg_search_scope :with_fuzzy_title, {
    against: :title,
    using: {
      trigram: { threshold: 0.1 }
    }
  }

  scope :by_hearing_date, (-> (range = {}) do
    q = includes(:hearing).references(:hearings)
    q = q.order('hearings.date ASC')
    q = q.where('hearings.date >= ?', range[:start]) if range[:start].present?
    q = q.where('hearings.date <= ?', range[:end]) if range[:end].present?
    q
  end)

  scope :by_last_action_date, (-> do
    order(Arel.sql("actions->-1->>'date' DESC NULLS LAST"))
  end)

  scope :with_number, (-> (number) do
    where('number ILIKE ?', "%#{number}%")
  end)

  scope :with_actor, (-> (actor) do
    where("steps->-1->>'actor' = any(array[?])", [*actor])
  end)

  # accessors
  def document
    documents.first
  end

  def details_url
    self[:details_url] || ilga_url('legislation/billstatus.asp')
  end

  private

  def ilga_url(page)
    document_number = document&.number
    return nil unless document_number
    document_type, document_index = document_number.match(/(\D+)(\d+)/).captures
    "http://www.ilga.gov/#{page}?DocNum=#{document_index}&GAID=14&DocTypeID=#{document_type}&SessionID=91"
  end
end

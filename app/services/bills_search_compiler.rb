class BillsSearchCompiler
  def self.compile(query: nil, from: nil, to: nil)
    q = Bill.by_date(start: from, end: to)
    q = filter(bills_query, query) if query.present?
    q
  end

  def self.filter(query, search_query)
    search_query = search_query.strip.downcase

    if document?(search_query)
      q = query.joins(:documents)
      q.where('documents.number ILIKE :q', q: "%#{search_query}%")
    else
      q = query.by_keyword(search_query)
      q = query.by_fuzzy_title(search_query) if q.empty?
      q
    end
  end

  def self.document?(search_query)
    search_query.match(/^([hs](b|j?r)|eo|jsr|am)/).present?
  end
end

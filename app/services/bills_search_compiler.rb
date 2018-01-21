module BillsSearchCompiler
  def self.compile(query: nil, from: nil, to: nil, **_)
    result = Bill.by_date(start: from, end: to)
    result = filter(result, query) if query.present?
    result
  end

  def self.filter(bills, query)
    query = query.strip.downcase

    if filter_by_document?(query)
      result = bills.joins(:documents)
      result.where('documents.number ILIKE :q', q: "%#{query}%")
    else
      result = bills.by_keyword(query)
      result = bills.by_fuzzy_title(query) if result.empty?
      result
    end
  end

  def self.filter_by_document?(search_query)
    search_query.match(/^([hs](b|j?r)|eo|jsr|am)/).present?
  end
end

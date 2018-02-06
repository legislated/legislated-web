module BillsSearchCompiler
  def self.compile(query: nil, from: nil, to: nil, actor: nil, **_)
    q = Bill.by_date(start: from, end: to)
    q = filter_by_actor(q, actor) if actor.present?
    q = filter_by_query(q, query) if query.present?
    q
  end

  def self.filter_by_actor(bills, actor)
    bills.with_actor(actor)
  end

  def self.filter_by_query(bills, query)
    query = query.strip.downcase

    if filters_by_number?(query)
      bills.with_number(query)
    else
      q = bills.with_keyword(query)
      q = bills.with_fuzzy_title(query) if q.empty?
      q
    end
  end

  def self.filters_by_number?(search_query)
    search_query.match(/^([hs](b|j?r)|eo|jsr|am)/).present?
  end
end

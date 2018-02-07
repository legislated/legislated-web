module BillsSearchCompiler
  def self.compile(query: nil, subset: nil, **_)
    q = Bill.all
    q = filter_by_actor(q, actor) if subset.present?
    q = filter_by_query(q, query) if query.present?
    q
  end

  def self.filter_by_subset(bills, subset)
    if subset == :slips
      bills.by_hearing_date(start: Time.current, end: 1.week.from_now)
    else
      bills.with_actor(actors_from_subset(subset))
    end
  end

  def self.filter_by_query(bills, query)
    query = query.strip.downcase

    if bill_number?(query)
      bills.with_number(query)
    else
      q = bills.with_keyword(query)
      q = bills.with_fuzzy_title(query) if q.empty?
      q
    end
  end

  def self.actors_from_subset(subset)
    case subset
    when :lower
      [Step::Actors::LOWER, Step::Actors::LOWER_COMMITTEE]
    when :upper
      [Step::Actors::UPPER, Step::Actors::UPPER_COMMITTEE]
    when :governor
      [Step::Actors::GOVERNOR]
    end
  end

  def self.bill_number?(search_query)
    search_query.match(/^([hs](b|j?r)|eo|jsr|am)/).present?
  end
end

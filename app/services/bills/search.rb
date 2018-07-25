module Bills
  class Search
    def call(query: nil, subset: nil, **_)
      q = Bill.all
      q = filter_by_subset(q, subset)
      q = filter_by_query(q, query) if query.present?
      q
    end

    def filter_by_subset(bills, subset)
      if subset.nil?
        bills.by_last_action_date
      elsif subset == :slips
        bills.by_hearing_date(start: Time.current, end: 1.week.from_now)
      else # subset == <some_actor>
        bills.with_actor(actors_from_subset(subset)).by_last_action_date
      end
    end

    def filter_by_query(bills, query)
      query = query.strip.downcase

      if bill_number?(query)
        bills.with_number(query)
      else
        bills.with_keyword(query)
      end
    end

    def actors_from_subset(subset)
      case subset
      when :lower
        [Step::Actors::LOWER, Step::Actors::LOWER_COMMITTEE]
      when :upper
        [Step::Actors::UPPER, Step::Actors::UPPER_COMMITTEE]
      when :governor
        [Step::Actors::GOVERNOR]
      end
    end

    def bill_number?(search_query)
      search_query.match(/^([hs](b|j?r)|eo|jsr|am)/).present?
    end
  end
end

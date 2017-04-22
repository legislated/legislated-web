class BillsSearchService
  def self.filter(query, search_query)
    search_query = search_query.downcase

    if search_query.start_with?('sb', 'hb')
      query.where('LOWER(document_number) LIKE :q', q: "%#{search_query}%")
    else
      q = query.by_keyword(search_query)
      q = query.by_fuzzy_title(search_query) if q.empty?
      q
    end
  end
end

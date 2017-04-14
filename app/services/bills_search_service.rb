class BillsSearchService
  def self.filter(query, search_query)
    search_query = search_query.downcase
    if search_query.start_with?('sb', 'hb')
      query.where('LOWER(document_number) LIKE :q', q: "%#{search_query}%")
    else
      query.where('LOWER(title) LIKE :q OR LOWER(summary) LIKE :q', q: "%#{search_query}%")
    end
  end
end

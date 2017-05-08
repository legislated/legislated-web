module GraphRequestHelpers
  def request_query(query)
    post '/graphql', { params: { query: query } }
    HashWithIndifferentAccess.new(JSON.parse(response.body))
  end
end

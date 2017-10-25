module GraphRequestHelpers
  module Example
    def request_graph_query(query, variables: {}, is_admin: false)
      headers = {}
      headers[:Authorization] = 'Basic YWRtaW46cGFzc3dvcmTCow==' if is_admin

      post '/graphql', params: { query: query, variables: variables }, headers: headers
      HashWithIndifferentAccess.new(JSON.parse(response.body))
    end
  end
end

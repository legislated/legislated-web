module OpenStates
  class FetchLegislators
    include Request::OpenStates

    default_params({
      state: 'il'
    })

    def call(query = {})
      self.class.get('/legislators', {
        query: query
      })
    end
  end
end

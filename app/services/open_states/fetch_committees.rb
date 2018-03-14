module OpenStates
  class FetchCommittees
    include Request::OpenStates

    default_params({
      state: 'il'
    })

    def call(query = {})
      self.class.get('/committees', {
        query: query
      })
    end
  end
end

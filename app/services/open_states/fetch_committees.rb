module OpenStates
  class FetchCommittees
    include Request::OpenStates

    default_params({
      state: 'il'
    })

    fields %i[
      id
      parent_id
      committee
      subcommittee
      chamber
      sources
    ]

    def initialize(parse = ParseCommittee.new)
      @parse = parse
    end

    def call(query = {})
      self.class.get('/committees', {
        query: query
      })
    end
  end
end

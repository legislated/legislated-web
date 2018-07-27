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
      committees = self.class.get('/committees', {
        query: query
      })

      committees.map { |committee| parse.call(committee) }.reject(&:nil?)
    end

    private

    attr_reader :parse
  end
end

module OpenStates
  class ParseCommittee
    Committee = Struct.new(
      :os_id,
      :name,
      :parent_id,
      :subcommittee,
      :sources
    )

    def call(data)
      Data.new(
        parse_committee(data)
      )
    end

    private

    def parse_committee(data)
      Committee.new(
        data['id'],
        data['committee'],
        data['parent_id'],
        data['subcommittee'],
        data['sources']
      )
    end
  end
end
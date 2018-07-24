module OpenStates
  class ParseCommittee
    Committee = Struct.new(
      :os_id,
      :parent_id,
      :name,
      :subcommittee,
      :sources
    )

    def call(data)
      Committee.new(
        data['id'],
        data['parent_id'],
        data['committee'],
        data['subcommittee'],
        data['sources']
      )
    end
  end
end
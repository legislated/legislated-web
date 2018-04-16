module OpenStates
  class ParseCommittee

    def parse_attributes(data)
      attrs = {
        od_id: data['id'],
        name: data['committee'],
        chamber: data['chamber'],
        subcommittee: data['subcommittee']
      }

      attrs
    end

    def fields
      @fields ||= begin
        fields = %i[
          id
          parent_id
          chamber
          committee
          subcommittee
          sources
          members
        ]

        fields.join(',')
      end
    end
  end

  private

end
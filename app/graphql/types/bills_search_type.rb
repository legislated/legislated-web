module Types
  BillsSearchType = BillType.define_connection do
    name 'BillsSearch'
    description 'A bills connection that includes the total count'

    field :count do
      description 'The total number of bills in the search results'
      type !types.Int
      resolve -> (obj, _args, _ctx) { obj.nodes.count }
    end
  end
end

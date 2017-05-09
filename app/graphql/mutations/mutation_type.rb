module Mutations
  MutationType = GraphQL::ObjectType.define do
    name 'Mutation'
    description 'The root mutation of the graph'
    field :updateBill, field: UpdateBill.field
  end
end

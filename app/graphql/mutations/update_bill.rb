module Mutations
  UpdateBill = GraphQL::Relay::Mutation.define do
    name 'UpdateBill'
    description 'Updates mutable fields of a signle bill'

    input_field :id, !types.ID
    input_field :humanSummary, types.String

    return_field :bill, Types::BillType

    resolve -> (_object, args, context) do
      raise Errors::AuthorizationError unless context[:is_admin]

      args = args.parse_graphql_data

      bill = Bill.find(args[:id])
      bill.update(args)

      { bill: bill }
    end
  end
end

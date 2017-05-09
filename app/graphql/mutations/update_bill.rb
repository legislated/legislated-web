module Mutations
  UpdateBill = GraphQL::Relay::Mutation.define do
    resolve -> (_object, args, context) do
      raise Errors::AuthorizationError if !context[:is_admin]

      bill = Bill.find(args[:id])
      bill.update(human_summary: args[:human_summary])
    end
  end
end

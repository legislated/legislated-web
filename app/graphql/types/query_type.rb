module Types
  QueryType = GraphQL::ObjectType.define do
    name "Query"
    description "The root query of the graph"

    # viewer type for wrapping multi-node data structures
    field :viewer do
      type ViewerType
      resolve -> (obj, args, ctx) { Object.new }
    end

    # individual nodes
    field :chamber do
      type ChamberType
      argument :id, !types.ID, "The graph id of the chamber"
      resolve -> (obj, args, ctx) { Chamber.find(args["id"]) }
    end

    field :committee do
      type CommitteeType
      argument :id, !types.ID, "The graph id of the committee"
      resolve -> (obj, args, ctx) { Committee.find(args["id"]) }
    end

    field :hearing do
      type HearingType
      argument :id, !types.ID, "The graph id of the hearing"
      resolve -> (obj, args, ctx) { Hearing.find(args["id"]) }
    end

    field :bill do
      type BillType
      argument :id, !types.ID, "The graph id of the bill"
      resolve -> (obj, args, ctx) { Bill.find(args["id"]) }
    end
  end
end

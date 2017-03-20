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
      argument :id, !types.ID, "The id of the chamber"
      resolve -> (obj, args, ctx) { Chamber.find(args["id"]) }
    end
  end
end

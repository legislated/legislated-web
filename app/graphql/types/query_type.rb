module Types
  QueryType = GraphQL::ObjectType.define do
    name 'Query'
    description 'The root query of the graph'

    # expose the Relay node interface
    field :node, GraphQL::Relay::Node.field
    field :nodes, GraphQL::Relay::Node.plural_field

    # viewer type for wrapping multi-node data structures
    field :viewer do
      type ViewerType
      resolve -> (_obj, _args, _ctx) { Viewer.instance }
    end
  end
end

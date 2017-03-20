module Types
  ViewerType = GraphQL::ObjectType.define do
    name "Viewer"
    description "The top level view of the graph"
    global_id_field :id
    interfaces [GraphQL::Relay::Node.interface]

    connection :chambers, -> { ChamberType.connection_type } do
      description "All chambers"
      resolve -> (obj, ctx, args) { Chamber.all }
    end

    connection :committees, -> { CommitteeType.connection_type } do
      description "All committees"
      resolve -> (obj, ctx, args) { Committee.all }
    end
  end
end

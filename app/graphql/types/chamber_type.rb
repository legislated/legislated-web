module Types
  ChamberType = GraphQL::ObjectType.define do
    name "Chamber"
    description "A legislative chamber"
    global_id_field :id
    interfaces [GraphQL::Relay::Node.interface]

    field :id, !types.ID
    field :name, !types.String
  end
end

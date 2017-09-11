module Types
  ActionType = GraphQL::ObjectType.define do
    name 'Action'
    description 'An action on the bill'
    global_id_field :id
    interfaces [GraphQL::Relay::Node.interface]

    # fields
    field :id, !types.ID, 'The graph id'
    field :name, !types.String, 'The name'
    field :stage, !types.String, 'The stage'
    field :actionType, !types.String, 'The type', property: :action_type
    field :datetime, !DateTimeType, 'The date and time'

    # relationships
    field :bill, !BillType, 'The parent bill'
  end
end

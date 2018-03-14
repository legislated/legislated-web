module Types
  CommitteeType = GraphQL::ObjectType.define do
    name 'Committee'
    description 'A legislative committee'

    global_id_field :id
    interfaces [GraphQL::Relay::Node.interface]

    # fields
    field :id, !types.ID, 'The graph id'
    field :name, !types.String, 'The display name'
    field :chamber, !ChamberType, 'The associated chamber'

    # assosciations
    connection :hearings, HearingType.connection_type, "All of the committee's hearings"
  end
end

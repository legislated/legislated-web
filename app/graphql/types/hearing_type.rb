module Types
  HearingType = GraphQL::ObjectType.define do
    name 'Hearing'
    description 'A committee hearing'

    global_id_field :id
    interfaces [GraphQL::Relay::Node.interface]

    # fields
    field :id, !types.ID, 'The graph id'
    field :location, !types.String, 'The location'
    field :date, !DateTimeType, 'The date and time'

    # assosciations
    field :committee, !CommitteeType, 'The parent committee', preload: :committee
    connection :bills, BillType.connection_type, "All of the hearing's bills", preload: :bills
  end
end

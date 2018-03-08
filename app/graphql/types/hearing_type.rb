module Types
  HearingType = GraphQL::ObjectType.define do
    name 'Hearing'
    description 'A committee hearing'

    global_id_field :id
    interfaces [GraphQL::Relay::Node.interface]

    # fields
    field :id, !types.ID, 'The graph id'
    field :ilgaId, !types.Int, 'The ILGA id', property: :ilga_id
    field :location, !types.String, 'The location'
    field :date, !DateTimeType, 'The date and time'

    # assosciations
    field :committee, !CommitteeType, 'The parent committee'
    connection :bills, BillType.connection_type, "All of the hearing's bills"
  end
end

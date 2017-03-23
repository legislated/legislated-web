module Types
  HearingType = GraphQL::ObjectType.define do
    name "Hearing"
    description "A committee hearing"
    global_id_field :id
    interfaces [GraphQL::Relay::Node.interface]

    # fields
    field :id, !types.ID, "The graph id"
    field :externalId, !types.Int, "The external id", property: :external_id
    field :location, !types.String, "The location"
    field :date, !DateTimeType, "The date and time"

    # relationships
    field :committee, !CommitteeType, "The parent committee"

    connection :bills, -> { BillType.connection_type } do
      description "All of the hearing's bills"
      resolve -> (hearing, args, ctx) { hearing.bills }
    end
  end
end

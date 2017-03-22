GraphSchema = GraphQL::Schema.define do
  query ::Types::QueryType

  # relay node interface lookup
  GraphQL::Schema::UniqueWithinType.default_id_separator = "|"

  id_from_object -> (object, type_definition, query_context) {
    GraphQL::Schema::UniqueWithinType.encode(type_definition.name, object.id)
  }

  object_from_id -> (node_id, query_context) {
    type_name, id = GraphQL::Schema::UniqueWithinType.decode(node_id)
    record_type = ApplicationRecord.const_get(type_name)
    record_type&.find_by(id: id)
  }

  resolve_type -> (object, query_context) {
    case object
    when Chamber
      Types::ChamberType
    when Committee
      Types::CommitteeType
    when Hearing
      Types::HearingType
    when Bill
      Types::BillType
    else
      raise "Could not resolve Graph type for: #{object}"
    end
  }
end

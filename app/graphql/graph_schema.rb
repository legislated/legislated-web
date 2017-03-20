GraphSchema = GraphQL::Schema.define do
  query ::Types::QueryType

  id_from_object -> (object, type_definition, query_context) {
    object.id
  }

  object_from_id -> (id, query_context) {
    raise "object_from_id not implemeted."
  }

  resolve_type -> (id, query_context) {
    object.graph_type
  }
end

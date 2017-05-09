GraphSchema = GraphQL::Schema.define do
  query ::Types::QueryType
  mutation ::Mutations::MutationType

  # relay node interface lookup
  GraphQL::Schema::UniqueWithinType.default_id_separator = '|'

  id_from_object -> (object, type_definition, _query_context) {
    GraphQL::Schema::UniqueWithinType.encode(type_definition.name, object.id)
  }

  object_from_id -> (node_id, _query_context) {
    model_name, id = GraphQL::Schema::UniqueWithinType.decode(node_id)

    # viewer is a special case, since it's not a database model
    if id == Viewer::ID
      Viewer.instance
    else
      model_class = model_name.constantize
      model_class.find_by(id: id)
    end
  }

  resolve_type -> (object, _query_context) {
    "Types::#{object.class.name}Type".constantize
  }
end

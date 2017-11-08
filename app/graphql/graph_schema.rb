GraphSchema = GraphQL::Schema.define do
  query ::Types::QueryType
  mutation ::Mutations::MutationType

  # relay node interface lookup
  GraphQL::Schema::UniqueWithinType.default_id_separator = '|'

  id_from_object -> (obj, type_def, _ctx) {
    GraphQL::Schema::UniqueWithinType.encode(type_def.name, obj.id)
  }

  object_from_id -> (node_id, _ctx) {
    model_name, id = GraphQL::Schema::UniqueWithinType.decode(node_id)

    # viewer is a special case, since it's not a database model
    if id == Viewer::ID
      Viewer.instance
    else
      model_class = model_name.constantize
      model_class.find_by(id: id)
    end
  }

  resolve_type -> (_type, obj, _ctx) {
    "Types::#{obj.class.name}Type".constantize
  }
end

RSpec::Matchers.define :map_fields do |field_map|
  match do |actual|
    field_map.all? do |key, graph_key|
      field = actual.fields[graph_key]
      field.present? && (field.property == key || field.hash_key == key)
    end
  end
end

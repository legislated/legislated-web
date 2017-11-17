module Types
  DateTimeType = GraphQL::ScalarType.define do
    name 'Time'
    description 'Time since epoch in seconds'
    coerce_input -> (value, _ctx) { Time.iso8601(value) }
    coerce_result -> (value, _ctx) { value.to_time.iso8601 }
  end
end

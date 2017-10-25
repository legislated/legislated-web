module Types
  DateTimeType = GraphQL::ScalarType.define do
    name 'Time'
    description 'Time since epoch in seconds'
    coerce_input -> (value) { Time.iso8601(value) }
    coerce_result -> (value) { value.to_time.iso8601 }
  end
end

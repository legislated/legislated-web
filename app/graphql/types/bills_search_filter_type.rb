module Types
  BillsSearchFilterType = GraphQL::InputObjectType.define do
    name 'BillsSearchFilter'
    description 'Filtering options for the bill search'

    input_field :query, types.String, 'Filters bills whose title or summary match the query'
    input_field :from, DateTimeType, 'Filters bills whose hearing is on or after the date-time'
    input_field :to, DateTimeType, 'Filters bills whose hearings is on or before the date-time'
  end
end

module Types
  BillsSearchFilterType = GraphQL::InputObjectType.define do
    name 'BillsSearchFilter'
    description 'Filtering options for the bill search'

    input_field :query, types.String, 'Filters to bills whose title or summary match the query'
    input_field :actors, StepActorType.to_list_type, 'Filters to bills whose most recent step matches any of the actors'
    input_field :from, DateTimeType, 'Filters to bills whose hearing is on or after the date-time'
    input_field :to, DateTimeType, 'Filters to bills whose hearings is on or before the date-time'

    input_field :key, types.String, 'Disambiguates queries for cache isolation'
  end
end

module Types
  BillsSearchParamsType = GraphQL::InputObjectType.define do
    name 'BillsSearchParams'
    description 'Filtering options for the bill search'

    input_field :key, types.String, 'Disambiguates queries for cache isolation'
    input_field :query, types.String, 'Filters to bills whose title or summary match the query'
    input_field :subset, (GraphQL::EnumType.define do
      name 'BillsSearchParamsSubset'
      description 'Filters to bills matching a pre-defined subset'

      value 'SLIPS', 'Bills with upcoming witness slips', value: :slips
      value 'LOWER', 'Bills in the house', value: :lower
      value 'UPPER', 'Bills in the senate', value: :upper
      value 'GOVERNOR', 'Bills on the governor\'s desk', value: :governor
      value 'SIGNED', 'Bills signed into law', value: :signed
      value 'VETOED', 'Bills vetoed by the governor', value: :vetoed
    end)
  end
end

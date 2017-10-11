module Types
  StageType = GraphQL::ObjectType.define do
    name 'Stage'
    description 'A bill stage'

    # fields
    field :name, !types.String, 'The stage name'
    field :introduced_date, types.String, 'The introduced date'
    field :completed_date, types.String, 'The completed date'
    field :failed, types.Boolean, 'THe failure status'
  end
end

module Types
  StageType = GraphQL::ObjectType.define do
    name 'Stage'
    description 'A bill stage'

    # fields
    field :name, !types.String, 'The stage name' do
      resolve -> (stage, _args, _ctx) { stage['name'] }
    end
    field :introduced_date, types.String, 'The introduced date' do
      resolve -> (stage, _args, _ctx) { stage['introduced_date'] }
    end
    field :completed_date, types.String, 'The completed date' do
      resolve -> (stage, _args, _ctx) { stage['completed_date'] }
    end
    field :failed, types.Boolean, 'THe failure status' do
      resolve -> (stage, _args, _ctx) { stage['failed'] }
    end
  end
end

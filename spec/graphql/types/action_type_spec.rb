describe Types::ActionType, graphql: :type do
  subject { described_class }

  let(:model) { build(:action, :with_bill) }

  it_maps_fields({
    name: 'name',
    stage: 'stage',
    action_type: 'actionType',
    datetime: 'datetime'
  })

end

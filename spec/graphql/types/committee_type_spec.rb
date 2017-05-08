describe Types::CommitteeType, :graphql do
  subject { described_class }

  let(:model) { build(:committee) }

  it_maps_fields({
    external_id: 'externalId'
  })

  it 'exposes the hearings' do
    expect(connection(:hearings)).to eq(model.hearings)
  end
end

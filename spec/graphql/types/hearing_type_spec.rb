describe Types::HearingType, :graphql do
  subject { described_class }

  let(:model) { build(:hearing, :with_any_committee) }

  it_maps_fields({
    external_id: 'externalId'
  })

  it 'exposes the bills' do
    expect(connection(:bills)).to eq(model.bills)
  end
end

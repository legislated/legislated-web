describe Types::ChamberType, :graphql do
  subject { described_class }

  let(:model) { build(:chamber) }

  it_maps_fields({
    kind: 'type'
  })

  it 'exposes the committees' do
    expect(connection(:committees)).to eq(model.committees)
  end
end

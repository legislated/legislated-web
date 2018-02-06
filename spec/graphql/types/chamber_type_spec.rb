describe Types::ChamberType, :graph_type do
  subject { described_class }

  let(:model) { build(:chamber) }

  it_maps_fields({
    kind: 'type'
  })

  it 'exposes the committees' do
    expect(resolve_field(:committees, obj: model)).to eq(model.committees)
  end
end

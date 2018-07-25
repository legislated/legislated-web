describe Types::CommitteeType, :graph_type do
  subject { described_class }

  let(:model) { build(:committee) }

  it 'exposes its hearings' do
    result = resolve_field(:hearings, obj: model)
    expect(result).to eq(model.hearings)
  end
end

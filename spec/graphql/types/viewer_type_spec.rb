describe Types::ViewerType, :graph_type do
  subject { described_class }

  let(:model) { Viewer.instance }

  describe '#isAdmin' do
    it 'is true when the user is an admin' do
      result = resolve_field(:isAdmin, obj: model, ctx: { is_admin: true })
      expect(result).to be(true)
    end

    it 'is false when the user is not an admin' do
      result = resolve_field(:isAdmin, obj: model, ctx: { is_admin: false })
      expect(result).to be(false)
    end
  end

  describe '#bills' do
    it 'searchs with the query' do
      params = { test: 'params' }
      expect_any_instance_of(Bills::Search).to receive(:call).with(**params)
      resolve_field(:bills, args: { params: params })
    end
  end
end

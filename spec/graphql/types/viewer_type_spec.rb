describe Types::ViewerType, graphql: :type do
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
    it 'compiles the query' do
      filter = { test: 'filter' }
      expect(BillsSearchCompiler).to receive(:compile).with(**filter)
      resolve_field(:bills, args: { filter: filter })
    end
  end
end

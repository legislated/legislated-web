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
    let!(:date) { Time.current }
    let!(:bill1) { create(:bill, hearing: create(:hearing, :with_any_committee, date: date - 1.day)) }
    let!(:bill3) { create(:bill, hearing: create(:hearing, :with_any_committee, date: date + 1.day)) }
    let!(:bill2) { create(:bill, hearing: create(:hearing, :with_any_committee, date: date)) }

    before do
      allow(BillsSearchService).to receive(:filter) { |q| q }
    end

    it 'sorts bills by date' do
      expect(resolve_field(:bills, args: {})).to eq([bill1, bill2, bill3])
    end

    it 'does not filter bills by query' do
      resolve_field(:bills, args: { query: '' })
      expect(BillsSearchService).to_not have_received(:filter)
    end

    it 'only returns bills in the date range when passed' do
      result = resolve_field(:bills, args: { from: date, to: date })
      expect(result).to eq([bill2])
    end

    it 'only returns bills that match the search query when passed' do
      resolve_field(:bills, args: { query: 'foo' })
      expect(BillsSearchService).to have_received(:filter).with(anything, 'foo')
    end
  end
end

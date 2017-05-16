describe Types::ViewerType, graphql: :type do
  subject { described_class }

  let(:model) { Viewer.instance }

  describe '#isAdmin' do
    it 'is true when the user is an admin' do
      context = { is_admin: true }
      expect(field(:isAdmin, context: context)).to be(true)
    end

    it 'is false when the user is not an admin' do
      context = { is_admin: false }
      expect(field(:isAdmin, context: context)).to be(false)
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

    context 'normally' do
      it 'sorts bills by date' do
        expect(connection(:bills)).to eq([bill1, bill2, bill3])
      end

      it 'does not filter bills by query' do
        connection(:bills, args: { query: '' })
        expect(BillsSearchService).to_not have_received(:filter)
      end
    end

    context 'with a date range' do
      it 'only returns bills in the range' do
        filter = { from: date, to: date }
        expect(connection(:bills, args: filter)).to eq([bill2])
      end
    end

    context 'with a search query' do
      it 'only returns bills that match the search query' do
        connection(:bills, args: { query: 'foo' })
        expect(BillsSearchService).to have_received(:filter).with(anything, 'foo')
      end
    end
  end
end

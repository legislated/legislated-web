describe Types::ViewerType do
  subject { described_class }

  describe '#bills' do
    let!(:date) { Time.current }
    let!(:bill1) { create(:bill, hearing: create(:hearing, :with_any_committee, date: date - 1.day)) }
    let!(:bill3) { create(:bill, hearing: create(:hearing, :with_any_committee, date: date + 1.day)) }
    let!(:bill2) { create(:bill, hearing: create(:hearing, :with_any_committee, date: date)) }

    def resolve(args = { query: '' })
      handler = subject.fields['bills'].resolve_proc.instance_variable_get('@underlying_resolve')
      handler.call(nil, args, nil)
    end

    before do
      allow(BillsSearchService).to receive(:filter) { |q| q }
    end

    context 'normally' do
      it 'sorts bills by date' do
        expect(resolve).to eq([bill1, bill2, bill3])
      end

      it 'does not filter bills by query' do
        resolve
        expect(BillsSearchService).to_not have_received(:filter)
      end
    end

    context 'with a date range' do
      it 'only returns bills in the range' do
        expect(resolve(from: date, to: date)).to eq([bill2])
      end
    end

    context 'with a search query' do
      it 'only returns bills that match the search query' do
        resolve(query: 'foo')
        expect(BillsSearchService).to have_received(:filter).with(anything, 'foo')
      end
    end
  end
end

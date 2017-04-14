describe Types::ViewerType do
  subject { described_class }

  describe '#bills' do
    let(:resolve) { subject.fields['bills'].resolve_proc.instance_variable_get('@underlying_resolve') }

    let(:args) { { query: '' } }
    let(:result) { resolve.call(nil, args, nil) }

    let!(:date) { Time.current }
    let!(:bill1) { create(:bill, hearing: create(:hearing, :with_any_committee, date: date - 1.day)) }
    let!(:bill3) { create(:bill, hearing: create(:hearing, :with_any_committee, date: date + 1.day)) }
    let!(:bill2) { create(:bill, hearing: create(:hearing, :with_any_committee, date: date)) }

    before do
      allow(BillsSearchService).to receive(:filter) { |q| q }
    end

    it 'sorts bills by date' do
      expect(result).to eq([bill1, bill2, bill3])
    end

    it 'does not filter bills by query' do
      resolve.call(nil, args, nil)
      expect(BillsSearchService).to_not have_received(:filter)
    end

    context 'with a date range' do
      let(:args) { { from: date, to: date } }

      it 'only returns bills in the range' do
        expect(result).to eq([bill2])
      end
    end

    context 'with a search query' do
      let(:args) { { query: 'foo' } }

      it 'only returns bills that match the search query' do
        resolve.call(nil, args, nil)
        expect(BillsSearchService).to have_received(:filter).with(anything, 'foo')
      end
    end
  end
end

describe BillsSearchService do
  subject { described_class }

  describe '#filter' do
    def search(search_query, query = Bill.all)
      subject.filter(query, search_query)
    end

    context 'when the search query looks like plain text' do
      context 'and the title prefix matches' do
        let!(:bill1) { create(:bill, :with_any_hearing, title: 'MoTor AwAY') }
        let!(:bill2) { create(:bill, :with_any_hearing, title: 'I am a ScIEntiSt') }

        it 'includes the bill' do
          expect(search('MOTO')).to eq([bill1])
        end
      end

      context 'and the title fuzzy matches' do
        let!(:bill1) { create(:bill, :with_any_hearing, title: 'MoTor AwAY') }
        let!(:bill2) { create(:bill, :with_any_hearing, title: 'I am a ScIEntiSt') }

        it 'includes the bill' do
          expect(search('OTOR')).to eq([bill1])
        end
      end

      context "and the bill's summary prefixes" do
        let!(:bill1) { create(:bill, :with_any_hearing, summary: '...dOwn the ICy stREets.') }
        let!(:bill2) { create(:bill, :with_any_hearing, summary: '...I seEK to uNDeRstand me') }

        it 'includes the bill' do
          expect(search('STREE')).to eq([bill1])
        end
      end
    end

    context 'when the search query looks like a document number' do
      let!(:bill1) { create(:bill, :with_any_hearing, document_number: 'HB1234') }
      let!(:bill2) { create(:bill, :with_any_hearing, document_number: 'SB1234') }
      let!(:resolution1) { create(:bill, :with_any_hearing, document_number: 'HR1234') }
      let!(:resolution2) { create(:bill, :with_any_hearing, document_number: 'SR1234') }

      it 'includes house bills' do
        expect(search('HB')).to eq([bill1])
      end

      it 'includes house resolutions' do
        expect(search('HR')).to eq([resolution1])
      end

      it 'includes senate bills' do
        expect(search('SB')).to eq([bill2])
      end

      it 'includes senate bills' do
        expect(search('SR')).to eq([resolution2])
      end
    end

    context 'with eager-loaded hearings' do
      let!(:bill) { create(:bill, :with_any_hearing) }
      let(:date) { bill.hearing.date }

      it 'does not raise an error' do
        query = Bill.by_date(start: (date - 1.day).utc, end: (date + 1.day).utc)
        expect { search('any query', query).to_a }.to_not raise_error
      end
    end
  end
end

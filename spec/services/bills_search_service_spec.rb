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
      let!(:unmatched_bill) { create(:bill, :with_any_hearing, document_number: 'fake') }

      it 'includes house bills' do
        bill = create(:bill, :with_any_hearing, document_number: 'HB1234')
        expect(search('HB')).to eq([bill])
      end

      it 'includes house resolutions' do
        bill = create(:bill, :with_any_hearing, document_number: 'HR1234')
        expect(search('HR')).to eq([bill])
      end

      it 'includes house joint resolutions' do
        bill = create(:bill, :with_any_hearing, document_number: 'HJR1234')
        expect(search('HJR')).to eq([bill])
      end

      it 'includes house amendments' do
        bill = create(:bill, :with_any_hearing, document_number: 'HJRCA1234')
        expect(search('HJRCA')).to eq([bill])
      end

      it 'includes senate bills' do
        bill = create(:bill, :with_any_hearing, document_number: 'SB1234')
        expect(search('SB')).to eq([bill])
      end

      it 'includes senate resolutions' do
        bill = create(:bill, :with_any_hearing, document_number: 'SR1234')
        expect(search('SR')).to eq([bill])
      end

      it 'includes senate joint resolutions' do
        bill = create(:bill, :with_any_hearing, document_number: 'SJR1234')
        expect(search('SJR')).to eq([bill])
      end

      it 'includes senate amendments' do
        bill = create(:bill, :with_any_hearing, document_number: 'SJRCA1234')
        expect(search('SJRCA')).to eq([bill])
      end

      it 'includes executive orders' do
        bill = create(:bill, :with_any_hearing, document_number: 'EO1234')
        expect(search('EO')).to eq([bill])
      end

      it 'includes joint session resolutions' do
        bill = create(:bill, :with_any_hearing, document_number: 'JSR1234')
        expect(search('JSR')).to eq([bill])
      end

      it 'includes appointment messages' do
        bill = create(:bill, :with_any_hearing, document_number: 'AM1234')
        expect(search('AM')).to eq([bill])
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

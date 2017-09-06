describe BillsSearchService do
  subject { described_class }

  describe '#filter' do
    def search(search_query, query = Bill.all)
      subject.filter(query, search_query)
    end

    context 'when the search query looks like plain text' do
      it 'includes the bill if the title prefix matches' do
        bill1 = create(:bill, :with_any_hearing, title: 'MoTor AwAY')
        bill2 = create(:bill, :with_any_hearing, title: 'I am a ScIEntiSt')
        expect(search('MOTO')).to eq([bill1])
      end

      it 'includes the bill if the title fuzzy matches' do
        bill1 = create(:bill, :with_any_hearing, title: 'MoTor AwAY')
        bill2 = create(:bill, :with_any_hearing, title: 'I am a ScIEntiSt')
        expect(search('OTOR')).to eq([bill1])
      end

      it 'includes the bill if the summary prefixes' do
        bill1 = create(:bill, :with_any_hearing, summary: '...dOwn the ICy stREets.')
        bill2 = create(:bill, :with_any_hearing, summary: '...I seEK to uNDeRstand me')
        expect(search('STREE')).to eq([bill1])
      end
    end

    context 'when the search query looks like a document number' do
      def create_bill(number)
        create(:bill, :with_any_hearing, documents: build_list(:document, 1, number: number))
      end

      let!(:unmatched_bill) { create_bill('fake') }

      shared_examples_for 'it filters' do |map|
        map.each do |name, prefix|
          it name do
            bill = create_bill("#{prefix}1234")
            expect(search(prefix)).to eq([bill])
          end
        end
      end

      it_behaves_like 'it filters', {
        'house bills': 'HB',
        'house resolutions': 'HR',
        'house joint resolutions': 'HJR',
        'house amendments': 'HJRCA',
        'senate bills': 'SB',
        'senate resolutions': 'SR',
        'senate joint resolutions': 'SJR',
        'senate amendments': 'SJRCA',
        'executive orders': 'EO',
        'joint session resolutions': 'JSR',
        'appointment messages': 'AM'
      }
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

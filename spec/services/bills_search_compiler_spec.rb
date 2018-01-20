describe BillsSearchCompiler do
  subject { described_class }

  describe '.filter' do
    context 'when the search query looks like plain text' do
      it 'includes the bill if the title prefix matches' do
        bill = create(:bill, :with_any_hearing, title: 'MoTor AwAY')
        create(:bill, :with_any_hearing, title: 'I am a ScIEntiSt')
        expect(subject.filter(Bill.all, 'MOTO')).to eq([bill])
      end

      it 'includes the bill if the title fuzzy matches' do
        bill = create(:bill, :with_any_hearing, title: 'MoTor AwAY')
        create(:bill, :with_any_hearing, title: 'I am a ScIEntiSt')
        expect(subject.filter(Bill.all, 'OTOR')).to eq([bill])
      end

      it 'includes the bill if the summary prefixes' do
        bill = create(:bill, :with_any_hearing, summary: '...dOwn the ICy stREets.')
        create(:bill, :with_any_hearing, summary: '...I seEK to uNDeRstand me')
        expect(subject.filter(Bill.all, 'STREE')).to eq([bill])
      end
    end

    context 'when the search query looks like a document number' do
      let!(:unmatched_bill) { create_bill('fake') }

      def create_bill(number)
        create(:bill, :with_any_hearing, documents: build_list(:document, 1, number: number))
      end

      shared_examples_for 'it filters' do |prefix_map|
        prefix_map.each do |name, prefix|
          it name do
            bill = create_bill("#{prefix}1234")
            expect(subject.filter(Bill.all, prefix)).to eq([bill])
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
        bills = Bill.by_date(start: (date - 1.day).utc, end: (date + 1.day).utc)

        expect do
          subject.filter(bills, 'any query').to_a
        end.to_not raise_error
      end
    end
  end
end

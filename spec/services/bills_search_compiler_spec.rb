describe BillsSearchCompiler do
  subject { described_class }

  describe '.compile' do
    context 'with a search query' do
      it 'finds bills where the title prefix matches' do
        bill = create(:bill, title: 'MoTor AwAY')
        create(:bill, title: 'I am a ScIEntiSt')
        expect(subject.compile(query: 'MOTO')).to eq([bill])
      end

      it 'finds bills where the title fuzzy matches' do
        bill = create(:bill, title: 'MoTor AwAY')
        create(:bill, title: 'I am a ScIEntiSt')
        expect(subject.compile(query: 'OTOR')).to eq([bill])
      end

      it 'finds bills where the summary prefix matches' do
        bill = create(:bill, summary: '...dOwn the ICy stREets.')
        create(:bill, summary: '...I seEK to uNDeRstand me')
        expect(subject.compile(query: 'STREE')).to eq([bill])
      end
    end

    context 'with a document number' do
      let!(:unmatched_bill) { create_bill('fake') }

      def create_bill(number)
        create(:bill, documents: build_list(:document, 1, number: number))
      end

      prefix_map = {
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

      prefix_map.each do |name, prefix|
        it "finds #{name} by doucment number" do
          bill = create_bill("#{prefix}1234")
          expect(subject.compile(query: prefix)).to eq([bill])
        end
      end
    end
  end
end

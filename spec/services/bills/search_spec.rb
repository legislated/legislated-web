describe Bills::Search do
  subject { described_class.new }

  describe '#call' do
    context 'with a search query' do
      it 'finds bills where the title prefix matches' do
        bill = create(:bill, title: 'MoTor AwAY')
        create(:bill, title: 'I am a ScIEntiSt')
        expect(subject.call(query: 'MOTO')).to eq([bill])
      end

      it 'finds bills where the title fuzzy matches' do
        bill = create(:bill, title: 'MoTor AwAY')
        create(:bill, title: 'I am a ScIEntiSt')
        expect(subject.call(query: 'OTOR')).to eq([bill])
      end

      it 'finds bills where the summary prefix matches' do
        bill = create(:bill, summary: '...dOwn the ICy stREets.')
        create(:bill, summary: '...I seEK to uNDeRstand me')
        expect(subject.call(query: 'STREE')).to eq([bill])
      end
    end

    context 'with a document number' do
      let!(:unmatched_bill) { create(:bill, number: 'fake') }

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
          bill = create(:bill, number: "#{prefix}1234")
          expect(subject.call(query: prefix)).to eq([bill])
        end
      end
    end
  end
end

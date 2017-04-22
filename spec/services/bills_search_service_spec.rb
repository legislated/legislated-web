describe BillsSearchService do
  subject { described_class }

  describe '#filter' do
    let(:query) { Bill.all }
    let(:search_query) { '' }
    let(:result) { subject.filter(query, search_query) }

    context 'when the search query looks like plain text' do
      context 'and the title prefix matches' do
        let(:search_query) { 'MOTO' }
        let!(:bill1) { create(:bill, :with_any_hearing, title: 'MoTor AwAY') }
        let!(:bill2) { create(:bill, :with_any_hearing, title: 'I am a ScIEntiSt') }

        it 'includes the bill' do
          expect(result).to eq([bill1])
        end
      end

      context 'and the title fuzzy matches' do
        let(:search_query) { 'OTOR' }
        let!(:bill1) { create(:bill, :with_any_hearing, title: 'MoTor AwAY') }
        let!(:bill2) { create(:bill, :with_any_hearing, title: 'I am a ScIEntiSt') }

        it 'includes the bill' do
          expect(result).to eq([bill1])
        end
      end

      context "and the bill's summary prefixes" do
        let(:search_query) { 'STREE' }
        let!(:bill1) { create(:bill, :with_any_hearing, summary: '...dOwn the ICy stREets.') }
        let!(:bill2) { create(:bill, :with_any_hearing, summary: '...I seEK to uNDeRstand me') }

        it 'includes the bill' do
          expect(result).to eq([bill1])
        end
      end
    end

    context 'when the search query looks like a document number' do
      let!(:bill1) { create(:bill, :with_any_hearing, document_number: 'HB1234') }
      let!(:bill2) { create(:bill, :with_any_hearing, document_number: 'SB1234') }

      context 'for the house' do
        let(:search_query) { 'hB' }

        it 'includes house bills' do
          expect(result).to eq([bill1])
        end
      end

      context 'for the senate' do
        let(:search_query) { 'Sb' }

        it 'includes senate bills' do
          expect(result).to eq([bill2])
        end
      end
    end
  end
end

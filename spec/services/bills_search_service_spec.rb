describe BillsSearchService do
  subject { described_class }

  describe '#filter' do
    let(:query) { Bill.all }
    let(:search_query) { '' }
    let(:result) { subject.filter(query, search_query) }

    context 'when the search query looks like plain text' do
      context "and a bill's title matches" do
        let(:search_query) { bill1.title[1..-1].downcase }
        let!(:bill1) { create(:bill, :with_any_hearing, title: 'Motor Away') }
        let!(:bill2) { create(:bill, :with_any_hearing, title: 'I am a Scientist') }

        it 'matches the bill' do
          expect(result).to eq([bill1])
        end
      end

      context "and the bill's summary matches" do
        let(:search_query) { bill1.summary[1..-1].upcase }
        let!(:bill1) { create(:bill, :with_any_hearing, summary: '...down the icy streets.') }
        let!(:bill2) { create(:bill, :with_any_hearing, summary: '...I seek to understand me') }

        it 'matches the bill' do
          expect(result).to eq([bill1])
        end
      end
    end

    context 'when the search query looks like a document number' do
      let!(:bill1) { create(:bill, :with_any_hearing, document_number: 'HB1234') }
      let!(:bill2) { create(:bill, :with_any_hearing, document_number: 'SB1234') }

      context 'for the house' do
        let(:search_query) { 'hB' }

        it 'matches house bills' do
          expect(result).to eq([bill1])
        end
      end

      context 'for the senate' do
        let(:search_query) { 'Sb' }

        it 'matches senate bills' do
          expect(result).to eq([bill2])
        end
      end
    end
  end
end

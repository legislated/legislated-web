describe Bill do
  subject { build(:bill) }

  describe 'scopes' do
    describe '#by_date' do
      let!(:date) { Time.current }
      let!(:bill2) { create(:bill, hearing: create(:hearing, :with_any_committee, date: date)) }
      let!(:bill3) { create(:bill, hearing: create(:hearing, :with_any_committee, date: date + 1.day)) }
      let!(:bill1) { create(:bill, hearing: create(:hearing, :with_any_committee, date: date - 1.day)) }

      it 'sorts the bills by ascending hearing date' do
        expect(Bill.by_date).to eq([bill1, bill2, bill3])
      end

      context 'with a start date' do
        it 'only returns bills at or after that date' do
          expect(Bill.by_date(start: date)).to eq([bill2, bill3])
        end
      end

      context 'with an end date' do
        it 'only returns bills at or before that date' do
          expect(Bill.by_date(end: date)).to eq([bill1, bill2])
        end
      end
    end
  end

  shared_examples_for 'an ilga url' do |page, url_key|
    let(:url) { subject.send(url_key) }

    before do
      subject[url_key] = nil
    end

    it 'is the correct page' do
      expect(url).to match(page)
    end

    it 'has the correct parameters' do
      doc_type, doc_number = subject.document_number.match(/(\D+)(\d+)/).captures

      expect(url).to match("DocNum=#{doc_number}")
      expect(url).to match("DocTypeID=#{doc_type}")
      expect(url).to match('GAID=14')
      expect(url).to match('SessionID=91')
    end
  end

  describe '#details_url' do
    it_behaves_like('an ilga url', 'billstatus', :details_url)
  end

  describe '#full_text_url' do
    it_behaves_like('an ilga url', 'fulltext', :full_text_url)
  end
end

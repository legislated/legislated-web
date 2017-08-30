describe Bill do
  subject { build(:bill, :with_documents) }

  describe 'scopes' do
    describe '#by_date' do
      let(:date) { Time.current }
      let(:bill2) { create_bill(date) }
      let(:bill3) { create_bill(date + 1.day) }
      let(:bill1) { create_bill(date - 1.day) }
      let(:bills) { Bill.where(id: [bill2.id, bill3.id, bill1.id]) }

      def create_bill(date)
        create(:bill, :with_documents, hearing: create(:hearing, :with_any_committee, date: date))
      end

      it 'sorts the bills by ascending hearing date' do
        expect(bills.by_date).to eq([bill1, bill2, bill3])
      end

      it 'only returns bills at or after the start date' do
        expect(bills.by_date(start: date)).to eq([bill2, bill3])
      end

      it 'only returns bills at or before the end date' do
        expect(bills.by_date(end: date)).to eq([bill1, bill2])
      end
    end
  end

  describe '#details_url' do
    let(:url) { subject.details_url }

    before do
      subject[:details_url] = nil
    end

    it 'is the correct page' do
      expect(url).to match('billstatus')
    end

    it 'has the correct parameters' do
      document_number = subject.documents.first&.number
      type, number = document_number.match(/(\D+)(\d+)/).captures

      expect(url).to match("DocNum=#{number}")
      expect(url).to match("DocTypeID=#{type}")
      expect(url).to match('GAID=14')
      expect(url).to match('SessionID=91')
    end
  end
end

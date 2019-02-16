describe Bill do
  subject { build(:bill, :with_documents) }

  describe '.by_hearing_date' do
    let!(:date) { Time.current }
    let!(:bill2) { create(:bill, hearing_date: date) }
    let!(:bill3) { create(:bill, hearing_date: date + 1.day) }
    let!(:bill1) { create(:bill, hearing_date: date - 1.day) }

    it 'sorts the bills by ascending hearing date' do
      expect(Bill.by_hearing_date).to eq([bill1, bill2, bill3])
    end

    it 'finds bills with hearings at or after the start date' do
      expect(Bill.by_hearing_date(start: date)).to eq([bill2, bill3])
    end

    it 'finds bills with hearings at or before the end date' do
      expect(Bill.by_hearing_date(end: date)).to eq([bill1, bill2])
    end
  end

  describe '.by_last_action_date' do
    it 'sorts bills by descending last action date' do
      bill1 = create(:bill, actions: [{ date: 3.days.ago }])
      bill2 = create(:bill, actions: [])
      bill3 = create(:bill, actions: [{ date: 1.days.ago }])
      expect(Bill.by_last_action_date).to eq([bill3, bill1, bill2])
    end
  end

  describe '.with_actor' do
    it 'finds bills whose last step matches any of the actors' do
      actors = [
        Step::Actors::LOWER,
        Step::Actors::LOWER_COMMITTEE
      ]

      bills = actors.map do |actor|
        create(:bill, steps: attributes_for_list(:step, 1, actor: actor))
      end

      expect(Bill.with_actor(Step::Actors::LOWER)).to eq([bills.first])
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
      document_number = subject.document&.number
      type, number = document_number.match(/(\D+)(\d+)/).captures

      expect(url).to match("DocNum=#{number}")
      expect(url).to match("DocTypeID=#{type}")
      expect(url).to match('GAID=15')
      expect(url).to match('SessionID=108')
    end
  end
end

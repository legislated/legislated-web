describe ImportHearingBillsJob do
  subject { described_class.new }

  describe '#perform' do
    let(:hearing) { Hearing.first }
    let(:mock_scraper) { double('Scraper') }

    let(:existing_bill) { create(:bill, hearing: Hearing.second) }
    let(:existing_bill_attrs) { attributes_for(:bill, external_id: existing_bill.external_id) }

    let(:scraper_response) { [existing_bill_attrs] + attributes_for_list(:bill, 2) }

    before do
      allow(mock_scraper).to receive(:run).and_return(scraper_response)
      allow(subject).to receive(:scraper).and_return(mock_scraper)
    end

    it "scrapes the hearing's bills" do
      subject.perform(hearing.id)
      expect(mock_scraper).to have_received(:run).with(hearing)
    end

    it 'updates bills that already exist' do
      subject.perform(hearing.id)
      existing_bill.reload
      expect(existing_bill).to have_attributes(existing_bill_attrs)
    end

    it "creates bills that don't exist" do
      expect { subject.perform(hearing.id) }.to change(Bill, :count).by(2)
    end

    it "raises a not found error when the hearing doesn't exist" do
      expect { subject.perform(SecureRandom.uuid) }.to raise_error(ActiveRecord::RecordNotFound)
    end
  end
end

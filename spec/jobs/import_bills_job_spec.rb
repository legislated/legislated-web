describe ImportBillsJob do
  subject { described_class.new }

  describe "#perform" do
    let(:hearing) { Hearing.first }
    let(:mock_scraper) { double("Scraper") }

    let(:existing_bill) { create(:bill, hearing: Hearing.second) }
    let(:existing_bill_attrs) { attributes_for(:bill, external_id: existing_bill.external_id) }
    let(:expected_attrs) { [existing_bill_attrs] + attributes_for_list(:bill, 2) }

    before do
      allow(mock_scraper).to receive(:run).and_return(expected_attrs)
      allow(subject).to receive(:scraper).and_return(mock_scraper)
    end

    it "scrapes the hearing's bills" do
      subject.perform(hearing)
      expect(mock_scraper).to have_received(:run).with(hearing)
    end

    it "updates bills that already exist" do
      subject.perform(hearing)
      existing_bill.reload
      expect(existing_bill).to have_attributes(existing_bill_attrs)
    end

    it "creates bills that don't exist" do
      expect { subject.perform(hearing) }.to change(Bill, :count).by(2)
    end

    context "after catching a scraping error" do
      xit "sends a slack notification" do
      end
    end

    context "after catching an active record error" do
      xit "sends a slack notification" do
      end
    end
  end
end

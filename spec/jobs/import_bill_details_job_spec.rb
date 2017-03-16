describe ImportBillDetailsJob do
  subject { described_class.new }

  describe "#perform" do
    let(:bill) { build(:bill, :with_any_hearing) }
    let(:mock_scraper) { double("Scraper") }
    let(:expected_synopsis) { Faker::Company::bs }
    let(:scraper_response) { { synopsis: expected_synopsis } }

    before do
      allow(mock_scraper).to receive(:run).and_return(scraper_response)
      allow(subject).to receive(:scraper).and_return(mock_scraper)
    end

    it "scrapes the bill details" do
      subject.perform(bill)
      expect(mock_scraper).to have_received(:run).with(bill)
    end

    it "updates the bill with new details" do
      subject.perform(bill)
      expect(bill.synopsis).to eq(expected_synopsis)
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

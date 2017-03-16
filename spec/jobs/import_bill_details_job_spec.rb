describe ImportBillDetailsJob do
  subject { described_class.new }

  describe "#perform" do
    let(:bill) { build(:bill) }
    let(:mock_scraper) { double("Scraper") }
    let(:expected_synopsis) { Faker::Company::bs }

    before do
      allow(mock_scraper).to receive(:run).and_return({ synopsis: expected_synopsis })
      allow(subject).to receive(:make_scraper).and_return(mock_scraper)
    end

    it "updates the bill with new details" do
      subject.perform(bill)
      expect(bill.synopsis).to eq(expected_synopsis)
    end
  end
end

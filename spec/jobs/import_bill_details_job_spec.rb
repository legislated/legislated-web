describe ImportBillDetailsJob do
  subject { described_class.new }

  describe "#perform" do
    let(:bill) { create(:bill, :with_any_hearing) }
    let(:mock_scraper) { double("Scraper") }
    let(:expected_summary) { Faker::Company::bs }
    let(:scraper_response) { { summary: expected_summary } }

    before do
      allow(mock_scraper).to receive(:run).and_return(scraper_response)
      allow(subject).to receive(:scraper).and_return(mock_scraper)
    end

    it "scrapes the bill details" do
      subject.perform(bill.id)
      expect(mock_scraper).to have_received(:run).with(bill)
    end

    it "updates the bill with new details" do
      subject.perform(bill.id)
      bill.reload
      expect(bill.summary).to eq(expected_summary)
    end

    context "after catching a scraping error" do
      before do
        allow(mock_scraper).to receive(:run).and_raise(Scraper::Task::Error)
      end

      xit "sends a slack notification" do
      end
    end

    context "after catching an active record error" do
      before do
        allow_any_instance_of(Hearing).to receive(:save!).and_raise(ActiveRecord::ActiveRecordError)
      end

      xit "sends a slack notification" do
      end
    end
  end
end

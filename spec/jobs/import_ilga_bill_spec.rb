describe ImportIlgaBill do
  subject { described_class.new(mock_scraper) }

  describe '#perform' do
    let(:bill) { create(:bill, summary: nil) }

    it 'update the bill with a summary' do
      scraped_bill = build(:ilga_details_bill)

      subject = described_class.new(
        -> (_) { scraped_bill }
      )

      subject.perform(bill.id)

      expect(bill.reload).to have_attributes(scraped_bill.to_h)
    end
  end
end

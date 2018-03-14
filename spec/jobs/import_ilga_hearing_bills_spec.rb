describe ImportIlgaHearingBills do
  describe '#perform' do
    let(:hearing) { create(:hearing) }

    it 'updates bills with the slip urls' do
      bill = create(:bill, {
        slip_url: nil,
        slip_results_url: nil
      })

      scraped_bill = build(:ilga_hearing_bill, {
        ilga_id: bill.ilga_id
      })

      subject = described_class.new(
        -> (_) { [scraped_bill] }
      )

      subject.perform(hearing.id)

      expect(bill.reload).to have_attributes(scraped_bill.to_h)
    end
  end
end

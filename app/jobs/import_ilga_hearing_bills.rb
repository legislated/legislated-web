class ImportIlgaHearingBills
  include Worker

  def initialize(scrape_bills = Ilga::ScrapeHearingBills.new)
    @scrape_bills = scrape_bills
  end

  def perform(hearing_id)
    hearing = Hearing.find(hearing_id)

    scraped_bills = scrape_bills.call(hearing)
    scraped_bills.each do |scraped_bill|
      bill = Bill.find_by(ilga_id: scraped_bill.ilga_id)
      bill&.update(scraped_bill.to_h)
    end
  end

  private

  attr_reader :scrape_bills
end

class ImportIlgaBill
  include Worker

  def initialize(scraper = Ilga::ScrapeBill.new)
    @scraper = scraper
  end

  def perform(bill_id)
    bill = Bill.find(bill_id)
    scraped_bill = @scraper.call(bill)
    bill.update!(scraped_bill.to_h)
  end

  private

  attr_reader :scraper
end

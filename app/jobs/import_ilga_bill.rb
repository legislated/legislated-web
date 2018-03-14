class ImportIlgaBill
  include Worker

  def initialize(scraper = Ilga::ScrapeBillDetails.new)
    @scraper = scraper
  end

  def perform(bill_id)
    bill = Bill.find(bill_id)
    bill_attrs = @scraper.call(bill)
    bill.update!(bill_attrs)
  end

  private

  attr_reader :scraper
end

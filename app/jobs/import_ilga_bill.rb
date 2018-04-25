class ImportIlgaBill
  include Worker

  def initialize(scraper = Ilga::ScrapeBill.new)
    @scraper = scraper
  end

  def perform(bill_id)
    bill = Bill.find(bill_id)
    bill_attrs = @scraper.call(bill)
    bill.update!(bill_attrs.to_h)
  end

  private

  attr_reader :scraper
end

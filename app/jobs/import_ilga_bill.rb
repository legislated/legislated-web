class ImportBillDetails
  include Worker

  def initialize(scraper = Scraper::BillDetailsTask.new)
    @scraper = scraper
  end

  def perform(bill_id)
    bill = Bill.find(bill_id)
    bill_attrs = @scraper.run(bill)
    bill.update!(bill_attrs)
  end
end

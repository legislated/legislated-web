class ImportBillDetailsJob
  include Worker

  def scraper
    @scraper ||= Scraper::BillDetailsTask.new
  end

  def perform(bill_id)
    bill = Bill.find(bill_id)
    bill_attrs = scraper.run(bill)
    bill.update!(bill_attrs)
  end
end

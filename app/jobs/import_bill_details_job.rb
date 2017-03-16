class ImportBillDetailsJob < ApplicationJob
  queue_as :default

  rescue_from(Scraper::Task::Error) do |error|
    puts error
  end

  def scraper
    @scraper ||= Scraper::BillDetailsTask.new
  end

  def perform(bill)
    bill_attrs = scraper.run(bill)
    bill.update!(bill_attrs)
  end
end

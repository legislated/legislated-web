class ImportBillsJob < ApplicationJob
  queue_as :default

  rescue_from(Scraper::Task::Error) do |error|
    puts error
  end

  def perform(hearing)
    scraper = Scraper::BillsTask.new(hearing)
    bill_attrs = scraper.run(hearing)
  end
end

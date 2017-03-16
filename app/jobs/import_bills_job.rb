class ImportBillsJob < ApplicationJob
  queue_as :default

  rescue_from(Scraper::Task::Error) do |error|
    puts error
  end

  def scraper
    @scraper ||= Scraper::BillsTask.new
  end

  def perform(hearing)
    bills_attrs = scraper.run(hearing)
    bills_attrs.each do |attrs|
      bill = Bill.find_or_initialize_by(attrs.slice(:external_id))
      bill.assign_attributes(attrs.merge({
        hearing: hearing
      }))

      bill.save!
    end
  end
end

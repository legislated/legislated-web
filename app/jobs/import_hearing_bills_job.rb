class ImportHearingBillsJob
  include Sidekiq::Worker

  def scraper
    @scraper ||= Scraper::BillsTask.new
  end

  def perform(hearing_id)
    hearing = Hearing.find(hearing_id)

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

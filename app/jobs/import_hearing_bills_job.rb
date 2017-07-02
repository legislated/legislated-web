class ImportHearingBillsJob
  include Worker

  def initialize(scraper = Scraper::BillsTask.new)
    @scraper = scraper
  end

  def perform(hearing_id)
    hearing = Hearing.find(hearing_id)

    bills_attrs = @scraper.run(hearing)
    bills_attrs.each do |attrs|
      Bill.upsert_by!(:external_id, attrs.merge(
        hearing: hearing
      ))
    end
  end
end

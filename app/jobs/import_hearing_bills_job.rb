class ImportHearingBillsJob
  include Worker

  def initialize(scraper = Scraper::BillsTask.new)
    @scraper = scraper
  end

  def perform(hearing_id)
    hearing = Hearing.find(hearing_id)

    scraped_attrs = @scraper.run(hearing)
    scraped_attrs.each do |attrs|
      bill = Bill.upsert_by!(:external_id,
        hearing: hearing,
        external_id: attrs.delete(:external_id)
      )

      Document.upsert_by!(:number, attrs.merge(
        bill: bill
      ))
    end
  end
end

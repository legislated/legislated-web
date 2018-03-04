class ImportHearingBills
  include Worker

  def initialize(scraper = Ilga::ScrapeHearingBills.new)
    @scraper = scraper
  end

  def perform(hearing_id)
    hearing = Hearing.find(hearing_id)

    scraped_attrs = @scraper.run(hearing)
    scraped_attrs.each do |attrs|
      bill_attrs = attrs.extract!(:external_id)
      bill = Bill.upsert_by!(:external_id, bill_attrs.merge(
        hearing: hearing
      ))

      Document.upsert_by!(:number, attrs.merge(
        bill: bill
      ))
    end
  end
end

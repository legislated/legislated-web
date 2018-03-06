class ImportIlgaHearingBills
  include Worker

  def initialize(scraper = Ilga::ScrapeHearingBills.new)
    @scraper = scraper
  end

  def perform(hearing_id)
    hearing = Hearing.find(hearing_id)

    attrs_list = @scraper.call(hearing)
    attrs_list.each do |attrs|
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

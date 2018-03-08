class ImportIlgaHearingBills
  include Worker

  def initialize(scraper = Ilga::ScrapeHearingBills.new)
    @scraper = scraper
  end

  def perform(hearing_id)
    hearing = Hearing.find(hearing_id)
    return if hearing.url.nil?

    attrs_list = @scraper.call(hearing)
    attrs_list.each do |attrs|
      attrs = attrs.to_h

      bill_attrs = attrs.extract!(:ilga_id)
      bill = Bill.upsert_by!(:ilga_id, bill_attrs.merge(
        hearing: hearing
      ))

      Document.upsert_by!(:number, attrs.merge(
        bill: bill
      ))
    end
  end
end

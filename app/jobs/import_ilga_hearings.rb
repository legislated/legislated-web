class ImportIlgaHearings
  include Worker

  Attrs = Struct.new(
    :hearing,
    :committee
  )

  def initialize(
    request = Ilga::FetchHearings.new,
    scraper = Ilga::ScrapeHearings.new
  )
    @request = request
    @scraper = scraper
  end

  def perform(chamber)
    attrs_list = merge_sources(
      @request.call(chamber),
      @scraper.call(chamber)
    )

    attrs_list.each do |attrs|
      committee = Committee.upsert_by!(
        :ilga_id,
        attrs.committee.merge(chamber: chamber)
      )

      hearing = Hearing.upsert_by!(
        :ilga_id,
        attrs.hearing.merge(committee: committee)
      )

      ImportIlgaHearingBills.schedule(hearing.id)
    end
  end

  private

  def merge_sources(fetched_hearings, scraped_hearings)
    scraped_hearings = scraped_hearings
      .index_by(&:ilga_id)

    fetched_hearings.map do |hearing|
      scraped_hearing = scraped_hearings[hearing.ilga_id]

      Attrs.new(
        hearing_attrs(hearing, scraped_hearing),
        hearing.committee.to_h
      )
    end
  end

  def hearing_attrs(hearing, scraped_hearing)
    hearing
      .to_h
      .without(:committee)
      .merge(scraped_hearing&.to_h || {})
  end
end

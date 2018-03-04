class ImportIlgaHearings
  include Worker

  def initialize(
    request = Ilga::FetchHearings.new,
    scraper = Ilga::ScrapeHearings.new
  )
    @request = request
    @scraper = scraper
  end

  def perform(chamber_id)
    chamber = Chamber.find(chamber_id)

    hearings_attrs = merge_sources(
      @scraper.call(chamber),
      @request.call(chamber)
    )

    hearings_attrs.each do |attrs|
      # upsert committee
      committee = Committee.upsert_by!(:external_id, hearing_attrs['committee'].merge({
        chamber: chamber
      })

      # upsert hearing
      hearing = Hearing.upsert_by!(:external_id, hearing_attrs.merge(
        committee: committee
      ))

      # enqueue the bills import
      ImportIlgaHearingBills.perform_async(hearing.id)
    end

    def merge_sources(fetched_hearings, scraped_hearings)
      scraped_hearings = scraped_hearings
        .index_by(&:external_id)

      fetched_hearings.map do |hearing|
        scraped_hearing = scraped_hearings[hearing.external_id]
        binding.pry
      end
    end
  end
end

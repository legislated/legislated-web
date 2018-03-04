class ImportHearings
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

    committee_hearings_attrs = @scraper.call(chamber)
    committee_hearings_attrs.each do |attrs|
      # rip out the hearing attrs for now
      hearing_attrs = attrs.delete(:hearing)

      # upsert committee
      committee = Committee.upsert_by!(:external_id, attrs.merge(
        chamber: chamber
      ))

      # upsert hearing
      hearing = Hearing.upsert_by!(:external_id, hearing_attrs.merge(
        committee: committee
      ))

      # enqueue the bills import
      ImportHearingBills.perform_async(hearing.id)
    end
  end
end

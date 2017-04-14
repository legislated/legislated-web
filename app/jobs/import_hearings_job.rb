class ImportHearingsJob
  include Sidekiq::Worker

  def scraper
    @scraper ||= Scraper::HearingsTask.new
  end

  def perform(chamber_id)
    chamber = Chamber.find(chamber_id)

    committee_hearings_attrs = scraper.run(chamber)
    committee_hearings_attrs.each do |attrs|
      # rip out the hearing attrs for now
      hearing_attrs = attrs.delete(:hearing)

      # create / update models
      committee = upsert_committee(attrs, chamber)
      hearing = upsert_hearing(hearing_attrs, committee)

      # enqueue the bills import
      ImportBillsJob.perform_async(hearing.id)
    end
  end

  def upsert_committee(attrs, chamber)
    committee = Committee.find_or_initialize_by(attrs.slice(:external_id))
    committee.assign_attributes(attrs.merge({
      chamber: chamber
    }))

    committee.save!
    committee
  end

  def upsert_hearing(attrs, committee)
    hearing = Hearing.find_or_initialize_by(attrs.slice(:external_id))
    hearing.assign_attributes(attrs.merge({
      committee: committee
    }))

    hearing.save!
    hearing
  end
end

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

      # upsert committee
      committee = Committee.find_or_initialize_by(attrs.slice(:external_id))
      committee.assign_attributes(attrs.merge({
        chamber: chamber
      }))

      committee.save!

      # upsert hearing
      hearing = Hearing.find_or_initialize_by(hearing_attrs.slice(:external_id))
      hearing.assign_attributes(hearing_attrs.merge({
        committee: committee
      }))

      hearing.save!

      # enqueue the bills import
      ImportHearingBillsJob.perform_async(hearing.id)
    end
  end
end

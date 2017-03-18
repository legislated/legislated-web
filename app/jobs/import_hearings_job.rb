class ImportHearingsJob < ApplicationJob
  queue_as :default

  rescue_from(Scraper::Task::Error) do |error|
    puts error
  end

  def scraper
    @scraper ||= Scraper::HearingsTask.new
  end

  def perform(chamber)
    committee_hearings_attrs = scraper.run(chamber)
    committee_hearings_attrs.each do |attrs|
      # rip out the hearing attrs for now
      hearing_attrs = attrs.delete(:hearing)

      # create / update the committee
      committee = Committee.find_or_initialize_by(attrs.slice(:external_id))
      committee.assign_attributes(attrs.merge({
        chamber: chamber
      }))

      committee.save!

      # create / update the hearing
      hearing = Hearing.find_or_initialize_by(hearing_attrs.slice(:external_id))
      hearing.assign_attributes(hearing_attrs.merge({
        committee: committee
      }))

      hearing.save!

      # enqueue the bills import
      ImportBillsJob.perform_later(hearing)
    end
  end
end

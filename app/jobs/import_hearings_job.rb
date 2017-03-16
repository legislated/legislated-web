class ImportHearingsJob < ApplicationJob
  queue_as :default

  rescue_from(Scraper::Task::Error) do |error|
    puts error
  end

  def perform(chamber)
    scraper = Scraper::HearingsTask.new(chamber)
    committee_hearing_attrs = scraper.run(chamber)
  end
end

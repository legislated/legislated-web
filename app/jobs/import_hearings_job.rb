class ImportHearingsJob < ApplicationJob
  queue_as :default

  rescue_from(Scraper::Error) do |error|
    puts error
  end

  def perform
    chambers = Chamber.all

    # run scraper to grab new / updated records for each chamber
    scraper = Scraper::Task.new({ skip_synopsis: true })
    scraper.run(chambers)

    # attempt to save all the new / updated records
    Chamber.transaction do
      chambers.each(&:save!)
    end
  end
end

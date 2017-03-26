namespace :jobs do
  desc "Enqueues import job"
  task :"import-hearings" => :environment do
    Chamber.all.each do |chamber|
      ImportHearingsJob.perform_async(chamber.id)
    end
  end

  desc "Enqueues export job"
  task :"export-bills" => :environment do
    BillsMailer.weekly_export_email.deliver_later
  end
end

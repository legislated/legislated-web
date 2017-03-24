namespace :jobs do
  task :"import-hearings" => :environment do
    Chamber.all.each do |chamber|
      ImportHearingsJob.perform_async(chamber.id)
    end
  end

  task :"export-bills" => :environment do
    BillsMailer.weekly_export_email.deliver_later
  end
end

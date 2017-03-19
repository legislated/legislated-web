namespace :jobs do
  task :"import-hearings" => :environment do
    Chamber.all.each do |chamber|
      ImportHearingsJob.new.perform_later(chamber)
    end
  end
end

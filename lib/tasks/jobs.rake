namespace :jobs do
  desc "Enqueues import job"
  task :"import-hearings" => :environment do
    puts "○ job:import-hearings - starting import jobs..."
    job_ids = Chamber.map.each do |chamber|
      ImportHearingsJob.perform_async(chamber.id)
    end
    puts "✔ job:import-hearings - started jobs: #{job_ids}"
  end

  desc "Enqueues export job"
  task :"export-bills" => :environment do
    puts "○ job:export-bills - starting export-job..."
    job_id = ExportBillsJob.perform_async
    puts "✔ job:export-bills - started export-job: #{job_id}"
  end
end

namespace :jobs do
  desc 'Enqueues import job'
  task 'import-bills': :environment do
    puts '○ job:import-bills - starting import jobs...'

    job_ids = []
    job_ids << ImportBillsJob.perform_async
    job_ids += Chamber.all
      .map { |c| ImportHearingsJob.perform_async(c.id) }

    puts "✔ job:import-bills - started jobs: #{job_ids}"
  end

  desc 'Enqueues export job'
  task 'export-bills': :environment do
    puts '○ job:export-bills - starting export-job...'

    job_ids = []
    job_ids << ExportBillsJob.perform_async

    puts "✔ job:export-bills - started jobs: #{job_ids}"
  end
end

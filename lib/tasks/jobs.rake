namespace :jobs do
  desc 'Enqueues import jobs'
  task 'import-data': :environment do
    puts '○ job:import-data - starting import job...'
    job_id = ImportJob.schedule
    puts "✔ job:import-data - started job: #{job_id}"
  end

  desc 'Enqueues export bills job'
  task 'export-bills': :environment do
    puts '○ job:export-bills - starting export job...'
    job_id = ExportBillsJob.schedule
    puts "✔ job:export-bills - started job: #{job_id}"
  end
end

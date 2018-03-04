namespace :jobs do
  desc 'Enqueues import jobs'
  task 'import-data': :environment do
    puts '○ job:import-data - starting import job...'
    job_id = ImportAll.schedule
    puts "✔ job:import-data - started job: #{job_id}"
  end

  desc 'Enqueues export bills job'
  task 'export-bills': :environment do
    puts '○ job:export-bills - starting export job...'
    job_id = ExportBills.schedule
    puts "✔ job:export-bills - started job: #{job_id}"
  end
end

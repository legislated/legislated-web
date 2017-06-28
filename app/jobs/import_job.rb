class ImportJob
  include Worker

  def perform
    ImportBillsJob.perform_async
    chambers = Chamber.all
    chambers.each { |c| ImportHearingsJob.perform_async(c.id) }
  end
end

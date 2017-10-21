class ImportJob
  include Worker

  def perform
    ImportBillsJob.schedule
    ImportLegislatorsJob.schedule

    chambers = Chamber.all
    chambers.each { |c| ImportHearingsJob.schedule(c.id) }
  end
end

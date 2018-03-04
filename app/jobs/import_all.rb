class ImportAll
  include Worker

  def perform
    ImportBillsJob.schedule
    ImportLegislators.schedule

    chambers = Chamber.all
    chambers.each { |c| ImportHearings.schedule(c.id) }
  end
end

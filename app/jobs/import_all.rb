class ImportAll
  include Worker

  def perform
    ImportBills.schedule
    ImportLegislators.schedule

    chambers = Chamber.all
    chambers.each { |c| ImportIlgaHearings.schedule(c.id) }
  end
end

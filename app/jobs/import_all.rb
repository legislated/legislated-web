class ImportAll
  include Worker

  def perform
    ImportBills.schedule
    ImportLegislators.schedule

    Chamber.each do |chamber|
      ImportIlgaHearings.schedule(chamber)
    end
  end
end

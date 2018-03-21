class ExportBills
  include Worker

  def perform
    BillsMailer.weekly_export_email.deliver_later
  end

  def self.scheduled?
    Time.current.saturday?
  end
end

class ExportBillsJob
  include Worker

  def self.scheduled?
    Time.current.saturday?
  end

  def perform
    BillsMailer.weekly_export_email.deliver_later
  end
end

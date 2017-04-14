class ExportBillsJob
  include Sidekiq::Worker

  def perform
    BillsMailer.weekly_export_email.deliver_later if Time.current.saturday?
  end
end

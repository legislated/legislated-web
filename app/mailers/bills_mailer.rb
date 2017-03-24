class BillsMailer < ApplicationMailer
  default from: "noreply@billtracking.org"

  def weekly_export_email
    date = csv_service.default_start_date

    # stringify date range
    @start_date = date.to_s(:date_only)
    @end_date = (date + 1.week).to_s(:date_only)

    # add csv as attachment
    attachments["il-bills-#{@start_date}-#{@end_date}.csv"] = {
      mime_type: "text/csv",
      content: csv_service.serialize
    }

    # fire off mailer
    mail(subject: "Bills for Hearings #{@start_date}-#{@end_date}}", bcc: [
      "foo@bar.com"
    ])
  end

  def csv_service
    @csv_service ||= BillsCsvService.new
  end
end

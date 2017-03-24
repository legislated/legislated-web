class BillsMailer < ApplicationMailer
  default from: "noreply@billtracking.org"

  def weekly_export_email(csv_service = BillsCsvService.new)
    date = csv_service.default_start_date

    # expose stringified dates
    @start_date = date.to_s(:date_only)
    @end_date = (date + 1.week).to_s(:date_only)

    # add csv as attachment
    attachments["il-bills-#{@start_date}-#{@end_date}.csv"] = {
      mime_type: "text/csv",
      content: csv_service.serialize
    }

    # fire off mailer
    mail(
      subject: "Bills for Hearings #{@start_date}-#{@end_date}",
      bcc: recipients
    )
  end

  private

  def recipients
    recipient_string = ENV["EXPORT_MAILER_RECIPIENTS"]
    recipient_string.split(',')
  end
end

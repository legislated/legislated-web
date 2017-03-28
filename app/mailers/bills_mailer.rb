class BillsMailer < ApplicationMailer
  default from: "noreply@billtracking.org"

  # sends a weekly export of bill data to a list of recipients stored in the
  # EXPORT_MAILER_RECIPIENTS environment variable
  def weekly_export_email(csv_service = BillsCsvService.new)
    start = Time.now.next_week
    date_range = { start: start, end: start.end_of_week }

    # expose stringified dates
    @start_date = date_range[:start].to_s(:date_only)
    @end_date = date_range[:end].to_s(:date_only)

    # add csv as attachment
    attachments["il-bills-#{@start_date}-#{@end_date}.csv"] = {
      mime_type: "text/csv",
      content: build_csv(csv_service, date_range)
    }

    # fire off mailer
    mail(
      subject: "Bills for Hearings #{@start_date}-#{@end_date}",
      bcc: build_recipients
    )
  end

  private

  # attachment
  def build_csv(csv_service, date_range)
    query = Bill.includes(hearing: :committee).by_date(date_range)
    csv_service.serialize(query)
  end

  # destination
  def build_recipients
    recipient_string = ENV["EXPORT_MAILER_RECIPIENTS"]
    recipient_string.split(',')
  end
end

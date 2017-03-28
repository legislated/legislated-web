class BillsMailer < ApplicationMailer
  default from: "noreply@billtracking.org"

  # sends a weekly export of bill data to a list of recipients stored in the
  # EXPORT_MAILER_RECIPIENTS environment variable
  def weekly_export_email(csv_service = BillsCsvService.new)
    date = start_date

    # expose stringified dates
    @start_date = start_date.to_s(:date_only)
    @end_date = (date + 1.week).to_s(:date_only)

    # add csv as attachment
    attachments["il-bills-#{@start_date}-#{@end_date}.csv"] = {
      mime_type: "text/csv",
      content: csv_service.serialize(build_bills_query)
    }

    # fire off mailer
    mail(
      subject: "Bills for Hearings #{@start_date}-#{@end_date}",
      bcc: recipients
    )
  end

  private

  # attachment
  def start_date
    Time.now.beginning_of_week(:sunday)
  end

  def build_bills_query
    Bill.includes(hearing: :committee).by_date(start_date)
  end

  # destination
  def recipients
    recipient_string = ENV["EXPORT_MAILER_RECIPIENTS"]
    recipient_string.split(',')
  end
end

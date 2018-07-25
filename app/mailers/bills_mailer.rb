class BillsMailer < ApplicationMailer
  default from: 'noreply@billtracking.org'

  # sends a weekly export of bill data to a list of recipients stored in the
  # EXPORT_MAILER_RECIPIENTS environment variable
  def weekly_export_email(serialize_csv = Bills::SerializeCsv.new)
    start = Time.current.next_week
    dates = {
      start: start,
      end: start.end_of_week
    }

    # expose stringified dates
    @start_date = dates[:start].to_s(:date_only)
    @end_date = dates[:end].to_s(:date_only)

    # add csv as attachment
    attachments["il-bills-#{@start_date}-#{@end_date}.csv"] = {
      mime_type: 'text/csv',
      content: build_csv(serialize_csv, dates)
    }

    # fire off mailer
    mail(
      subject: "Bills for Hearings #{@start_date}-#{@end_date}",
      bcc: build_recipients
    )
  end

  private

  # attachment
  def build_csv(serialize_csv, dates)
    query = Bill
      .includes(hearing: :committee)
      .by_hearing_date(dates)

    serialize_csv.call(query)
  end

  # destination
  def build_recipients
    recipient_string = ENV['EXPORT_MAILER_RECIPIENTS']
    recipient_string.split(',')
  end
end

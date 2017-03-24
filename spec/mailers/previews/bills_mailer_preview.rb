# Preview all emails at http://localhost:3000/rails/mailers/bills_mailer
class BillsMailerPreview < ActionMailer::Preview
  def weekly_csv_email
    BillsMailer.weekly_export_email
  end
end

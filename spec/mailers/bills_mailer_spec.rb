describe BillsMailer, type: :mailer do
  subject { described_class }

  describe "#weekly_export_email" do
    let(:service) { double("csv-service") }
    let(:csv) { Faker::Lorem.sentence }
    let(:start_date) { Time.new(1995, 5, 1) }
    let(:mail) { subject.weekly_export_email(service).deliver_now }

    before do
      allow(service).to receive(:serialize).and_return(csv)
      allow(service).to receive(:default_start_date).and_return(start_date)
    end

    it "sets the subject" do
      expect(mail.subject).to eq("Bills for Hearings 95.05.01-95.05.08")
    end

    it "sets the sender" do
      expect(mail.from).to eq(["noreply@billtracking.org"])
    end

    it "sets the recipients" do
      expect(mail.bcc).to eq(["foo@bar.com"])
    end

    it "populates the body" do
      expect(mail.body.to_s).to match("95.05.01")
    end

    it "attaches the csv" do
      attachment = mail.attachments[0]
      expect(attachment).to be_present
      expect(attachment.filename).to eq("il-bills-95.05.01-95.05.08.csv")
      expect(attachment.mime_type).to eq("text/csv")
      expect(attachment.body.decoded).to eq(csv)
    end
  end
end

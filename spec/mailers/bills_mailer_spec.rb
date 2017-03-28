describe BillsMailer, type: :mailer do
  subject { described_class }

  describe "#weekly_export_email" do
    let(:date) { Time.new(1995, 5, 3) }
    let(:start_date) { date.beginning_of_week(:sunday) }
    let(:recipients) { "  one@test.com ,  two@test.com" }
    let(:csv) { Faker::Lorem.sentence }
    let(:service) { double("csv-service") }
    let(:mail) { subject.weekly_export_email(service).deliver_now }

    before do
      allow(service).to receive(:serialize).and_return(csv)
      allow(ENV).to receive(:[]).and_call_original
      allow(ENV).to receive(:[]).with("EXPORT_MAILER_RECIPIENTS").and_return(recipients)

      Timecop.freeze(date)
    end

    after do
      Timecop.return
    end

    it "sets the subject" do
      expect(mail.subject).to eq("Bills for Hearings 95.04.30-95.05.07")
    end

    it "sets the sender" do
      expect(mail.from).to eq(["noreply@billtracking.org"])
    end

    it "sets the recipients" do
      expect(mail.bcc).to eq(["one@test.com", "two@test.com"])
    end

    it "populates the body" do
      expect(mail.body.encoded).to match("95.04.30")
    end

    it "attaches the csv" do
      attachment = mail.attachments[0]
      expect(attachment).to be_present
      expect(attachment.filename).to eq("il-bills-95.04.30-95.05.07.csv")
      expect(attachment.mime_type).to eq("text/csv" )
      expect(attachment.body.decoded).to eq(csv)
    end

    context "serializes a csv that" do
      let!(:bill1) { create(:bill, hearing: create(:hearing, :with_any_committee, date: start_date - 1.days)) }
      let!(:bill3) { create(:bill, hearing: create(:hearing, :with_any_committee, date: start_date + 1.days)) }
      let!(:bill2) { create(:bill, hearing: create(:hearing, :with_any_committee, date: start_date)) }

      it "contains bills from the most recent week" do
        subject.weekly_export_email(service).deliver_now
        expect(service).to have_received(:serialize).with([bill2, bill3])
      end
    end
  end
end

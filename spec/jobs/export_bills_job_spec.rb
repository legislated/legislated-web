describe ExportBillsJob do
  subject { described_class.new }

  describe "#perform" do
    let(:mailer) { double("weekly_export_email") }

    before do
      allow(BillsMailer).to receive(:weekly_export_email).and_return(mailer)
      allow(mailer).to receive(:deliver_later)
    end

    context "when it's saturday" do
      let(:date) { Time.now.sunday - 1.days }
      let(:start_date) { date.beginning_of_week(:sunday) }

      before do
        Timecop.freeze(date)
      end

      after do
        Timecop.return
      end

      it "sends the export mailer" do
        subject.perform
        expect(mailer).to have_received(:deliver_later)
      end
    end

    context "when it is not saturday" do
      before do
        allow(Time).to receive(:now).and_return(Time.now.monday)
      end

      it "does not send the mailer" do
        subject.perform
        expect(mailer).to_not have_received(:deliver_later)
      end
    end
  end
end

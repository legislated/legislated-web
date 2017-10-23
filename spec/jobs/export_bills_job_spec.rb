describe ExportBillsJob do
  describe '.schedule' do
    subject { described_class }

    context "when it's saturday" do
      before do
        Timecop.freeze(Time.current.sunday - 1.day)
      end

      after do
        Timecop.return
      end

      it 'sends the export mailer' do
        expect(subject).to receive(:perform_async)
        subject.schedule
      end
    end

    context "when it's not saturday" do
      before do
        allow(Time).to receive(:now).and_return(Time.current.monday)
      end

      it 'does not send the mailer' do
        expect(subject).to_not receive(:perform_async)
        subject.schedule
      end
    end
  end
end

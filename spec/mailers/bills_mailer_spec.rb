describe BillsMailer, type: :mailer do
  subject { described_class }

  describe '#weekly_export_email' do
    let(:date) { Time.zone.local(1995, 5, 3) }
    let(:start_date) { date.next_week }
    let(:recipients) { '  one@test.com ,  two@test.com' }
    let(:csv) { Faker::Lorem.sentence }
    let(:serializer) { object_double(Bills::SerializeCsv.new) }
    let(:mail) { subject.weekly_export_email(serializer).deliver_now }

    before do
      allow(serializer).to receive(:call).and_return(csv)
      allow(ENV).to receive(:[]).and_call_original
      allow(ENV).to receive(:[]).with('EXPORT_MAILER_RECIPIENTS').and_return(recipients)

      Timecop.freeze(date)
    end

    after do
      Timecop.return
    end

    it 'sets the subject' do
      expect(mail.subject).to eq('Bills for Hearings 95.05.08-95.05.14')
    end

    it 'sets the sender' do
      expect(mail.from).to eq(['noreply@billtracking.org'])
    end

    it 'sets the recipients' do
      expect(mail.bcc).to eq(['one@test.com', 'two@test.com'])
    end

    it 'populates the body' do
      expect(mail.body.encoded).to match('95.05.08')
    end

    it 'attaches the csv' do
      attachment = mail.attachments[0]
      expect(attachment).to be_present
      expect(attachment.filename).to eq('il-bills-95.05.08-95.05.14.csv')
      expect(attachment.mime_type).to eq('text/csv')
      expect(attachment.body.decoded).to eq(csv)
    end

    context 'serializes a csv that' do
      let!(:bill1) { create(:bill, hearing: create(:hearing, date: start_date - 1.day)) }
      let!(:bill3) { create(:bill, hearing: create(:hearing, date: start_date + 1.day)) }
      let!(:bill2) { create(:bill, hearing: create(:hearing, date: start_date)) }

      it 'contains bills from the most recent week' do
        subject.weekly_export_email(serializer).deliver_now
        expect(serializer).to have_received(:call).with([bill2, bill3])
      end
    end
  end
end

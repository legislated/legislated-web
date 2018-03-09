describe ImportBills do
  subject { described_class.new(mock_redis, mock_fetch_bills) }

  let(:mock_redis) { double('Redis') }
  let(:mock_fetch_bills) { object_double(OpenStates::FetchBills.new) }

  describe '#perform' do
    let(:date) { Time.zone.now }

    before do
      Timecop.freeze(date)

      allow(mock_redis).to receive(:get).with(:import_bills_job_date)
      allow(mock_redis).to receive(:set).with(:import_bills_job_date, anything)
      allow(mock_fetch_bills).to receive(:call).and_return([])

      allow(ImportIlgaBill).to receive(:schedule)
    end

    after do
      Timecop.return
    end

    it 'imports bills and documents' do
      bills = build_list(:open_states_bill, 1)
      expect(mock_fetch_bills).to receive(:call).and_return(bills)

      expect do
        subject.perform
      end.to pass_all(
        change(Bill, :count).by(1),
        change(Document, :count).by(1)
      )
    end

    it 'imports bills that have changed since the last import' do
      expect(mock_redis).to receive(:get).with(:import_bills_job_date).and_return(date)
      expect(mock_fetch_bills).to receive(:call).with({
        updated_since: date
      })

      subject.perform
    end

    it "updates the last import date" do
      expect(mock_redis).to receive(:set).with(:import_bills_job_date, date)
      subject.perform
    end
  end
end

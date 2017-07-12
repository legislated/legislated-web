describe ImportLegislatorsJob do
  subject { described_class.new(mock_redis, mock_service) }

  let(:mock_redis) { double('Redis') }
  let(:mock_service) { double('Service') }

  describe '#perform' do
    let(:date) { Time.zone.now }

    before do
      Timecop.freeze(date)

      # job date setup
      allow(mock_redis).to receive(:get).with(:import_legislators_job_date)
      allow(mock_redis).to receive(:set).with(:import_legislators_job_date, anything)
      allow(mock_service).to receive(:fetch_legislators).and_return([])

      allow(ImportBillDetailsJob).to receive(:perform_async)
    end

    after do
      Timecop.return
    end

    it 'fetches legislators with the correct fields' do
      subject.perform
      expect(mock_service).to have_received(:fetch_legislators) do |args|
        fields = ''
    end

    it 'fetches legislators since last import' do

    end

    it 'sets the last import date when job was done' do

    end

    context 'when upserting a legislator' do
      let(:legislator)
    end

  end
end

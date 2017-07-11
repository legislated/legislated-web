describe ImportLegislatorsJob do
  subject { described_class.new(mock_redis, mock_service) }

  let(:mock_redis) { double('Redis') }
  let(:mock_service) { double('Service') }

  describe '#perform' do
    let(:date) { Time.zone.now }

    before do
      Timecop.freeze(date)

      allow(mock_redis).to receive(:get).with(:import_legislators_job)
    end

    after do
      Timecop.return
    end

    it 'fetches legislators with the correct fields' do
      subject.perform
      expect(mock_service).to have_received(:fetch_legislators) do |args|
        fields = ''
    end
  end
end

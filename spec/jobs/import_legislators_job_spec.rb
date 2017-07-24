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

      allow(ImportLegislatorsJob).to receive(:perform_async)
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
      allow(mock_redis).to receive(:get).with(:import_legislators_job_date).and_return(date)
      subject.perform
      expect(mock_service).to have_received(:fetch_legislators) do |args|
        expect(args[:updated_since]).to eq date
      end
    end

    it 'sets the last import date when job was done' do
      subject.perform
      expect(mock_redis).to have_received(:set).with(:import_legislators_job_date, date)
    end

    context 'when upserting a legislator' do
      let(:legislator) { create(:legislator) }
      let(:attrs) { attributes_for(:legislator, external_id: legislator.external_id)}

      def perform
        subject.perform
        legislator.reload
      end

      def response(attrs = {})
        base_response = {
          'leg_id' => '',
          'first_name' => '',
          'last_name' => '',
          'district' => '',
          'url' => "http://dccouncil.us/council/#{legislator.first_name}-#{legislator.last_name}"
          'roles' => []
        }

        Array.wrap(base_response.merge(attrs))
      end

      it "sets the legislator's core attributes" do
        allow(mock_service).to receive(:fetch_legislators).and_return(response(
          'leg_id' => attrs[],
          'first_name' => attrs[:first_name],
          'last_name' => attrs[:last_name],
          'district' => attrs[:district]
        ))

        perform
        expect(legislator).to have_attributes(attrs.slice(
          :first_name,
          :last_name,
          :district
        ))
      end

      it "sets the legislator's source-url derived attributes" do

      end

      it 'creates the legislator if it does not exist' do

      end

    end

  end
end

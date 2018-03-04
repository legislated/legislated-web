describe 'importing bills' do
  subject { ImportBillsJob.new(mock_redis) }

  let(:mock_redis) { double('Redis') }

  before do
    allow(mock_redis).to receive(:get).and_return(nil)
    allow(mock_redis).to receive(:set)
    allow(ImportBillDetails).to receive(:perform_async)
  end

  it 'imports bills from openstates' do
    VCR.use_cassette('import_bills') do
      subject.perform
      actual = Bill.all.to_json
      expect(actual).to match_json_snapshot('import_bills')
    end
  end
end

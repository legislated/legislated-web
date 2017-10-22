describe 'importing bills', :json_snapshot do
  subject { ImportBillsJob.new(mock_redis) }

  let(:mock_redis) { double('Redis') }

  before do
    allow(mock_redis).to receive(:get).and_return(nil)
    allow(mock_redis).to receive(:set)
    allow(ImportBillDetailsJob).to receive(:perform_async)
  end

  it 'imports bills from openstates' do
    snapshot = load_snapshot('import_bills.json')

    VCR.use_cassette('import_bills') do
      subject.perform
      expect(to_json_snapshot(Bill.all)).to eq(snapshot)
    end
  end
end

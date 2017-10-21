describe 'importing bills' do
  subject { ImportBillsJob.new(mock_redis) }

  let(:mock_redis) { double('Redis') }

  before do
    allow(mock_redis).to receive(:get).and_return(nil)
    allow(mock_redis).to receive(:set)
    allow(ImportBillDetailsJob).to receive(:perform_async)
  end

  def load_snapshot(path)
    clean_json(File.read("spec/fixtures/snapshots/#{path}"))
  end

  def clean_json(json)
    JSON.parse(json.gsub(/"(id|created_at|updated_at)":"[^"]+",?/, ''))
  end

  it 'imports bills from openstates' do
    snapshot = load_snapshot('import_bills.json')

    VCR.use_cassette('import_bills') do
      subject.perform
      expect(clean_json(Bill.all.to_json)).to eq(snapshot)
    end
  end
end

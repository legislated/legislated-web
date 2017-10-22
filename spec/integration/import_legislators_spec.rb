describe 'importing legislators', :json_snapshot do
  subject { ImportLegislatorsJob.new }

  it 'imports bills from openstates' do
    snapshot = load_snapshot('import_legislators.json')

    VCR.use_cassette('import_legislators') do
      subject.perform
      expect(to_json_snapshot(Legislator.all)).to eq(snapshot)
    end
  end
end

describe 'importing hearings', :json_snapshot do
  subject { ImportHearingsJob.new }

  it 'imports committees and hearings from ilga' do
    snapshot = load_snapshot('import_hearings.json')

    # VCR.use_cassette('import_hearings') do
      subject.perform(Chamber.first.id)
      records = Hearing.all + Committee.all
      expect(to_json_snapshot(records)).to eq(snapshot)
    # end
  end
end

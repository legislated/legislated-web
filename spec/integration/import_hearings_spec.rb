describe 'importing hearings' do
  subject { ImportHearingsJob.new }

  it 'imports committees and hearings from ilga' do
    subject.perform(Chamber.house.first.id)
    actual = Committee.all.to_json(include: :hearings)
    expect(actual).to match_json_snapshot('import_hearings')
  end
end

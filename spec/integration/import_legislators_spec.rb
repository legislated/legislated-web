describe 'importing legislators' do
  subject { ImportLegislators.new }

  it 'imports legislators from openstates' do
    VCR.use_cassette('import_legislators') do
      subject.perform
      actual = Legislator.all.to_json
      expect(actual).to match_json_snapshot('import_legislators')
    end
  end
end

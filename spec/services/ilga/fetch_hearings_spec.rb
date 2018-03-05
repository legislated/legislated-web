describe Ilga::FetchHearings do
  subject { described_class.new }

  describe '#call' do
    let(:date) { Time.zone.local(2018, 3, 4) }

    before do
      Timecop.freeze(date)
    end

    after do
      Timecop.return
    end

    it 'fetches hearings from ilga' do
      chamber = Chamber.house.first

      VCR.use_cassette('ilga_fetch_hearings') do
        result = subject.call(chamber)
        actual = result.to_json
        expect(actual).to match_json_snapshot('ilga_fetch_hearings')
      end
    end
  end
end

describe OpenStates::FetchBills do
  subject { described_class.new }

  describe '#call' do
    it 'fetches bills from open states' do
      VCR.use_cassette('open_states_fetch_bills') do
        result = subject.call(
          q: 'pe',
          updated_since: Date.new(2018, 3, 10)
        )

        actual = result.to_json
        expect(actual).to match_json_snapshot('open_states_fetch_bills')
      end
    end
  end
end

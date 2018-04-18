describe OpenStates::FetchCommittees do
    subject { described_class.new }
  
    describe '#call' do
      it 'fetches committees from open states' do
        VCR.use_cassette('open_states_fetch_committees_with_custom_fields') do
          result = subject.call()
  
          actual = result.to_json
          expect(actual).to match_json_snapshot('open_states_fetch_committees_with_custom_fields')
        end
      end
    end
  end
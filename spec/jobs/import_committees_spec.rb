describe ImportCommittees do
  subject { described_class.new(mock_redis, mock_fetch_committees) }

  let(:mock_redis) { double('Redis') }
  let(:mock_fetch_committees) { object_double(OpenStates::FetchCommittees.new) }

  describe '#perform' do
    
    before do
      allow(mock_fetch_committees).to receive(:call).and_return([])
    end

    context 'when upserting a committee' do
      let(:committee) { create(:committee) }
      let(:attrs) { attributes_for(:committee, os_id: committee.os_id) }

      it "sets the committee's core attributes" do
        committee_data = build(:open_states_committee)
        allow(mock_fetch_committees).to receive(:call).and_return([committee_data])

        subject.perform
        binding.pry
        expect(committee).to have_attributes(:os_id => committee_data.os_id, 
          :name => committee_data.name)
      end

      it 'creates the committee if it does not exist' do
        committee_data = build(:open_states_committee)

        allow(mock_fetch_committees).to receive(:call).and_return([committee_data])

        expect { subject.perform }.to change(Committee, :count).by(1)
      end

      it 'creates committee based on committee role if it does not exist' do
        attrs = attributes_for(:committee)

        allow(mock_fetch_committees).to receive(:fetch_committees).and_return(response(
          'role.committee_id' => attrs[:os_id]
        ))

        expect { subject.perform }.to change(Committee, :count).by(1)
      end

      it '' do
      end

    end
  end
end

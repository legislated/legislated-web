describe ImportCommittees do
  subject { described_class.new(mock_service) }

  let(:mock_redis) { double('Redis') }
  let(:mock_fetch_committees) { object_double(OpenStates::FetchCommittees.new) }

  describe '#perform' do
    before do
      allow(mock_fetch_committees).to receive(:call).and_return([])
    end

    it 'fetches committees with the correct fields' do
      subject.perform
      expect(mock_fetch_committees).to have_received(:call) do |args|
        fields = 'id,committee,subcommittee,sources'
        expect(args[:fields]).to eq fields
      end
    end

    context 'when upserting a committee' do
      let(:committee) { create(:committee) }
      let(:attrs) { attributes_for(:committee, os_id: committee.os_id) }

      def response(attrs = {})
        base_response = {
          'id' => '',
          'parent_id' => '',
          'committee' => '',
          'subcommittee' => '',
          'chamber' => '',
          'sources' => '',
        }

        Array.wrap(base_response.merge(attrs))
      end

      it "sets the committee's core attributes" do
        allow(mock_service).to receive(:call).and_return(response(
          'id' => attrs[:os_id],
          'committee' => attrs[:name],
          'chamber' => attrs[:chamber],
          'subcommittee' => attrs[:subcommittee],
          'parent_id' => attrs[:subcommittee],
          'sources' => attrs[:sources]
        ))

        subject.perform
        expect(committee.reload).to have_attributes(attrs.slice(
          :os_id,
          :name,
          :chamber,
          :subcommittee,
          :parent_id,
          :sources
        ))
      end

      it 'creates the committee if it does not exist' do
        attrs = attributes_for(:committee)

        allow(mock_service).to receive(:call).and_return(response(
          'leg_id' => attrs[:os_id]
        ))

        expect { subject.perform }.to change(Committee, :count).by(1)
      end

      it 'creates committee based on committee role if it does not exist' do
        attrs = attributes_for(:committee)

        allow(mock_service).to receive(:fetch_committees).and_return(response(
          'role.committee_id' => attrs[:os_id]
        ))

        expect { subject.perform }.to change(Committee, :count).by(1)
      end



    end
  end
end

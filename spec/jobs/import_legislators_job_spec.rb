describe ImportLegislatorsJob do
  subject { described_class.new(mock_service) }

  let(:mock_service) { double('OpenStatesService') }

  describe '#perform' do
    before do
      allow(mock_service).to receive(:fetch_legislators).and_return([])
    end

    it 'fetches legislators with the correct fields' do
      subject.perform
      expect(mock_service).to have_received(:fetch_legislators) do |args|
        fields = 'id,leg_id,active,first_name,middle_name,last_name,suffixes,party,chamber,district,url,email'
        expect(args[:fields]).to eq fields
      end
    end

    context 'when upserting a legislator' do
      let(:legislator) { create(:legislator) }
      let(:attrs) { attributes_for(:legislator, os_id: legislator.os_id) }

      def response(attrs = {})
        base_response = {
          'first_name' => '',
          'last_name' => '',
          'middle_name' => '',
          'suffixes' => '',
          'party' => '',
          'chamber' => '',
          'district' => '',
        }

        Array.wrap(base_response.merge(attrs))
      end

      it "sets the legislator's core attributes" do
        allow(mock_service).to receive(:fetch_legislators).and_return(response(
          'leg_id' => attrs[:os_id],
          'active' => attrs[:active],
          'first_name' => attrs[:first_name],
          'last_name' => attrs[:last_name],
          'middle_name' => attrs[:middle_name],
          'suffixes' => attrs[:suffixes],
          'party' => attrs[:party],
          'chamber' => attrs[:chamber],
          'district' => attrs[:district],
          'url' => attrs[:website_url],
          'email' => attrs[:email]
        ))

        subject.perform
        expect(legislator.reload).to have_attributes(attrs.slice(
          :os_id,
          :active,
          :first_name,
          :last_name,
          :middle_name,
          :suffixes,
          :party,
          :chamber,
          :district,
          :website_url,
          :email
        ))
      end

      it 'creates the legislator if it does not exist' do
        attrs = attributes_for(:legislator)

        allow(mock_service).to receive(:fetch_legislators).and_return(response(
          'leg_id' => attrs[:os_id]
        ))

        expect { subject.perform }.to change(Legislator, :count).by(1)
      end
    end
  end
end

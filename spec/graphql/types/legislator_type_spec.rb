describe Types::LegislatorType, graphql: :type do
  subject { described_class }

  let(:model) { build(:legislator) }

  it_maps_fields({
    os_id: 'osId',
    website_url: 'websiteUrl'
  })

  it 'provides a display name' do
    expect(field(:name)).to eq("#{model.first_name} #{model.middle_name} #{model.last_name} #{model.suffixes}")
  end
end

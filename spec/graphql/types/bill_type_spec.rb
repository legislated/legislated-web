describe Types::BillType, graphql: :type do
  subject { described_class }

  let(:model) { build(:bill, :with_any_hearing) }

  it_maps_fields({
    external_id: 'externalId',
    human_summary: 'humanSummary',
    sponsor_name: 'sponsorName',
    details_url: 'detailsUrl',
    full_text_url: 'fullTextUrl',
    witness_slip_url: 'witnessSlipUrl',
    witness_slip_result_url: 'witnessSlipResultUrl'
  })

  it 'exposes the committee' do
    expect(field(:committee)).to eq(model.hearing.committee)
  end

  it 'exposes the chamber' do
    expect(field(:chamber)).to eq(model.hearing.committee.chamber)
  end
end

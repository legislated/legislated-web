describe Types::BillType, graphql: :type do
  subject { described_class }

  let(:model) { build(:bill, :with_any_hearing, :with_documents) }
  let(:hearing) { model.hearing }
  let(:document) { model.documents.first }

  it_maps_fields({
    external_id: 'externalId',
    human_summary: 'humanSummary',
    sponsor_name: 'sponsorName',
    details_url: 'detailsUrl'
  })

  it 'exposes the committee' do
    expect(field(:committee)).to eq(model.hearing.committee)
  end

  it 'exposes the chamber' do
    expect(field(:chamber)).to eq(hearing.committee.chamber)
  end

  it 'deprecates the document number' do
    expect(field(:documentNumber)).to eq(document&.number)
  end

  it 'deprecates the full text url' do
    expect(field(:fullTextUrl)).to eq(document&.full_text_url)
  end

  it 'deprecates the slip url' do
    expect(field(:witnessSlipUrl)).to eq(document&.slip_url)
  end

  it 'deprecates the slip results url' do
    expect(field(:witnessSlipResultUrl)).to eq(document&.slip_results_url)
  end
end

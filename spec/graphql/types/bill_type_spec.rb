describe Types::BillType do
  subject { described_class }

  let(:bill) { build(:bill, :with_any_hearing) }

  it 'maps the fields correctly' do
    map = {
      external_id: 'externalId',
      sponsor_name: 'sponsorName',
      details_url: 'detailsUrl',
      full_text_url: 'fullTextUrl',
      witness_slip_url: 'witnessSlipUrl'
    }

    map.each do |key, graph_key|
      value = subject.fields[graph_key].resolve(bill, nil, nil)
      expect(value).to eq(bill.send(key))
    end
  end

  it 'exposes the committee' do
    committee = subject.fields['committee'].resolve(bill, nil, nil)
    expect(committee).to eq(bill.hearing.committee)
  end

  it 'exposes the chamber' do
    chamber = subject.fields['chamber'].resolve(bill, nil, nil)
    expect(chamber).to eq(bill.hearing.committee.chamber)
  end
end

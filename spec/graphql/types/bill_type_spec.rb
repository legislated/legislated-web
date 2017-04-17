describe Types::BillType do
  subject { described_class }

  it 'maps the fields correctly' do
    map = {
      external_id: 'externalId',
      sponsor_name: 'sponsorName',
      details_url: 'detailsUrl',
      full_text_url: 'fullTextUrl',
      witness_slip_url: 'witnessSlipUrl'
    }

    bill = build(:bill)
    map.each do |key, graph_key|
      value = subject.fields[graph_key].resolve(bill, nil, nil)
      expect(value).to eq(bill.send(key))
    end
  end
end

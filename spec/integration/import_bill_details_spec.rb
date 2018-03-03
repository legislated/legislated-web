describe 'importing bill details', :json_snapshot do
  subject { ImportBillDetailsJob.new }

  it 'imports bill details from ilga' do
    snapshot = load_snapshot('import_bill_details.json')
    records = Bill.all
    expect(to_json_snapshot(records)).to eq(snapshot)
  end
end

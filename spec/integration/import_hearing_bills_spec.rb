describe 'importing hearing bills', :json_snapshot do
  subject { ImportHearingBillsJob.new }

  it 'imports bills from ilga' do
    snapshot = load_snapshot('import_hearing_bills.json')
    expect(to_json_snapshot(Bill.all)).to eq(snapshot)
  end
end

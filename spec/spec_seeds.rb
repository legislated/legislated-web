include FactoryGirl::Syntax::Methods

create(:chamber, name: 'House')
create(:chamber, name: 'Senate')
create_list(:committee, 2, :with_any_chamber)
create_list(:hearing, 2, :with_any_committee)
create_list(:bill, 2, :with_any_hearing)

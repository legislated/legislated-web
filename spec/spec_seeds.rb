include FactoryGirl::Syntax::Methods

create(:chamber, name: "House")
create(:chamber, name: "Senate")
create_list(:committee, 2)
create_list(:hearing, 2)

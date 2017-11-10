require './spec/helpers/factory_helpers'
include FactoryBot::Syntax::Methods

chambers = [
  create(:chamber, name: 'House'),
  create(:chamber, name: 'Senate')
]

committees = chambers.flat_map do |chamber|
  create_list(:committee, 2, chamber: chamber)
end

hearings = committees.flat_map do |committee|
  create_list(:hearing, 2, committee: committee)
end

hearings.flat_map do |hearing|
  create_list(:bill, 10, :with_documents, :with_steps, hearing: hearing)
end

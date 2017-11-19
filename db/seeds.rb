include FactoryBot::Syntax::Methods

chambers = [
  create(:chamber, name: 'House'),
  create(:chamber, name: 'Senate')
]

committees = chambers.flat_map do |chamber|
  create_list(:committee, 2, chamber: chamber)
end

hearings = committees.flat_map do |committee|
  hearing1 = create(:hearing,
    committee: committee,
    date: Faker::Time.between(Time.zone.today, 1.week.from_now)
  )

  hearing2 = create(:hearing,
    committee: committee,
    date: Faker::Time.between(1.week.from_now, 1.month.from_now)
  )

  [hearing1, hearing2]
end

hearings.flat_map do |hearing|
  create_list(:bill, 10, :with_documents, :with_steps, hearing: hearing)
end

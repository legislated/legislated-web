include FactoryBot::Syntax::Methods

puts '• seeding...'

puts '- creating chambers'
chambers = [
  create(:chamber, name: 'House'),
  create(:chamber, name: 'Senate')
]

puts '- creating committees'
committees = chambers.flat_map do |chamber|
  create_list(:committee, 2, chamber: chamber)
end

puts '- creating hearings'
hearings = committees.flat_map do |committee|
  [
    create(:hearing, :this_week, committee: committee),
    create(:hearing, :after_this_week, committee: committee)
  ]
end

puts '- creating bills'
hearings.flat_map do |hearing|
  create_list(:bill, 10,
    :with_documents,
    :with_step_sequence,
    hearing: hearing
  )
end

puts '∆ finished seeding'

include FactoryBot::Syntax::Methods

puts '• seeding...'

puts '- creating chambers'
chambers = %w[House Senate].map do |name|
  create(:chamber, name: name)
end

puts '- creating committees'
committees = chambers.flat_map do |chamber|
  create_list(:committee, 2, chamber: chamber)
end

puts '- creating hearings'
hearings = committees.flat_map do |committee|
  %i[this_week after_this_week].map do |trait|
    create(:heaing, trait, committee: committee)
  end
end

puts '- creating bills'
hearings.flat_map do |hearing|
  create_list(:bill, 10, :with_documents, :with_step_sequence,
    hearing: hearing
  )
end

puts '∆ finished seeding'

include FactoryBot::Syntax::Methods

ActiveRecord::Base.logger.level = 1

puts '• seeding...'

puts '- creating committees'
committees = Chamber.flat_map do |chamber|
  create_list(:committee, 2, chamber: chamber)
end

puts '- creating hearings'
hearings = committees.flat_map do |committee|
  %i[this_week after_this_week].map do |trait|
    create(:hearing, trait, committee: committee)
  end
end

puts '- creating bills'
hearings.flat_map do |hearing|
  create_list(:bill, 10, :with_documents, :with_step_sequence,
    hearing: hearing
  )
end

puts '∆ finished seeding'

ActiveRecord::Base.logger.level = 0

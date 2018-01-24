FactoryBot.define do
  factory :bill do
    external_id { Faker::Number.unique.number(5) }
    os_id { "ILB0000#{Faker::Number.unique.number(6)}" }
    title { Faker::Company.catch_phrase }
    summary { Faker::Lorem.paragraph(6) }
    session_number { 99 }
    sponsor_name { Faker::Name.name }
    details_url { Faker::Internet.url }

    trait :with_hearing do
      hearing
    end

    trait :with_any_hearing do
      hearing { Hearing.first }
    end

    trait :with_documents do
      documents { build_list(:document, 1) }
    end

    trait :with_steps do
      steps { attributes_for_list(:step, 1) }
    end

    trait :with_step_sequence do
      actors = [
        Step::Actors::LOWER,
        Step::Actors::UPPER
      ]

      steps do
        sequence = actors.sample(1 + rand(2))
        sequence << Step::Actors::GOVERNOR if sequence.count == 2 && rand(2).zero?

        sequence.each_with_object([]) do |actor, memo|
          memo << attributes_for(:step, :introduced, actor: actor)
          break(memo) if rand(2).zero?
          memo << attributes_for(:step, :resolved, actor: actor)
        end
      end
    end
  end
end

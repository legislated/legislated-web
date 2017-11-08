FactoryBot.define do
  factory :committee do
    external_id { Faker::Number.unique.number(5) }
    name { Faker::Company.name }

    trait :with_any_chamber do
      chamber { Chamber.first }
    end

    trait :with_chamber do
      chamber
    end
  end
end

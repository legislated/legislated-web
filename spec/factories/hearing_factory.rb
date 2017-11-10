FactoryBot.define do
  factory :hearing do
    external_id { Faker::Number.unique.number(5) }
    url { Faker::Internet.url }
    location { Faker::Address.street_address }
    date { Faker::Time.between(Time.zone.today, 1.month.from_now) }
    is_cancelled false

    trait :with_any_committee do
      committee { Committee.first }
    end

    trait :with_committee do
      committee
    end
  end
end

FactoryGirl.define do
  factory :bill do
    external_id { Faker::Number.unique.number(5) }
    document_name { "#{%w(H S).sample}B#{Faker::Number.number(4)}" }
    description { optional { Faker::Company.catch_phrase } }
    synopsis { optional { Faker::Company.bs } }
    sponsor_name { Faker::Name.name }
    witness_slip_url { optional { Faker::Internet.url } }

    trait :with_any_hearing do
      hearing Hearing.first
    end

    trait :with_hearing do
      hearing
    end
  end
end

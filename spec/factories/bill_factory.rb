FactoryGirl.define do
  factory :bill do
    external_id { Faker::Number.unique.number(5) }
    document_number { "#{%w[H S].sample}B#{Faker::Number.number(4)}" }
    title { optional { Faker::Company.catch_phrase } }
    summary { optional { Faker::Lorem.paragraph(6) } }
    sponsor_name { Faker::Name.name }
    witness_slip_url { optional { Faker::Internet.url } }
    witness_slip_result_url { optional { Faker::Internet.url } }

    trait :with_any_hearing do
      hearing { Hearing.first }
    end

    trait :with_hearing do
      hearing
    end
  end
end

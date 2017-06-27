FactoryGirl.define do
  factory :bill do
    external_id { Faker::Number.unique.number(5) }
    os_id { "ILB0000#{Faker::Number.unique.number(6)}" }
    document_number { "#{%w[H S].sample}B#{Faker::Number.number(4)}" }
    title { optional { Faker::Company.catch_phrase } }
    summary { optional { Faker::Lorem.paragraph(6) } }
    session_number { 99 }
    sponsor_name { Faker::Name.name }
    details_url { Faker::Internet.url }
    full_text_url { Faker::Internet.url }
    witness_slip_url { Faker::Internet.url }
    witness_slip_result_url { Faker::Internet.url }

    trait :with_any_hearing do
      hearing { Hearing.first }
    end

    trait :with_hearing do
      hearing
    end
  end
end

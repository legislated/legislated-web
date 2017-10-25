FactoryGirl.define do
  factory :document do
    os_id { "ILB0000#{Faker::Number.unique.number(6)}" }
    number { "#{%w[H S].sample}B#{Faker::Number.number(4)}" }
    full_text_url { Faker::Internet.url }
    slip_url { Faker::Internet.url }
    slip_results_url { Faker::Internet.url }
    is_amendment { false }

    trait :with_any_bill do
      bill { Bill.first }
    end

    trait :with_bill do
      bill
    end
  end
end

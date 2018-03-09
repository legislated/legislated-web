FactoryBot.define do
  factory :document do
    os_id { "ILB0000#{Faker::Number.unique.number(6)}" }
    number { "#{%w[H S].sample}B#{Faker::Number.number(4)}" }
    full_text_url { Faker::Internet.url }
    slip_url { Faker::Internet.url }
    slip_results_url { Faker::Internet.url }
    is_amendment { false }

    trait :with_bill do
      bill { build(:bill) }
    end

    factory :open_states_document do
      initialize_with do
        OpenStates::ParseBill::Bill.new(
          os_id,
          number,
          full_text_url,
          is_amendment
        )
      end
    end
  end
end

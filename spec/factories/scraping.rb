FactoryBot.define do
  factory :scraped_bill, class: Hash do
    ilga_id { Faker::Number.unique.number(5) }
    number { "#{%w[H S].sample}B#{Faker::Number.number(4)}" }
    slip_url { Faker::Internet.url }
    slip_results_url { Faker::Internet.url }
    is_amendment { Faker::Boolean.boolean }

    initialize_with do
      attributes
    end
  end
end

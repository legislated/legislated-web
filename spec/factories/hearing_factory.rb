FactoryGirl.define do
  factory :hearing do
    external_id { Faker::Number.number(5) }
    url { Faker::Internet.url }
    location { Faker::Address.street_address }
    datetime { Faker::Time.between(1.year.ago, Date.today) }
    allows_slips true
    is_cancelled false
    committee { Committee.first }
  end
end

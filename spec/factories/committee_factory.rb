FactoryGirl.define do
  factory :committee do
    external_id { Faker::Number.number(5) }
    name { Faker::Company.name }
    chamber { Chamber.first }
  end
end

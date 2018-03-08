FactoryBot.define do
  factory :committee do
    ilga_id { Faker::Number.unique.number(5) }
    name { Faker::Company.name }
    chamber { Chamber.all.sample }
  end
end

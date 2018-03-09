FactoryBot.define do
  factory :committee do
    ilga_id { Faker::Number.unique.number(5) }
    name { Faker::Company.name }
    chamber { Chamber.all.sample }

    factory :fetched_ilga_committee do
      initialize_with do
        Ilga::ParseHearing::Committee.new(
          ilga_id,
          name
        )
      end
    end
  end
end

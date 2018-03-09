FactoryBot.define do
  factory :hearing do
    ilga_id { Faker::Number.unique.number(5) }
    url { Faker::Internet.url }
    location { Faker::Address.street_address }
    date { Faker::Time.between(Time.zone.today, 1.month.from_now) }
    is_cancelled false
    association :committee, strategy: :build

    trait :this_week do
      date { Faker::Time.between(Time.zone.today, 1.week.from_now) }
    end

    trait :after_this_week do
      date { Faker::Time.between(1.week.from_now, 1.month.from_now) }
    end

    factory :fetched_ilga_hearing do
      initialize_with do
        Ilga::ParseHearing::Hearing.new(
          ilga_id,
          date,
          location,
          is_cancelled,
          build(:fetched_ilga_committee)
        )
      end
    end

    factory :scraped_ilga_hearing do
      initialize_with do
        Ilga::ScrapeHearing::Hearing.new(
          ilga_id,
          url
        )
      end
    end
  end
end

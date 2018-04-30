FactoryBot.define do
  factory :action, class: Hash do
    date { Faker::Time.between(1.month.ago, Time.zone.today).to_s }
  end
end

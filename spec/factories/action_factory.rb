FactoryGirl.define do
  factory :action do
    name "My test action"
    stage "Upper"
    action_type "bill:introduced"
    datetime { Faker::Time.between(1.month.ago, Time.zone.today) }

    trait :with_bill do
      bill
    end
  end
end

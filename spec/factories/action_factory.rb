FactoryGirl.define do
  factory :action do
    name { 'Drink ' + Faker::Beer.name }
    stage "Upper"
    action_type "bill:introduced"
    datetime { Faker::Time.between(1.month.ago, Time.zone.today) }

    trait :with_bill do
      bill
    end
  end
  
  factory :open_states_action, class: Hash do 
    action { 'Drink ' + Faker::Beer.name }
    actor "Upper"
    type ["bill:introduced"]
    date { Faker::Time.between(1.month.ago, Time.zone.today).to_s }
    
    initialize_with {attributes.stringify_keys}
  end
end

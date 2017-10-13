FactoryGirl.define do
  factory :bill do
    external_id { Faker::Number.unique.number(5) }
    os_id { "ILB0000#{Faker::Number.unique.number(6)}" }
    title { optional { Faker::Company.catch_phrase } }
    summary { optional { Faker::Lorem.paragraph(6) } }
    session_number { 99 }
    sponsor_name { Faker::Name.name }
    details_url { Faker::Internet.url }

    trait :with_hearing do
      hearing
    end

    trait :with_any_hearing do
      hearing { Hearing.first }
    end

    trait :with_documents do
      documents { build_list(:document, 1) }
    end

    trait :with_actions do
      actions { build_list(:action, 1) }
    end
  end

  factory :open_states_action, class: Hash do
    action { 'Drink ' + Faker::Beer.name }
    actor 'Upper'
    type ['bill:introduced']
    date { Faker::Time.between(1.month.ago, Time.zone.today).to_s }

    initialize_with { attributes.stringify_keys }
  end
end

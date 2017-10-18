FactoryGirl.define do
  factory :step, class: Hash do
    actor { Step::Actors::all.sample }
    action { Step::Actions.all.sample }
    resolution { Step::Resolutions.all.sample }
    date { Faker::Time.between(1.month.ago, Time.zone.today).to_s }
  end
end

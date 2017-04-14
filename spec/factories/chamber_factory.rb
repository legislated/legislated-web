FactoryGirl.define do
  factory :chamber do
    name { %w[Senate House].sample }
    kind { name.downcase.to_sym }
  end
end

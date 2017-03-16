FactoryGirl.define do
  factory :chamber do
    name { %w(Senate House).sample }
    key { name.chars.first }
  end
end

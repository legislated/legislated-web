FactoryBot.define do
  factory :open_states_bill_data do
    initialize_with do
      OpenStates::ParseBill::Data.new(
        build(:open_states_bill),
        build_list(:open_states_document, 1)
      )
    end
  end
end

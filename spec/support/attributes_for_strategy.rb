class AttributesFor < FactoryBot::Strategy::AttributesFor
  def result(evaluation)
    super.delete_if do |_, value|
      value.is_a? ActiveRecord::Base
    end
  end
end

FactoryBot.register_strategy(:attributes_for, AttributesFor)

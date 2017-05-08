module FactoryHelpers
  def optional(chance = 0.1)
    rand < chance ? nil : yield
  end
end

module FactoryHelpers
  def optional(chance = 0.1, &generator)
    rand < chance ? nil : generator.call
  end
end

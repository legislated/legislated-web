module FactoryHelpers
  def optional(chance = 0.1, &generator)
    rand < chance ? nil : generator.call
  end
end

# sprinkle in some factory girl utilities
FactoryGirl::SyntaxRunner.send(:include, FactoryHelpers)

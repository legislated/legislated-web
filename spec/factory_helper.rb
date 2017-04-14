module FactoryHelpers
  def optional(chance = 0.1)
    rand < chance ? nil : yield
  end
end

# sprinkle in some factory girl utilities
FactoryGirl::SyntaxRunner.send(:include, FactoryHelpers)

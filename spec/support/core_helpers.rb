module CoreHelpers
  extend ActiveSupport::Concern

  def pass_all(*matchers)
    matchers.reduce(&:and)
  end
end

RSpec.configuration.include(CoreHelpers)

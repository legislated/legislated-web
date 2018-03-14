module Helpers
  module Core
    extend ActiveSupport::Concern

    def pass_all(*matchers)
      matchers.reduce(&:and)
    end
  end
end

RSpec.configuration.include(Helpers::Core)

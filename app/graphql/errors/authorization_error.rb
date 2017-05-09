module Errors
  class AuthorizationError < ::GraphQL::ExecutionError
    def initialize(message = 'Not authorized', ast_node: nil)
      super
    end
  end
end

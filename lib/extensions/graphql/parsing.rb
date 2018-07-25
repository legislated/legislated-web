module Extensions
  class GraphQL
    module Parsing
      def parse_graphql_data
        to_h.parse_graphql_data
      end
    end
  end
end

GraphQL::Query::Arguments.include Extensions::GraphQL::Parsing

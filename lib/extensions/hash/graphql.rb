module Extensions
  module Hash
    module GraphQL
      def parse_graphql_data
        deep_transform_keys { |k| k.to_s.underscore.to_sym }
      end

      def prepare_graphql_data
        deep_transform_keys { |k| k.to_s.camelize(:lower) }
      end
    end
  end
end

Hash.include Extensions::Hash::GraphQL

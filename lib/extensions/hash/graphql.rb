module Extensions
  module Hash
    module GraphQL
      def parse_graphql_data
        deep_transform_keys { |k| k.to_s.underscore }
          .with_indifferent_access
      end

      def prepare_graphql_data
        deep_transform_keys { |k| k.to_s.camel(:lower) }
      end
    end
  end
end

Hash.include Extensions::Hash::GraphQL

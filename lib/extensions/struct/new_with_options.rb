module Extensions
  module Struct
    module NewWithOptions
      def new_with_options(*args, **kwargs, &block)
        new(*args) do
          # store the options
          class << self
            attr_accessor :serializers
          end

          # store serializers
          self.serializers = kwargs[:serializes] || {}

          # add serializers for relations
          kwargs[:serializes_related]&.each do |key|
            self.serializers[key] = -> (child) {
              child.is_a?(Array) ? child.map(&:to_h) : child.to_h
            }
          end

          # run the existing block, if it defines to_h then /shrug
          instance_eval(&block) if block.present?

          # synthesize to_h based on the options
          def to_h
            result = super

            self.class.serializers.each do |key, serializer|
              result[key] = serializer.call(self[key])
            end

            result
          end
        end
      end
    end
  end
end

Struct.extend Extensions::Struct::NewWithOptions

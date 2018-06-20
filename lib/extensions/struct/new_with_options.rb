module Extensions
  module Struct
    module NewWithOptions
      def new_with_options(*args, **kwargs, &block)
        new(*args) do
          # store the options
          class << self
            attr_accessor :serialized_keys
          end

          self.serialized_keys = kwargs[:serializes]

          # run the existing block, if it defines to_h then /shrug
          instance_eval(&block) if block.present?

          # synthesize to_h based on the options
          def to_h
            result = super

            self.class.serialized_keys.each do |key|
              child = self[key]
              child.is_a?(Array) ? child.map(&:to_h) : child.to_h
            end

            result
          end
        end
      end
    end
  end
end

Struct.extend Extensions::Struct::NewWithOptions

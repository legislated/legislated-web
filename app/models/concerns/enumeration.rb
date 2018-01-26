module Enumeration
  extend ActiveSupport::Concern

  class_methods do
    def values(keys)
      @values ||= keys.map do |key|
        name = key.tr(':', '_').upcase.to_sym
        const_set(name, key)
        name
      end
    end

    def all
      @all ||= @values&.map { |name| const_get(name) }
    end

    def coerce!(value)
      all.find { |entry| entry == value } || (raise ValueNotFoundError value)
    end
  end

  # utilities
  class ValueNotFoundError < StandardError
    attr_reader :value

    def initialize(value)
      @value = value
      super("Could not find value: #{value}")
    end
  end
end

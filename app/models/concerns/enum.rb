module Enum
  extend ActiveSupport::Concern

  included do
    extend Enumerable
  end

  class_methods do
    def values(keys)
      @values ||= keys.map do |key|
        name = key.tr(':', '_').upcase.to_sym
        const_set(name, key)
        name
      end
    end

    def coerce!(value)
      all.find { |entry| entry == value } || (raise ValueNotFoundError value)
    end

    # collection
    def all
      @all ||= @values&.map { |name| const_get(name) }
    end

    def each(&block)
      all.each(&block)
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

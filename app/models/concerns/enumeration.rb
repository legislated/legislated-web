module Enumeration
  # definition
  def values(keys)
    keys.each { |key| const_set(key.tr(':', '_').upcase, key) }
  end

  # utilities
  def all
    constants.map { |name| const_get(name) }
  end

  def coerce!(value)
    all.find { |entry| entry == value } || (raise ValueNotFoundError value)
  end

  # errors
  class ValueNotFoundError < StandardError
    attr_reader :value

    def initialize(value)
      @value = value
      super("Could not find value: #{value}")
    end
  end
end

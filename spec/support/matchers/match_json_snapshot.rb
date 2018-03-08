module Matchers
  class MatchJsonSnapshot
    include RSpec::Matchers

    delegate(
      :actual,
      :expected,
      :diffable?,
      to: :matcher
    )

    def initialize(name)
      @name = name
      @snapshot = load_snapshot
    end

    def matches?(actual)
      @json = clean_json(actual)
      matcher.matches?(format_json(json))
    end

    def failure_message
      if snapshot.nil? && !json.nil?
        save_snapshot
        "snapshot #{name} did not exist, created"
      else
        matcher.failure_message
      end
    end

    private

    attr_accessor :name, :snapshot, :json

    def matcher
      @matcher ||= be_truthy.and(eq(snapshot))
    end

    def load_snapshot
      if File.exist?(snapshot_path)
        format_json(parse_json(File.read(snapshot_path)))
      end
    end

    def save_snapshot
      File.open(snapshot_path, 'w') do |file|
        file.write(json.to_json)
      end
    end

    def snapshot_path
      "spec/fixtures/snapshots/#{name}.json"
    end

    def clean_json(json)
      data = parse_json(json)
      deep_reject!(data, /^(id|[^io][^"]+_id|created_at|updated_at)$/)
      data
    end

    def parse_json(json)
      JSON.parse(json) if json.present?
    end

    def format_json(json)
      JSON.pretty_generate(json) if json.present?
    end

    def deep_reject!(value, pattern)
      case value
      when Array
        value.each do |item|
          deep_reject!(item, pattern)
        end
      when Hash
        value.reject! do |key, value|
          pattern.match?(key) || deep_reject!(value, pattern)
        end
      end

      false
    end

    module Helper
      def match_json_snapshot(name)
        MatchJsonSnapshot.new(name)
      end
    end
  end
end

RSpec.configuration.include(Matchers::MatchJsonSnapshot::Helper)

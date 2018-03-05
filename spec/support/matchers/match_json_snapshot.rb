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

    def matches?(json)
      @json = clean_json(json)
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
      @matcher ||= be_truthy.and(eq(format_json(snapshot)))
    end

    def load_snapshot
      File.read(snapshot_path) if File.exist?(snapshot_path)
    end

    def save_snapshot
      File.open(snapshot_path, 'w') { |file| file.write(json) }
    end

    def snapshot_path
      "spec/fixtures/snapshots/#{name}.json"
    end

    def clean_json(json)
      json&.gsub(/,?"(([^e][^"]+_)?id|created_at|updated_at)":"[^"]+",?/, '')
    end

    def format_json(json)
      JSON.pretty_generate(JSON.parse(json)) if json.present?
    end

    module Helper
      def match_json_snapshot(name)
        MatchJsonSnapshot.new(name)
      end
    end
  end
end

RSpec.configuration.include(Matchers::MatchJsonSnapshot::Helper)

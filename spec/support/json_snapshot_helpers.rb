module JsonSnapshotHelpers
  extend ActiveSupport::Concern

  JSON_NOISE_PATTERN = /,?"(([^"]+_)?id|created_at|updated_at)":"[^"]+",?/

  def to_json_snapshot(object)
    clean_json(object.to_json)
  end

  def load_snapshot(name)
    path = "spec/fixtures/snapshots/#{name}"

    if File.exist?(path)
      clean_json(File.read(path))
    else
      puts "✘ missing snapshot: #{path}"
    end
  end

  private

  def clean_json(json)
    JSON.parse(json.gsub(JSON_NOISE_PATTERN, ''))
  end
end

RSpec.configuration.include(JsonSnapshotHelpers, :json_snapshot)

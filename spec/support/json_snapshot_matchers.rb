RSpec::Matchers.define(:match_json_snapshot) do |name|
  match do |actual|
    json = clean_json(actual)
    snapshot = load_snapshot(name, json)
    expect(json).to eq(snapshot)
  end

  # helpers
  JSON_NOISE_PATTERN = /,?"(([^"]+_)?id|created_at|updated_at)":"[^"]+",?/

  def load_snapshot(name, json)
    path = snapshot_path(name)

    if File.exist?(path)
      File.read(path)
    elsif !json.nil?
      File.open(path, 'w') do |file|
        file.write(json)
      end
      puts "- snapshot #{name}: created"
    else
      puts "✘ snapshot #{name}: missing and actual was nil"
    end
  end

  def clean_json(json)
    json.gsub(JSON_NOISE_PATTERN, '')
  end

  def snapshot_path(name)
    "spec/fixtures/snapshots/#{name}.json"
  end
end

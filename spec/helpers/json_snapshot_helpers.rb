module JsonSnapshotHelpers
  module Example
    def load_snapshot(name)
      path = "spec/fixtures/snapshots/#{name}"

      if File.exist?(path)
        clean_json(File.read(path))
      else
        puts "✘ missing snapshot: #{path}"
      end
    end

    def to_json_snapshot(object)
      clean_json(object.to_json)
    end

    def clean_json(json)
      JSON.parse(json.gsub(/"(id|created_at|updated_at)":"[^"]+",?/, ''))
    end
  end
end

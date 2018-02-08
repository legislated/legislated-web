VCR.configure do |config|
  config.cassette_library_dir = 'spec/fixtures/cassettes'
  config.hook_into :webmock
  config.allow_http_connections_when_no_cassette = true
  config.filter_sensitive_data('<OPENSTATES_API_KEY>') { ENV['OPEN_STATES_KEY'] }
  config.configure_rspec_metadata!
end

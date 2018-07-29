VCR.configure do |c|
  c.hook_into :webmock
  c.cassette_library_dir = 'spec/fixtures/cassettes'
  c.filter_sensitive_data('<OPENSTATES_API_KEY>') { ENV['LEGISLATED_OPENSTATES_API_KEY'] }
  c.debug_logger = File.open('spec/vcr.log', 'w')
  c.ignore_localhost = true
  c.allow_http_connections_when_no_cassette = true
  c.configure_rspec_metadata!
end

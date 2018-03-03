Billy.configure do |c|
  c.proxy_port = 60015
  c.whitelist = %w[
    localhost
    127.0.0.1
    ilga.gov
    my.ilga.gov
  ]

  c.path_blacklist = %w[
    .jpg
    .png
    .gif
  ]

  c.persist_cache = true
  c.cache_path = 'spec/fixtures/billy/'
  c.certs_path = 'spec/fixtures/billy/certs/'
  c.cache_request_body_methods = %w[post patch put]
  c.non_successful_cache_disabled = true
  c.non_whitelisted_requests_disabled = true
end

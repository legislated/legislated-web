Billy.configure do |c|
  c.whitelist = [
    /(my\.)?ilga.gov/
  ]

  c.path_blacklist = [
    /\.(ico|png|gif)/
  ]

  c.url_transforms << ->(url) do
    uri = URI.parse(url)

    if uri.path == '/Hearing/_GetPostedHearingsByDateRange'
      uri.query = strip_params(uri.query, '_')
    end

    uri.to_s
  end

  c.cache = false
  c.persist_cache = true
  c.cache_whitelist = true
  c.cache_path = 'spec/fixtures/billy/'
  c.certs_path = 'spec/fixtures/billy/certs/'
  c.cache_request_body_methods = %w[post patch put]
  c.non_successful_cache_disabled = true
  c.non_whitelisted_requests_disabled = true

  # helpers
  def strip_params(query, *params)
    URI.encode_www_form(CGI.parse(query).without(*params))
  end
end

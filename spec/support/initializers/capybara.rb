require 'billy/capybara/rspec'

Capybara.register_driver(:poltergeist_billy) do |app|
  Capybara::Poltergeist::Driver.new(app,
    phantomjs_options: [
      '--ignore-ssl-errors=yes',
      "--proxy=#{Billy.proxy.host}:#{Billy.proxy.port}"
    ]
  )
end

Capybara.configure do |c|
  c.server_port = 60010
  c.default_driver = :poltergeist_billy
end

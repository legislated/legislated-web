require "capybara"
require "capybara/poltergeist"

# setup capybara with poltergeist (PhantomJS) as its rendering engine
Capybara.register_driver :poltergeist do |app|
  Capybara::Poltergeist::Driver.new(app, { js_errors: false })
end

Capybara.default_driver = :poltergeist

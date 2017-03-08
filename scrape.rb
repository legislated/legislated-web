# add env passwords into ~/.bash_profile

require 'capybara'
require 'capybara/dsl'

require 'capybara/poltergeist'

include Capybara::DSL
Capybara.default_driver = :poltergeist

Capybara.register_driver :poltergeist do |app|
  Capybara::Poltergeist::Driver.new(app, {js_errors: false})
end

Capybara.default_driver = :poltergeist

def take_screenshot(page, title='screenshot.png')
  page.save_screenshot(title)
end

# get into app
visit ""
sleep 7 # required
require 'pry'; binding.pry
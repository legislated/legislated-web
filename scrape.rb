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

# 1. Go to home
visit "http://my.ilga.gov/"
sleep 7 # required
require 'pry'; binding.pry

# 2. Go to House

# 3. Go to Committee Hearings

# 4. Build List of committees to scrape

# 5. For each committee, find potential witness link

# 6. Find witness link title, link, and if it exists
require "capybara"
require "capybara/poltergeist"
require "active_support/time"

module Scraper
  def self.initialize
    # set time zone for datetime parsing
    Time.zone = "Central Time (US & Canada)"

    # setup capybara with poltergeist (PhantomJS) as its rendering engine
    Capybara.register_driver :poltergeist do |app|
      Capybara::Poltergeist::Driver.new(app, { js_errors: false })
    end

    Capybara.default_driver = :poltergeist
  end
end

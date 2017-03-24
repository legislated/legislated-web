require_relative 'boot'

require "rails"
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
require "action_cable/engine"
require "rails/test_unit/railtie"

# we only need this for letter opener (right now)
require "sprockets/railtie" if Rails.env.development? || Rails.env.test?

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module WitnessSlips
  class Application < Rails::Application
    config.api_only = true
    config.time_zone = "Central Time (US & Canada)"
    config.autoload_paths << "#{Rails.root}/app/jobs/scraper"
  end
end

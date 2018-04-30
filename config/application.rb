require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Legislated
  class Application < Rails::Application
    config.time_zone = 'Central Time (US & Canada)'
    config.autoload_paths << Rails.root.join('app', '**', 'concerns')
    config.active_record.schema_format = :sql

    if ENV['ADMIN_CREDENTIALS'].blank?
      raise 'ADMIN_CREDENTIALS environment variable required to run the server. Maybe you forgot to copy the .env.sample to .env?'
    end
  end
end

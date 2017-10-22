# This file is copied to spec/ when you run "rails generate rspec:install"
ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
# Prevent database truncation if the environment is production
abort('The Rails environment is running in production mode!') if Rails.env.production?

require 'spec_helper'
require 'rspec/rails'
require 'helpers/factory_helpers'

ActiveRecord::Migration.maintain_test_schema!

# configure rspec
RSpec.configure do |config|
  config.include FactoryGirl::Syntax::Methods

  config.fixture_path = "#{::Rails.root}/spec/fixtures"
  config.use_transactional_fixtures = true
  config.infer_spec_type_from_file_location!
  config.filter_rails_from_backtrace!

  # database cleaner
  config.before(:suite) do
    DatabaseCleaner.strategy = :transaction
    DatabaseCleaner.clean_with(:truncation)
    require 'spec_seeds'
  end

  config.around(:each) do |example|
    DatabaseCleaner.cleaning do
      example.run
    end
  end

  # vcr
  VCR.configure do |c|
    c.cassette_library_dir = 'spec/fixtures/cassettes'
    c.hook_into :webmock
    c.allow_http_connections_when_no_cassette = true
    c.filter_sensitive_data('<OPENSTATES_API_KEY>') { ENV['OPEN_STATES_KEY'] }
    c.configure_rspec_metadata!
  end
end

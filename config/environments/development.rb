Rails.application.configure do
  require 'pry'

  # rails config
  config.logger = Logger.new(STDOUT)
  config.cache_classes = false
  config.eager_load = false
  config.consider_all_requests_local = true

  if Rails.root.join('tmp', 'caching-dev.txt').exist?
    config.action_controller.perform_caching = true
    config.cache_store = :memory_store
    config.public_file_server.headers = { 'Cache-Control' => 'public, max-age=172800' }
  else
    config.action_controller.perform_caching = false
    config.cache_store = :null_store
  end

  config.active_record.migration_error = :page_load
  config.action_mailer.delivery_method = :letter_opener
  config.action_mailer.perform_caching = false
  config.active_support.deprecation = :log

  # the evented file watcher does not work w/ docker
  config.file_watcher = ActiveSupport::FileUpdateChecker

  # profiling
  Bullet.tap do |b|
    b.enable = true
    b.console = true
  end
end

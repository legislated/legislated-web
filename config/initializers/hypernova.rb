if Rails.env.development?
  require 'hypernova/plugins/development_mode_plugin'
  Hypernova.add_plugin!(DevelopmentModePlugin.new)
end

Hypernova.configure do |config|
  config.host = "localhost"
  config.port = 3030
end

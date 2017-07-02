module Worker
  extend ActiveSupport::Concern

  included do
    include Sidekiq::Worker
  end

  # logging / errors
  class Error < StandardError; end

  def info(message)
    Rails.logger.info(message)
  end

  def debug(message)
    Rails.logger.debug(message)
  end
end

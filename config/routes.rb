require "sidekiq/web"

Rails.application.routes.draw do
  root to: 'api#index'
  mount Sidekiq::Web => "/sidekiq" unless Rails.env.production?
end

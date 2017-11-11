require 'sidekiq/web'

Rails.application.routes.draw do
  root to: 'client#index'
  post '/api/graphql', to: 'api#execute'

  if Rails.env.development?
    mount Sidekiq::Web => '/sidekiq'
    mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: '/graphql'
    mount LetterOpenerWeb::Engine, at: '/letter_opener'
  end

  # All other html requests should go to the js app
  get '/(*any)', to: 'client#index', constraints: { format: 'html' }
end

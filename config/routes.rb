Rails.application.routes.draw do
  root to: 'client#index'
  post '/api/graphql', to: 'api#execute'

  # All other html requests should go to the js app
  get '/(*any)', to: 'client#index', constraints: { format: 'html' }

  if Rails.env.development?
    require 'sidekiq/web'
    mount Sidekiq::Web => '/sidekiq'
    mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: '/graphql'
    mount LetterOpenerWeb::Engine, at: '/letter_opener'
  end
end

Rails.application.routes.draw do
  post '/api/graphql', to: 'api#execute'

  if Rails.env.development?
    require 'sidekiq/web'
    mount Sidekiq::Web => '/sidekiq'
    mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: '/api/graphql'
    mount LetterOpenerWeb::Engine, at: '/letter_opener'
  end

  # any html requests should render the client
  get '/(*any)', to: 'client#index', constraints: { format: 'html' }
end

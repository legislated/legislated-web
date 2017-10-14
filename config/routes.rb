require 'sidekiq/web'

Rails.application.routes.draw do
  root to: 'client#index'
  post '/api/graphql', to: 'api#execute'

  if Rails.env.development?
    mount Sidekiq::Web => '/sidekiq'
    mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: '/graphql'
    mount LetterOpenerWeb::Engine, at: '/letter_opener'
  end
end

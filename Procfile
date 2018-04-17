web: bundle exec puma -C config/puma.rb
worker: bundle exec sidekiq -c 1 -q default -q mailers
renderer: yarn hypernova:prod

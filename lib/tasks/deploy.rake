namespace :deploy do
  desc 'Deploys a staging build to Heroku and runs any migrations'
  task staging: :environment do
    puts '○ deploy:staging - deploying to heroku...'
    sh 'git push heroku master'
    sh 'heroku run rails db:migrate'
    sh 'heroku restart'
    puts '✔ deploy:staging - complete!'
  end
end

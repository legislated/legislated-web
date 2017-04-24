namespace :deploy do
  def branch_name
    branch = `git branch | grep '*'`
    branch[1..-1].strip
  end

  desc 'Deploys a staging build to Heroku and runs any migrations'
  task staging: :environment do
    raise "✘ deploy:staging - can only push to staging from 'master'" if branch_name != 'master'
    puts '○ deploy:staging - deploying to heroku...'
    sh 'git push staging master'
    sh 'heroku run rails db:migrate'
    sh 'heroku restart'
    puts '✔ deploy:staging - complete!'
  end

  desc 'Deploys a prod build to Heroku and runs any migrations'
  task :prod do
    raise "✘ deploy:prod - can only push to prod from 'production'" if branch_name != 'production'
    puts '○ deploy:prod - deploying to heroku...'
    sh 'git push production master'
    sh 'heroku run rails db:migrate'
    sh 'heroku restart'
    puts '✔ deploy:prod - complete'
  end
end

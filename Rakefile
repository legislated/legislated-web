# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.
require_relative 'config/application'

Rails.application.load_tasks

if Rails.env.development? || Rails.env.test?
  # add rubocop task
  require 'rubocop/rake_task'
  RuboCop::RakeTask.new

  # set the default task
  task(:default).clear.enhance(%w[graphql:schema api:verify client:verify])
end

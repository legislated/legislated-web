namespace :client do
  task :check do
    sh "yarn check:quiet"
  end
end

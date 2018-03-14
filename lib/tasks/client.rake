namespace :client do
  task :verify do
    sh "yarn verify:quiet"
  end
end

namespace :api do
  task :check do
    %w[rubocop spec].each { |name| Rake::Task[name].invoke }
  end
end

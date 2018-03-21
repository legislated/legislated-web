namespace :api do
  task :verify do
    %w[rubocop spec].each { |name| Rake::Task[name].invoke }
  end
end

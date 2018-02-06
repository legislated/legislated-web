namespace :api do
  task :validate do
    %w[rubocop spec].each { |name| Rake::Task[name].invoke }
  end
end

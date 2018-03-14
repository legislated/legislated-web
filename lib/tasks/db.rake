namespace :db do
  def set_environment(environment)
    sh "RAILS_ENV=#{environment} rails db:environment:set"
  end

  def reset(environment)
    set_environment(environment)
    sh "rails db:reset"
  end

  def migrate(environment)
    set_environment(environment)
    sh "rails db:migrate"
  end

  namespace :dev do
    desc "Reset dev database"
    task :reset do
      reset(:development)
    end

    desc "Migrate dev database"
    task :migrate do
      migrate(:development)
    end
  end

  namespace :test do
    desc "Migrate test database"
    task :migrate do
      migrate(:test)
    end
  end
end

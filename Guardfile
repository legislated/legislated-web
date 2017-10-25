guard :rspec, cmd: 'bundle exec rspec' do
  watch('spec/spec_helper.rb')                        { 'spec' }
  watch('spec/rails_helper.rb')                       { 'spec' }
  watch('config/routes.rb')                           { 'spec/controllers' }
  watch('app/controllers/application_controller.rb')  { 'spec/controllers' }
  watch(%r{^spec/.+_spec\.rb$})
  watch(%r{^app/(.+)\.rb$}) { |m| "spec/#{m[1]}_spec.rb" }
end

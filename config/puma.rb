# puma can serve each request in a thread from an internal thread pool.
# the `threads` method setting takes two numbers a minimum and maximum.
# any libraries that use thread pools should be configured to match
# the maximum value specified for puma. default is set to 5 threads for minimum
# and maximum, this matches the default thread size of active record.
threads_count = ENV.fetch('RAILS_MAX_THREADS') { 5 }.to_i
threads(threads_count, threads_count)

# bind the server to a specific uri
port = ENV.fetch('PORT') { 3000 }
bind("tcp://0.0.0.0:#{port}")

# use the current rails environment
environment(ENV.fetch('RAILS_ENV') { 'development' })

# allow puma to be restarted by `rails restart` command.
plugin :tmp_restart

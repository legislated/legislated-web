# Witness Slips

## Setup

Install any necessary global dependencies:

- ruby (2.3.0) -> [installation](https://github.com/rbenv/rbenv)
- bundler -> `gem install bundler`
- foreman -> `gem install foreman`
- postgresql
- redis
- phantomjs

Then install local dependencies with bundler:
```sh
bundle
```

## Development

Start the server with:

```
# make sure postgres and redis are started
foreman start
```

The first time you run the application, you'll also need to setup the database. If you make any database changes you can also run this again:

```
bundle exec rails db:reset
```

You can use [pry](http://pryrepl.org/) to debug by littering the source with breakpoints:

```ruby
require "pry"; binding.pry
```

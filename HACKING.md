# Hacking

## Setup

Install any necessary global dependencies. Some packages may need to be installed using the package manager(s) appropriate for your system:

- readline -> **must** be installed before Ruby
- ruby (2.3.0) -> [installation](https://github.com/rbenv/rbenv)
- bundler -> `gem install bundler`
- foreman -> `gem install foreman`
- postgresql
- redis
- phantomjs

Then install local dependencies with bundler:
```sh
$ bundle
```

## Development

Make sure Postgres and Redis are started, and then start the server with:

```sh
$ foreman start
```

The first time you run the application, you'll also need to setup the database. If you make any database changes you can also run this again:

```sh
$ rails db:reset
```

You can use the rails console to explore the database through using [ActiveRecord](http://guides.rubyonrails.org/active_record_querying.html):

```sh
$ rails console  
```

You can use [pry](http://pryrepl.org/) to debug by littering the source with breakpoints:

```ruby
binding.pry # when running specs, we require pry up front
require "pry"; binding.pry # otherwise, you'll want to require it
```

## Testing

Tests are written using [rspec](http://www.relishapp.com/rspec/rspec-expectations/v/3-5/docs), and live under the `spec` directory. Please add specs for any new features.

Run all the specs using the rake task:

```sh
$ rails spec
```

Or run individual spec files using the `rspec` directly:

```sh
$ rspec spec/jobs/import_hearings_job_spec.rb
```

Many editors also have a rails-rspec plugin that will let you run specs from your editor, run just the example under your cursor, etc. If you're into that kind of thing.

## Hosting / Deployment

The application is hosted on [Heroku](https://dashboard.heroku.com/apps/witness-slips). You can interface with the remote application, its database, etc. by installing the Heroku [toolbelt](https://devcenter.heroku.com/articles/heroku-cli#download-and-install). In order to access our app, you'll need to ask somebody to make you a collaborator.

Once that's set up, you can connect a Rails console to explore the Heroku app's data:

```sh
$ heroku login # enter your credentials
$ heroku console -a witness-slips
```

To deploy to Heroku, push to the git remote `heroku` using our rake task:

```sh
$ rails deploy:staging
```

## Architecture

If you've never worked with some of the technologies on this project, it may be worth reading up on them. Here's a rough breakdown the application architecture and major technologies:

#### [Web Server (Rails)](http://guides.rubyonrails.org/)

Rails is a web-application framework, and we use it so serve our API, interact with the database, etc. If you've never worked with it, their documentation is a good place to start.

#### [API (GraphQL)](wiki/api.md)

Our API is built using GraphQL, a query language that is an alternative to REST. It offers a lot of flexibility to clients by allowing them to specify the exact data fields of the response. It's also simple to implement on Rails side. See the link for more info.

#### [Data Import (Sidekiq, Capybara)](wiki/import.md)

We use Sidekiq to scrape data nightly from Illinois government websites and throw it in our database. Sidekiq provides a queueing system, built on top of Redis, for running the import jobs in the background.

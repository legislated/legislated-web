# Hacking

## Setup

Install any necessary global dependencies. Some packages may need to be installed using the package manager(s) appropriate for your system:

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

Start the server with:

```sh
$ foreman start # make sure postgres and redis are started
```

The first time you run the application, you'll also need to setup the database. If you make any database changes you can also run this again:

```sh
$ bundle exec rails db:reset
```

You can use the rails console to explore the database through using [ActiveRecord](http://guides.rubyonrails.org/active_record_querying.html):

```sh
$ bundle exec rails console  
```

You can use [pry](http://pryrepl.org/) to debug by littering the source with breakpoints:

```ruby
require "pry"; binding.pry
```

## Hosting / Deployment

The application is hosted on [Heroku](https://dashboard.heroku.com/apps/witness-slips). You can interface with the remote application, its database, etc. by installing the Heroku [toolbelt](https://devcenter.heroku.com/articles/heroku-cli#download-and-install). In order to access our application, you'll need to ask somebody to be made a collaborator.

Once that's set up, you can connect a Rails console to the application to explore its data:

```sh
$ heroku login # enter your credentials
$ heroku console -a witness-slips
```

To deploying to Heroku, you can push to the remote `heroku` git source:

```sh
$ git push heroku master
```

## Technology

See the following READMEs for detailed information about this application's involved technologies:

- [GraphQL](wiki/graphql.md)
- [Sidekiq](wiki/sidekiq.md)

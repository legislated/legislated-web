# Hacking

## Setup - Ubuntu
- Install the dev version of **Ruby** with: 
```sh
$ sudo apt-get install ruby-dev
```
- Install **rbenv**: [instructions here](https://github.com/rbenv/rbenv) (if you have RVM, you'll have to uninstall it first)
- Install the **ruby-build** rbenv plugin by running:
```sh
$ git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
```
- Install **Ruby 2.3.0** with rbenv by running:
```sh
$ rbenv install 2.3.0
```
Install the following dependencies:
- **Bundler**: `sudo gem install bundler`
- **Foreman**: `sudo gem install foreman`
- **PostgreSQL**: `sudo gem install postgresql`
- **Redis**: `sudo gem install redis`
- **PhantomJS**: `sudo gem install phantomjs`


- Then run **bundler**:
```sh
$ bundler
```
- If you already have Redis installed on your machine, you can run build the database with: 
```sh
$ rails db:reset
```
- Then start the application with
```sh
$ foreman start
```

At this point and you should be ready to start development by accessing [localhost:5000](http://localhost:5000) in your browser. If you don't already have **Redis** installed, continue below:
### Redis Setup
- Install the **redis-server** package by running: 
```sh
$ sudo apt-get install redis-server
```
- Start **redis** with:
```sh
$ sudo systemctl start redis
```
- Build the database with:
```sh
$ rails db:reset
```
You should now be able to run `foreman start` inside the project directory and successfully access [localhost:5000](http://localhost:5000) in your browser.

### (Optional) Redis Privileges Setup
First time Redis users may encounter the following error: *Fatal: role "username" does not exist, couldn't create database*. This means that the *username* role needs to be created.

- Open PostgreSQL by running:
```sh
$ sudo -u postgres -i
```
- Access the PSQL terminal by running:
```sh
$ psql
```
- Run the query (swapping out *username* with the relevant one):
```sh
$ ALTER USER username WITH SUPERUSER;
```
Run `\q` and then `exit` to quit out of the psql terminal and PostgreSQL.

You should now be able to run `foreman start` inside the project directory and successfully access [localhost:5000](http://localhost:5000) in your browser.

## Setup - Mac

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

The application is hosted on [Heroku](https://dashboard.heroku.com/apps/legislated). You can interface with the remote application, its database, etc. by installing the Heroku [toolbelt](https://devcenter.heroku.com/articles/heroku-cli#download-and-install). In order to access our app, you'll need to ask somebody to make you a collaborator.

Once that's set up, you can connect a Rails console to explore the Heroku app's data:

```sh
$ heroku login # enter your credentials
$ heroku console -a legislated
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

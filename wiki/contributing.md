# Setup

## Table of Contents

- [Setup](#setup-)
- [Development](#development-)
- [Testing](#testing-)
- [Hosting / Deployment](#hosting--deployment-)
- [Architecture](#architecture-)

## Setup [↑](#table-of-contents)

### Install Docker

We run the app locally using docker. Please see the-system specific guide for getting
it up and running on your machine:

- Install Docker on [Mac](setup/macos.md)
- Install Docker on [Ubuntu](setup/ubuntu.md)

### Bootstrap the app

Once you have [Docker](#install-docker) running, you can perform these additional setup steps.

Since we git-ignore `.env`, first copy the sample development `.env` file. Some env vars in the sample may be placeholders, so ask a team member if you need them:

```sh
$ cp config/dotenvs/sample.env .env
```

Build and run the app using `docker-compose`:

```sh
$ docker-compose up --build
```

Create the development database and seed it with data:

```sh
$ docker-compose exec web rails db:reset
```

At this point, you *should* be able to hit the app at http://localhost:3000. Congrats!

## Development [↑](#table-of-contents)

See [workflow](wiki/dev/workflow.md) for workflow tips when working with Rails, JavaScript, and Docker.

See [commands](wiki/dev/commands.md) for a more complete list of development commands.

However, to get started, run the server with:

```sh
$ docker-compose up
```

You can stop the server (gently) using `ctrl-c` once.

You can use the rails console to explore the database through using [ActiveRecord](http://guides.rubyonrails.org/active_record_querying.html) by running:

```sh
$ docker-compose exec web rails console
```

Run the linter & tests using `rake`. Please do this frequently! (especially before pushing)

```sh
$ docker-compose exec web rake
```

## Testing [↑](#table-of-contents)

We have relatively complete test suites for both the backend and client. Please be sure to add specs for any new features.

### Rails

Rails tests are written using [rspec](http://www.relishapp.com/rspec/rspec-expectations/v/3-5/docs), and live under the `spec` directory.

Run all the specs using the rake task:

```sh
$ rails spec
```

Or run individual spec files using the `rspec` directly:

```sh
$ rspec spec/jobs/import_hearings_job_spec.rb
```

Many editors also have a rails-rspec plugin that will let you run specs from your editor, run just the example under your cursor, etc. If you're into that kind of thing.

### Client

Client tests are written using [Jest](https://facebook.github.io/jest/docs/api.html), and live in `__tests__` directories adjacent to the files they test. Please add specs for any new features.

Run all the tests using the yarn script:

```sh
$ yarn test
$ yarn test:watch # re-runs as files change
```

Running individual specs is easiest using Jest's path filter (hit `p`) in watch mode.

## Hosting / Deployment [↑](#table-of-contents)

The application is hosted on [Heroku](https://dashboard.heroku.com/apps/legislated). When a commit is pushed to master, it is automatically deployed to our staging server. When a commit is pushed to production, it is automatically deployed to our production server.

You can interface with the remote apps, their databases, etc. by installing the Heroku [toolbelt](https://devcenter.heroku.com/articles/heroku-cli#download-and-install). However, in order to access our app, you'll need to ask somebody to make you a collaborator.

Once that's set up, you can connect a Rails console to explore the Heroku app's data:

```sh
$ heroku login # enter your credentials
$ heroku console -a legislated-staging
```

## Architecture [↑](#table-of-contents)

If you've never worked with some of the technologies on this project, it may be worth reading up on them. Here's a rough breakdown the application architecture and major technologies:

### Rails

#### [Web Server (Rails)](http://guides.rubyonrails.org/)

Rails is a web-application framework, and we use it to serve our API, interact with the database, etc. If you've never worked with it, their documentation is a good place to start.

#### [API (GraphQL)](wiki/api.md)

Our API is built using GraphQL, a query language that is an alternative to REST. It offers a lot of flexibility to clients by allowing them to specify the exact data fields of the response. It's also simple to implement on Rails side. See the link for more info.

#### [Data Import (Sidekiq, Capybara)](wiki/import.md)

We use Sidekiq to scrape data nightly from Illinois government websites and throw it in our database. Sidekiq provides a queueing system, built on top of Redis, for running the import jobs in the background.

### Client

#### [React](https://facebook.github.io/react/docs/hello-world.html)

If you don't know React, it's recommended that you read their docs or pair-program with someone who already knows it. The rest of the client is going to build on top of it.

#### [Relay](https://facebook.github.io/relay/docs/getting-started.html)

Relay is a library that allows React components to declarative specify the data they depend on from a remote GraphQL API. It provides automatic data synchronization and caching.

#### [Flow](https://flow.org/en/docs/getting-started/)

Flow is a relatively unobtrusive static type checker for JavaScript. The reasons for using a type-checker are beyond the scope of this document. If you're familiar with static typing, the linked intro should be enough to get you going.

If you're not, the easiest way to get started is probably to pair program with someone who is. However, don't worry about it too much; it's more important to get started hacking. Write your code without types and we can help retrofit it into your PR afterwards.

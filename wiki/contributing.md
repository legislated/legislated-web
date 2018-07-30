# Setup

## Table of Contents

- [Setup](#setup-)
- [Development](#development-)
- [Testing](#testing-)
- [Additional Resources](#additional-resources-)

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

### Getting Started

To get started, run the server:

```sh
# you can stop the server (gently) using `ctrl-c`
$ docker-compose up
```

Once the server is running, you can use the `rails console` to explore the database through using [ActiveRecord](http://guides.rubyonrails.org/active_record_querying.html) by running:

```sh
$ docker-compose exec web rails console
```

You can run the linter & tests using `rake`. Please do this frequently! (especially before pushing):

```sh
$ docker-compose exec web rake
```

## Testing [↑](#table-of-contents)

We have relatively complete test suites for both the backend and client. Please be sure to add specs for any new features.

### Rails

Rails tests are written using [rspec](http://www.relishapp.com/rspec/rspec-expectations/v/3-5/docs), and live in the `spec` directory. Please add specs for any new features.

You can run all the specs using:

```sh
$ docker-compose exec web rspec
```

If you want to run individual specs, `rspec` provides many filtering options:

```sh
$ docker-compose exec web rspec spec/jobs/import_ilga_hearings_job_spec.rb
```

### Client

Client tests are written using [Jest](https://facebook.github.io/jest/docs/api.html), and live in `__tests__` directories adjacent to the files under test. Please add specs for any new features.

Run all the tests using the yarn script:

```sh
$ docker-compose exec yarn test
$ docker-compose exec yarn test:watch # re-runs as files change
```

Running individual specs is easiest running jest in watch mode and hitting `p` to filter by filepath.

## Additional Resources [↑](#table-of-contents)

- [workflow](dev/workflow.md): workflow tips for Rails, JavaScript, and Docker.
- [commands](dev/commands.md): a more complete list of development commands.
- [architecture](arch/index.md): a high-level description of our technologies & architecture

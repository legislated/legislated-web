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

Build and run the app:

```sh
$ make start
```

Create the development database and seed it with data:

```sh
$ make db/reset
```

At this point, you *should* be able to hit the app at http://localhost:3000. Congrats!

## Development [↑](#table-of-contents)

### Getting Started

We use [make](https://www.gnu.org/software/make/manual/make.html) as our task runner (it should already be installed on your system!). You can see a list of available tasks by running `make` or `make help`. All subsequent commands will go through make.

To get started, run the server:

```sh
# you can stop the server (gently) using `ctrl-c`
$ make start
```

Once the server is running, you can use the rails console to explore the database through using [ActiveRecord](http://guides.rubyonrails.org/active_record_querying.html) by running:

```sh
$ make rails/console
```

You can also run the linter & tests. Please do this frequently (especially before pushing!):

```sh
$ make test
$ make lint
```

## Testing [↑](#table-of-contents)

We have relatively complete test suites for both the backend and client. Please be sure to add specs for any new features.

### Rails

Rails tests are written using [rspec](http://www.relishapp.com/rspec/rspec-expectations/v/3-5/docs), and live in the `spec` directory. Please add specs for any new features.

You can run all the specs using:

```sh
$ make test/rails
```

If you want to run individual specs, you can filter to a specific path:

```sh
$ make test/rails ONLY=spec/models/bill_spec.rb
```

### Client

Client tests are written using [jest](https://facebook.github.io/jest/docs/api.html), and live in `__tests__` directories adjacent to the files under test. Please add specs for any new features.

Run all the tests using the yarn script:

```sh
$ make test/js
$ make test/js/watch # re-runs as files change
```

Running individual specs is easiest running jest in watch mode and hitting `p` to filter by filepath.

## Additional Resources [↑](#table-of-contents)

- [workflow](dev/workflow.md): workflow tips for Rails, JavaScript, and Docker.
- [architecture](dev/arch/index.md): a high-level description of our technologies & architecture

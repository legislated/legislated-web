# Setup - OSX

## Homebrew

If you don't have [homebrew](https://brew.sh/), you'll need it. Install that first:

```sh
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

You also need brew services to install postgres/redis:

```sh
$ brew tap homebrew/services
```

## Ruby

If you already have a tool for installing rubies, use that to install version **2.3.0** and skip this section. If you have a dysfunctional `rvm`/`rbenv` setup, uninstall it first. Once you have no existing tool for installing rubies...

Install [rbenv](https://github.com/rbenv/rbenv):

```sh
$ brew update
$ brew install rbenv
$ rbenv init
```

If you don't have readline installed, install that now:

```sh
$ brew install readline
```

Install Ruby 2.3.0:

```sh
$ rbenv install 2.3.0
```

## Postgres

Install and start postgresql:

```sh
$ brew services install postgresql
$ brew services start postgresql
```

Create the database user for the Rails app:

```sh
$ createuser -s postgres
```

## Redis

Install and start Redis

```sh
$ brew services install redis
$ brew services start redis
```

## PhantomJS

Install PhantomJS:

```sh
$ brew install phantomjs
```

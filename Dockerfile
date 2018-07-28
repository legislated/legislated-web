# base image
FROM ruby:2.3.0

# set environment variables
ENV \
  APP_HOME=/legislated \
  PG_VERISON=9.6 \
  PHANTOM_JS_VERSION=phantomjs-2.1.1-linux-x86_64

# install core packages
# - build-essential: build tools for gems with native extensions
# - libpq-dev:       postgres c interfaces
RUN \
  apt-get update -qq && \
  apt-get install -y \
    build-essential \
    libpq-dev

# install postgres (add repo)
# - postgresql-client-9.6: provides pgdump
RUN \
  echo \
    "deb http://apt.postgresql.org/pub/repos/apt/ jessie-pgdg main" \
    >> /etc/apt/sources.list && \
  curl \
    https://www.postgresql.org/media/keys/ACCC4CF8.asc \
    | apt-key add - && \
  apt-get update -qq && \
  apt-get install -y \
    postgresql-client-$PG_VERSION

# install node (add repo)
# - nodejs: node
# - yarn:   package manager
RUN \
  curl -sS \
    https://dl.yarnpkg.com/debian/pubkey.gpg \
    | apt-key add - && \
  curl -sL \
    https://deb.nodesource.com/setup_8.x \
    | bash && \
  echo "deb https://dl.yarnpkg.com/debian/ stable main" \
    >> /etc/apt/sources.list && \
  apt-get update -qq && \
  apt-get install -y \
    nodejs yarn

# install phantomjs
RUN \
  apt-get install -y --no-install-recommends \
    ca-certificates \
    bzip2 \
    libfontconfig && \
  curl -L \
    https://bitbucket.org/ariya/phantomjs/downloads/$PHANTOM_JS_VERSION.tar.bz2 \
    | tar -xj -C /tmp && \
  mv \
    /tmp/$PHANTOM_JS_VERSION/bin/phantomjs \
    /usr/local/bin

# install nano for developement
RUN \
  apt-get install -y \
    nano

# trim image size, remove package dbs, logs, etc
RUN \
  apt-get clean autoclean && \
  apt-get autoremove -y && \
  rm -rf \
    /var/lib/apt \
    /var/lib/dpkg \
    /var/lib/cache \
    /var/lib/log

# setup app's working directory
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

# install gems
ADD Gemfile* $APP_HOME/
RUN bundle install

# add the app to the image
ADD . $APP_HOME

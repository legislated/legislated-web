# base image
FROM ruby:2.3.0

# set environment variables
ENV \
  APP_HOME=/legislated \
  PG_VERSION=9.6 \
  PHANTOM_JS_VERSION=phantomjs-2.1.1-linux-x86_64

RUN \
  # logging which commands actually runs
  set -x && \
  # install core packages
  # - build-essential: build tools for gems with native extensions
  # - libpq-dev:       postgres c interfaces
  apt-get update -qq && \
  apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev && \
  # install postgres
  # - postgresql-client-9.6: provides pgdump
  echo \
    "deb http://apt.postgresql.org/pub/repos/apt/ jessie-pgdg main" \
    >> /etc/apt/sources.list && \
  curl \
    https://www.postgresql.org/media/keys/ACCC4CF8.asc \
    | apt-key add - && \
  apt-get update -qq && \
  apt-get install -y --no-install-recommends \
    postgresql-client-$PG_VERSION && \
  # install node
  # - nodejs: node
  # - yarn:   package manager
  curl -sS \
    https://dl.yarnpkg.com/debian/pubkey.gpg \
    | apt-key add - && \
  curl -sL \
    https://deb.nodesource.com/setup_8.x \
    | bash && \
  echo "deb https://dl.yarnpkg.com/debian/ stable main" \
    >> /etc/apt/sources.list && \
  apt-get update -qq && \
  apt-get install -y --no-install-recommends \
    nodejs \
    yarn && \
  # install phantomjs
  # - phantomjs: headless browser
  # - ...rest:   phantomjs runtime deps
  apt-get install -y --no-install-recommends \
    ca-certificates \
    bzip2 \
    libfontconfig && \
  curl -L \
    https://bitbucket.org/ariya/phantomjs/downloads/$PHANTOM_JS_VERSION.tar.bz2 \
    | tar -xj -C /tmp && \
  mv \
    /tmp/$PHANTOM_JS_VERSION/bin/phantomjs \
    /usr/local/bin && \
  # clean up unnecessary files to trim image size
  # - /var/lib/apt:  package manager data
  # - /var/lib/dpkg: packager installer data
  # - ...rest:       self-explanatory
  apt-get clean autoclean && \
  apt-get autoremove -y && \
  rm -rf \
    /var/lib/apt \
    /var/lib/dpkg \
    /var/lib/cache \
    /var/lib/log && \
  # stop logging executed commands
  set +x

# setup app's working directory
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

# install gems
ADD Gemfile* $APP_HOME/
RUN bundle install

# add the app to the image
ADD . $APP_HOME

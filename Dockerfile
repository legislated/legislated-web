# base image
FROM ruby:2.3.0

# set environment variables
ENV APP_HOME /legislated

RUN \
  # add apt repo for alternate postgres versions
  echo "deb http://apt.postgresql.org/pub/repos/apt/ jessie-pgdg main" \
    >> /etc/apt/sources.list && \
  curl https://www.postgresql.org/media/keys/ACCC4CF8.asc \
    | apt-key add - && \
  # install packages
  # - build-essential: build tools for gems with native extensions
  # - libpq-dev:       postgres c interfaces
  # - nodejs:          for asset compilation
  apt-get update -qq && \
  apt-get install -y \
    build-essential \
    libpq-dev postgresql-client-9.6 \
    nodejs
  # # trim image size, remove package dbs, logs, etc
  # apt-get clean autoclean && \
  # apt-get autoremove -y && \
  # rm -rf \
  #   /var/lib/apt \
  #   /var/lib/dpkg \
  #   /var/lib/cache \
  #   /var/lib/log

# setup app's working directory
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

# install gems
ADD Gemfile* $APP_HOME/
RUN bundle install

# add the app to the image
ADD . $APP_HOME

# run the rails app
CMD ./bin/rails s -p ${PORT} -b '0.0.0.0'

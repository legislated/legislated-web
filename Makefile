.DEFAULT_GOAL := help

# -- context --
# prefix for running commands on on-demand web container
run = docker-compose run
# prefix for running commands on running web container
exec = docker-compose exec
# location for js binaries
jsbin = ./node_modules/.bin

# -- run --
## starts the docker app
start: .env
	@docker-compose up
## starts the docker app, rebuilds stale images
start/rebuild:
	@docker-compose up --build

.PHONY: start start/rebuild

# -- db --
## resets the dev database
db/reset:
	$(run) web rails db:reset

.PHONY: db/reset

# -- test --
## runs all the tests
test: test-rails test-js
## runs the rails tests
test/rails: .is-up
	$(exec) web rspec
## runs the javascript tests
test/js: .is-up
	$(exec) web $(jsbin)/jest
## runs the javascript tests and updates all snapshots
test/js/snapshot: .is-up
	$(exec) web $(jsbin)/jest -u
## runs the javascript tests in watch mode
test/js/watch: .is-up
	$(exec) web $(jsbin)/jest --watch

.PHONY: test test/rails test/js test/js/watch

# -- lint --
jslint = $(jsbin)/standard './app/javascript/**/*.js'

## lints all the code
lint: lint/rails lint/js
## lints all the code and fixes errors
lint/fix: lint/rails/fix lint/js/fix

## lints the rails code
lint/rails:
	$(exec) web rubocop
## lints the rails code and fixes errors
lint/rails/fix:
	$(exec) web rubocop -a

## lints the js code
lint/js:
	$(exec) -T web $(jslint) | $(jsbin)/snazzy
## lints the js code and fixes any errors it can
lint/js/fix:
	$(exec) -T web $(jslint) --fix | $(jsbin)/snazzy

.PHONY: lint lint/fix lint/rails lint/rails/fix lint/js lint/js/fix

# -- js --
relay = $(jsbin)/relay-compiler --src ./app/javascript/src --schema schema.json

## type-checks the js code
js/flow:
	$(exec) web $(jsbin)/flow
## type-checks the js code; restarting the server
js/flow/restart:
	$(exec) web $(jsbin)/flow stop && $(jsbin)/flow
## type-checks the js code with minimal logging
js/flow/quiet:
	$(exec) web $(jsbin)/flow --quiet

## compiles relay queries
js/relay:
	$(exec) web $(relay)
## compiles relay queries whenever they change
js/relay/watch:
	$(exec) web $(relay)/watch

.PHONY = js/flow js/flow/restart js/relay js/relay/watch

# -- verify --
# verifies the code is correct
verifiy: verify/rails verify/js
# verifies the rails code is correct
verify/rails: lint/rails test/rails
# verifies the rails code is correct
verify/js: lint/js test/js js/flow

# -- private --
.env:
	@echo "missing .env, copying over the sample"
	@cp config/dotenvs/sample.env .env

.is-up:
ifneq ($(strip $(docker ps | grep web_web)),)
	$(error the app is not running; run 'make start')
endif

.PHONY = .is-up

# -- help --
help:
	@awk "$$HELP" $(MAKEFILE_LIST)

define HELP
BEGIN {
	print "\033[;1musage:\033[0m";
	print "  make <command>\n";
	print "\033[;1mcommands:\033[0m";
}
/^## (.*)$$/ {
	$$1=""; docs=$$0;
	getline;
	sub(/:/, "", $$1);
	printf "  \033[36m%-15s\033[0m %s\n", $$1, docs;
}
endef
export HELP

.PHONY = help

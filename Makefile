.DEFAULT_GOAL := help

# -- context --
# location for js binaries
jsbin = ./node_modules/.bin

# -- run --
## starts the docker app
start: .env
	@docker-compose up
## starts the docker app, rebuilds stale images
start/rebuild: .env
	@docker-compose up --build

.PHONY: start start/rebuild

# -- build --
## builds the docker images
build:
	@docker-compose build

# -- db --
## resets the dev database
db/reset:
	$(run) web rails db:reset

.PHONY: db/reset

# -- test --
jsjest = $(jsbin)/jest --maxWorkers=1

## runs all the tests
test: test/rails test/js
## runs the rails tests
test/rails:
	$(run) web rspec $(ONLY)
## runs the javascript tests
test/js:
	$(run) web $(jsjest)
## runs the javascript tests and updates all snapshots
test/js/snapshot:
	$(run) web $(jsjest) -u
## runs the javascript tests in watch mode
test/js/watch:
	$(run) web $(jsjest) --watch

.PHONY: test test/rails test/js test/js/snapshot test/js/watch

# -- lint --
jslint = $(jsbin)/standard './app/javascript/**/*.js'

## lints all the code
lint: lint/rails lint/js
## lints all the code and fixes errors
lint/fix: lint/rails/fix lint/js/fix

## lints the rails code
lint/rails:
	$(run) web rubocop
## lints the rails code and fixes errors
lint/rails/fix:
	$(run) web rubocop -a

## lints the js code
lint/js:
	$(run) -T web $(jslint) | $(jsbin)/snazzy
## lints the js code and fixes any errors it can
lint/js/fix:
	$(run) -T web $(jslint) --fix | $(jsbin)/snazzy

.PHONY: lint lint/fix lint/rails lint/rails/fix lint/js lint/js/fix

# -- rails --
## connects a rails console
rails/console:
	$(run) web rails console
## attaches a terminal session to the rails container
rails/attach:
	docker attach $(docker ps | grep 'web_web' | cut -d ' ' -f1)

.PHONY: rails/console rails/attach

# -- js --
jsrelay = $(jsbin)/relay-compiler --src ./app/javascript/src --schema schema.json

## type-checks the js code
js/flow:
	$(run) web $(jsbin)/flow
## type-checks the js code; restarting the server
js/flow/restart:
	$(run) web $(jsbin)/flow stop && $(jsbin)/flow
## type-checks the js code with minimal logging
js/flow/quiet:
	$(run) web $(jsbin)/flow --quiet

## compiles relay queries
js/relay:
	$(run) web $(jsrelay)
## compiles relay queries whenever they change
js/relay/watch:
	$(run) web $(jsrelay)/watch

.PHONY = js/flow js/flow/restart js/flow/quiet js/relay js/relay/watch

# -- verify --
## verifies the code is correct
verify: verify/rails verify/js
## verifies the rails code is correct
verify/rails: lint/rails test/rails
## verifies the rails code is correct
verify/js: lint/js test/js js/flow/quiet

.PHONY = verify verify/rails verify/js

# -- aliases --
# alias for docker-compose
dc = docker-compose
# prefix for running commands on an on-demand container
run = $(dc) run

# -- private --
.env:
	@echo "missing .env, copying over the sample"
	@cp config/dotenvs/sample.env .env

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
	printf "  \033[36m%-16s\033[0m %s\n", $$1, docs;
}
endef
export HELP

.PHONY = help

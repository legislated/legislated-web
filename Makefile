.DEFAULT_GOAL := help

# -- run --
## starts the docker app
start:
	@docker-compose up
## starts the docker app, rebuilding any stale images
start.rebuild:
	@docker-compose up --build

# -- db --
## resets the dev database
db.reset:
	@docker-compose run web rails db:reset

# -- test --
## runs all the tests
test: test-rails test-js
## runs the rails tests
test.rails: .is-up
	@docker-compose exec web rspec
## runs the javascript tests
test.js: .is-up
	@docker-compose exec web yarn jest
## runs the javascript tests in watch mode
test.js.watch: .is-up
	@docker-compose exec web yarn jest --watch

# -- helpers --
.is-up:
ifeq ($(strip $(docker ps | grep web)),)
	$(error docker is not started; run 'make start')
endif

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
	$$1=""; help=$$0;
	getline;
	printf "  \033[36m%-14s\033[0m %s\n", $$1, help;
}
endef
export HELP

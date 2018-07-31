.DEFAULT_GOAL := help

# -- context --
jsbin = ./node_modules/.bin

# -- run --
## starts the docker app
start:
	@docker-compose up
## starts the docker app, rebuilding any stale images
start/rebuild:
	@docker-compose up --build

.PHONY: start start/rebuild

# -- db --
## resets the dev database
db/reset:
	@docker-compose run web rails db:reset

.PHONY: db/reset

# -- test --
## runs all the tests
test: test-rails test-js
## runs the rails tests
test/rails: .is-up
	docker-compose exec web rspec
## runs the javascript tests
test/js: .is-up
	docker-compose exec web $(jsbin)/jest
## runs the javascript tests in watch mode
test/js/watch: .is-up
	docker-compose exec web $(jsbin)/jest --watch

.PHONY: test test/rails test/js test/js/watch

# -- lint --
jslint = $(jsbin)/standard './app/javascript/**/*.js'

## runs all the linters
lint: lint/rails lint/js
## runs all the linters and fixes errors
lint/fix: lint/rails/fix lint/js/fix
## runs the rails linter
lint/rails:
	docker-compose exec web rubocop
## runs the rails linter and fixes errors
lint/rails/fix:
	docker-compose exec web rubocop -a
## runs the js linter
lint/js:
	docker-compose exec -T web $(jslint) | $(jsbin)/snazzy
## runs the js linter and fixes any errors it can
lint/js/fix:
	docker-compose exec -T web $(jslint) --fix | $(jsbin)/snazzy

.PHONY: lint lint/fix lint/rails lint/rails/fix lint/js lint/js/fix

# -- private --
.is-up:
ifneq ($(strip $(docker ps | grep web_web)),)
	$(error the app is not running; run 'make start')
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
	$$1=""; docs=$$0;
	getline;
	sub(/:/, "", $$1);
	printf "  \033[36m%-13s\033[0m %s\n", $$1, docs;
}
endef
export HELP

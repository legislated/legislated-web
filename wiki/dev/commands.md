# Commands

### run

This runs the all the app services (using the most recent Docker images). It's the Docker-equivalent of `rails s`:

```sh
$ docker-compose up
```

Shut down all services by hitting `ctrl-c` and waiting for a second.

### rails:attach

Attach a terminal session to the running Rails server. Useful when you want interactive debugging:

```sh
$ docker attach $(docker ps | grep 'web_web' | cut -d ' ' -f1)
```

Close the session by hitting `ctrl-p, ctrl-q`. Using `ctrl-c` will shut down the Rails server completely.

### rails:test

Run the Rails test suite.

```sh
$ docker-compose exec web rspec
```

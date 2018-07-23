http://blog.scoutapp.com/articles/2018/01/02/dockerizing-a-rails-app

# install docker for mac

you can find it here:
https://store.docker.com/editions/community/docker-ce-desktop-mac

and you can find more install instructions (should you need them) here:
https://docs.docker.com/docker-for-mac/install/

docker for mac provides everything you need to get up & running w/ docker. notably, it provides you some core command line tools:

- `docker`: core cli for interacting with containers
- `docker-compose`: run _our_ app, interact with our running containers

**notice**: we don't currently support `docker-machine`-based `brew` setup. if you want to run the app in docker-machine, you may need to work through some configuration issues. feel free to pr any changes you need to make.

# build & run the app (this may take a while)
`docker-compose up --build`

# set up the app database
`docker-compose exec web rails db:reset`

# access the app from the browser
*should* be able to hit the app in from the browser at this point

# to stop the app
`ctrl+c` and wait patiently

# adding a gem
- add the gem to the `Gemfile`
- run `bundle lock` locally so that `Gemfile.lock` gets updated
- run `docker-compose up --build`

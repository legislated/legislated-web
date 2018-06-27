# install docker & friends
`brew update`
`brew install docker docker-compose docker-machine`

# start docker-machine (docker daemon) and create the default machine
`brew services start docker-machine`
`docker-machine create --driver virtualbox default`
`eval "$(docker-machine env default)"`

# build the app image
`docker-compose build`

# set up the app database
`docker-compose run web rails db:create`
`docker-compose run web rails db:migrate` # failing, missing pg_dump

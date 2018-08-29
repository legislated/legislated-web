# Setup - MacOS

We recommend using Docker for Mac on MacOS.

**Note**, we don't currently support a `brew`-managed docker setup. If you want to run the app this way, you may need to work through some configuration issues. Please PR any changes you make and update the documentation!

## Install Docker for Mac

Download and run the Docker for Mac [installer](
https://store.docker.com/editions/community/docker-ce-desktop-mac). Docker also provides official installation [instructions](https://docs.docker.com/docker-for-mac/install/) if you need them.

Docker for Mac includes everything you need to get up & running. It must be running whenever you want to work on the app. Notably, it installs some core Docker command line tools:

- `docker`: core CLI for interacting with containers
- `docker-compose`: run _our_ app services; use to execute commands on our running containers
- `docker-machine`: runs in the background, and provides a linux VM for containers

## Complete Setup

Return to the [contributing](wiki/contributing.md) document to complete setup.

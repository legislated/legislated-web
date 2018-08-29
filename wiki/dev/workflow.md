# Workflow

This document contains some tips for working with Rails / JavaScript, especially within Docker.

## Breakpoints

You can add breakpoints to the Rails code using [pry](http://pryrepl.org/) bindings:

```ruby
def method
  binding.pry # aka `debugger` in javascript
end
```

To debug at the breakpoint, open up a new terminal and attach to the `web` service:

```sh
$ make rails/attach
```

When the breakpoint is reached, a Rails console will pop up in the attached session.

Close the session by hitting `ctrl-p, ctrl-q`. Using `ctrl-c` will shut down the Rails server completely.

## Adding a Gem

Add the gem to the `Gemfile`, and then run:

```sh
$ bundle lock
```

This will update `Gemfile.lock` with appropriate dependency versions. Then stop the server, rebuild the containers so that they pick up the correct versions:

```sh
$ make start/rebuild
```

## Flowtype

We use [flowtype](https://flow.org/en/docs/getting-started/) to statically type-check our javascript. It's recommended that you use an editor that integrates nicely with flow to get real time errors. Atom (with the Nuclide plugin) is a [good candidate](https://nuclide.io/docs/languages/flow/).

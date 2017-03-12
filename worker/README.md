# Witness Slips

## Setup

Install any necessary global dependencies:

- ruby (2.3.0) -> [installation](https://github.com/rbenv/rbenv)
- bundler -> `gem install bundler`
- phantomjs

Then install local dependencies with bundler:
```sh
bundle
```

## Development

You can run the script with:
```sh
./run
```

You can use [pry](http://pryrepl.org/) to debug by littering the source with breakpoints:

```ruby
require "pry"; binding.pry
```

## Ideas
1. Find people who have tweeted about x, a bot asks them if they want to comment
2. Text to Speech Synthesizer!!! for calling congresspeople.
3. Post to Twitter or Reddits for people interested by topic
4. Push alerts via e-mail
5. Post bills to a Facebook group

## Code to Copy

page.find(:xpath, "//i[contains(@data-target, \"#week_#{x}\")]").click

t.find_css(".task-date").first.all_text

# Data Import

Data import happen nightly (on Heroku) via a collection of import jobs. There's a one-to-one correspondence between an import job, a scraper task, and a page to be scraped. You can find all the import jobs in the `jobs` directory, and the scraper tasks in the `scraper` subdirectory.

## Components

The general separation of responsibilities for these background worker components is as follows:

- `Import*Job`
  - Executing scraper tasks
  - Interacting with ActiveRecord models
  - Scheduling subsequent jobs
  - Handling errors / notifications
- `Scraper::*Task`
  - Scraping a single webpage (and traversing 'paged' webpages)
  - Generating shaped data (standard collections)

## Sidekiq

We use Sidekiq to schedule / perform background tasks. It tracks its job queue using a Redis instance, which it should connect to automatically when you run `foreman start`. Redis needs to be installed natively. On MacOS it can be installed and started using [`brew services`](https://github.com/Homebrew/homebrew-services).

Locally, you can run the jobs using Rake tasks that live in `lib/tasks/jobs.rake`:

```sh
$ rails jobs:import-hearings
```

You can also start any of them manually in the Rails console like so:

```ruby
$ rails console
...
> chamber = Chamber.find_by(kind: :house)
> ImportHearings.perform_async(chamber.id)
```

You can monitor the progress of Sidekiq jobs running locally using its web portal by opening a browser to the url http://localhost:5000/sidekiq.

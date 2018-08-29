# Architecture

If you've never worked with some of the technologies on this project, it may be worth reading up on them. Here's a breakdown of the major technologies we use.

## Rails

### [Rails](http://guides.rubyonrails.org/)

Rails is a web-application framework, and we use it to serve our API, interact with the database, etc. If you've never worked with it, the [official documentation](http://guides.rubyonrails.org/) is a good place to start.

### [GraphQL](api.md)

Our API is defined using GraphQL, a query language that is an alternative to REST. It offers a lot of flexibility to clients by allowing them to specify the exact data fields of the response. It's also simple to implement on the Rails side. See the link for more info.

### [Sidekiq, Capybara](import.md)

We use Sidekiq to scrape the data nightly from the ILGA's websites. Sidekiq provides a queueing system, built on top of Redis, for running background jobs. Our import jobs use Capybara / PhantomJS for their scraping.

### Client

### [React](https://facebook.github.io/react/docs/hello-world.html)

If you don't know React, it's recommended that you read their docs or pair-program with someone who already knows it. The rest of the client is going to build on top of it.

### [Relay](https://facebook.github.io/relay/docs/getting-started.html)

Relay is a library that allows React components to declarative specify the data they depend on from a remote GraphQL API. It provides automatic data synchronization and caching.

### [Flow](https://flow.org/en/docs/getting-started/)

Flow is a relatively unobtrusive static type checker for JavaScript. The reasons for using a type-checker are beyond the scope of this document. If you're familiar with static typing, the linked intro should be enough to get you going.

If you're not, the easiest way to get started is probably to pair program with someone who is. However, don't worry about it too much; it's more important to get started hacking. Write your code without types and we can help retrofit it into your PR afterwards.

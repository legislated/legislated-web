# API

Our data is accessible through a [GraphQL](http://graphql.org/) API, and the graph is defined using the [graphql-ruby](https://rmosolgo.github.io/graphql-ruby/) gem.

You can find our type definitions under the `graph` subdirectory.

## GraphQL

GraphQL is a technology that eschews traditional REST API patterns in favor of defining the resources the client can request as *nodes*. For instance, in this project a `Bill` ActiveRecord model is a resource that has a corresponding GraphQL *node*. The bill node's *type* says what fields the client can query on the bill.

An example is worth a thousand words. Using a REST API a client might request a bill by issuing a GET request to a URL like `https://www.api.com/bill/1` and receive a server-defined response in return.

Using a GraphQL API, the client instead makes a POST request to the graph endpoint, `https://www.api.com/graphql`, with a JSON body defining the shape of the response the client would like:

```
query {
  viewer {
    bill(id: "1") {
      id
      title
      summary
      hearing {
        date
      }
    }
  }
}
```

The actual JSON doesn't look *quite* like this, but we'll represent it this way for the sake of formatting. The graph processes this query, and returns a JSON response that looks a lot like the client's request:

```
{
  "data": {
    "viewer": {
      "bill": {
        "id": 1,
        "title": "World's Greatest Bill",
        "summary": "We've pinned all our hopes and dreams on this one.",
        "hearing": {
          "date": "2017-03-29T22:54:27+00:00"
        }
      }
    }
  }
}
```

## GraphiQL

You can install [GraphiQL](https://github.com/graphql/graphiql) (note the i) to quickly test out the graph. It has auto-completion, it validates your queries to make sure they're correct before you make them, it's great.

When your API server is running, enter `http://localhost:5000/graphql` as the endpoint in GraphiQL. It will make a request to inspect the shape of the graph, and then you can explore that shape in the sidebar, start tapping out a request in the request field, and execute it.

Jump down to the examples if you want to get started quickly.

## Relay

[Relay](https://facebook.github.io/relay/docs/getting-started.html#content) is a client-side framework for building React apps against a GraphQL. It requires a few special fields at the top level of the graph, `node` and `nodes`.

These fields use a globally unique identifier to look up any node without knowing its type (the ID a combination of the database ID and the type name). You shouldn't need to interact with them directly.

## Examples

#### Fetching Many Nodes

You can fetch a list of nodes using a connection like `bills`. Connections are a Relay-provided type provide a handful of built-in arguments for paging. Passing `first: 5`, for example, requests just the first 5 bills.

Connections wrap the list items in an `edges.node` envelope. If you want to add fields to the fetched data, you enter them under the node.

```
query {
  viewer {
    bills(first: 5) {
      edges {
        node {
          id
          title
          hearing {
            date
          }
        }
      }
    }
  }
}
```

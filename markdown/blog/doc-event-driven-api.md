---
title: "API documentation in event-driven applications"
date: 2020-05-18T10:00:10+01:00
type: Engineering
tags:
  - EDA
  - Documentation
cover: /img/posts/doc-event-driven-api.webp
authors:
  - name: Héctor Valls
    photo: /img/avatars/hvalls.webp
    link: https://twitter.com/hhccvvmm
    byline: Freelance Software Engineer
---

We live in an era of distributed systems. Airlines and hotels communicate with each other to offer us a better experience in our travels; shops work with shipping companies, so we have our new products in our homes in a matter of hours. All of these integrations across services are done using APIs. Those APIs must be well documented so the consumers can integrate with them easily. This is not only a technical matter but also a business-related one.

Currently, the most used API protocols are <a href="https://en.wikipedia.org/wiki/Representational_state_transfer">REST</a> and <a href="https://graphql.org/">GraphQL</a>. You can document your REST API using the <a href="https://swagger.io/specification/">OpenAPI</a> initiative. In the case of GraphQL, you can use tools like GraphiQL, which makes supported operations visible through <a href="https://graphql.org/learn/introspection/">introspection query</a>.

Both protocols are essentially synchronous: you make a request against the API and wait for a response. But what happens when you are to design an asynchronous event-oriented API? OpenAPI has been designed to document request/response APIs, and GraphQL has its own specific mechanism, so they are not applicable in this case. <a href="https://www.asyncapi.com/">AsyncAPI</a> to the rescue.

---

Let's imagine you work on a book shopping website called _SuperFunnyBooks_. Your team is responsible for the `Catalog Service`. Book publishers can register new books to the platform through your service. 

_SuperFunnyBooks_ product team needs a new feature to be added: when a new book is registered on the platform, it has to be recommended to users interested in that genre. To do this, a brand new service, `Recommendation Service`, is created and a new team is assigned to. 

The new service needs to know when a new book is registered in the platform, so `Catalog Service` will publish a `BookRegistered` event to a message queue every time this happens. This event will contain information about the new book. But, where is the message queue located? and what does exactly "information about the new book" mean? It sounds a little bit abstract and vague. `Recommendation Service` team needs to know every single field that will be included in the event's payload, as well as how to connect to the message queue to start listening for new events. In other words, they need the API documentation. 

This is how this event-oriented API would look like with AsyncAPI:

```yaml
asyncapi: 2.0.0
info:
  title: Catalog Service
  version: '1.0.0'

servers:
  production:
    url: catalog.superfunnybooks.com:9092
    protocol: kafka
    description: Production Kafka 

channels:
  book/registered:
    description: Book Registered Topic
    subscribe:
      summary: Receive information about new book registered in catalog
      message:
        name: BookRegistered
        contentType: application/json
        payload:
          type: object
          properties:
            bookId:
              type: string
            title:
              type: string
            author:
              type: string
            genre:
              type: string
            publisherId:
              type: string
            registeredAt:
              type: string
              format: datetime
```

The first part contains API metadata information. Then, `servers` information is declared; in this case, there is a Kafka server running on `catalog.superfunnybooks.com` at port `9092`. `channels` object groups all the operations that the API supports. This one allows consumers to subscribe to `book/registered` channel to be notified when a new book is registered. Also, the concrete event's payload schema is defined. 

With this document, API is properly defined and it provides a contract between `Catalog Service` and its consumers. Now, `Recommendation Service` knows where the message queue is located in the network and how exactly an event's payload looks like.

---

To sum up, having nice API documentation improves communication between teams in a company as well as between external stakeholders. Also, using a machine-friendly format (like YAML) in API documentation enables it to be integrated into the development lifecycle and the possibility of taking advantage of techniques like server stubbing or automatic testing.

This has been a simple example of how to use AsyncAPI specifications to document event-oriented APIs. <a href="https://www.asyncapi.com/docs/specifications/2.0.0/#specification">AsyncAPI spec</a> provides a lot of options that allow to define clearly many aspects of an API. It is worth keeping it in mind.

I hope you enjoyed this post.

(Original content from https://hvalls.dev/posts/doc-event-driven-api)

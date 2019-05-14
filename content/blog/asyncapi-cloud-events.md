---
title: "AsyncAPI and CloudEvents"
date: 2019-05-11T16:56:52+01:00
type: blog
featured: true
tags:
  - AsyncAPI
  - CloudEvents
  - Serverless
  - FaaS
  - Microservices
cover: /images/posts/asyncapi-cloudevents.jpg
weight: 200
authors:
  - name: Fran Méndez
    photo: /images/avatars/fmvilas.jpg
    link: https://twitter.com/fmvilas
    byline: AsyncAPI founder
---

I've been receiving the same question for a long time now: Should I use CloudEvents or AsyncAPI? — And my response has always been the same: it depends!

There is the belief by many people that AsyncAPI and CloudEvents are competing for the same thing. This can't be less true, and I'd like to explain you why. Read on!

# What is CloudEvents?

From [cloudevents.io](https://cloudevents.io):

> Enter CloudEvents, a specification for **describing event data in a common way**. CloudEvents seeks to ease event declaration and delivery across services, platforms and beyond!

The purpose of CloudEvents is to establish a common format for event data description. And it makes a lot of sense when you realize they are part of the [CNCF’s Serverless Working Group](https://github.com/cncf/wg-serverless).

If you are doing serverless or FaaS (Function as a Service), then CloudEvents is your best friend because the event is the only information you will have in your function during runtime. No topics or channels, no servers, no subscribers. Just the event and some extra information you may need to make your function work.

**CloudEvents is focused on the event** and defines an envelope for your application's data. See an example from their repo:

```json
{
    "specversion" : "0.2",
    "type" : "com.github.pull.create",
    "source" : "https://github.com/cloudevents/spec/pull/123",
    "id" : "A234-1234-1234",
    "time" : "2018-04-05T17:31:00Z",
    "comexampleextension1" : "value",
    "comexampleextension2" : {
        "othervalue": 5
    },
    "contenttype" : "text/xml",
    "data" : "<much wow=\"xml\"/>"
}
```

Here your event is actually `<much wow=\"xml\"/>` and the rest is meta information about your event. This envelope is what CloudEvents define with the purpose of making event declaration reusable across services and platforms.

# What is AsyncAPI?

From the [AsyncAPI repo](https://github.com/asyncapi/asyncapi):

> Create machine-readable definitions of your event-driven APIs.

The purpose of AsyncAPI is to provide a way for you to define how your event-driven applications (or APIs) communicate with the rest of the world. **AsyncAPI is focused on the application and the channels it uses to communicate**. Similar to what [OpenAPI](https://github.com/OAI/OpenAPI-Specification) does for REST APIs. Unlike CloudEvents —who focuses on the message— AsyncAPI does not impose how your event must look like but, instead, allows you to strictly define its shape. See an example:

```yaml
asyncapi: 2.0.0-rc1
id: urn:com.asyncapi.examples.user
info:
  title: User service
  version: 1.6.3
channels:
  user/signedup:
    publish:
      message:
        payload:
          type: object
          properties:
            fullName:
              type: string
            email:
              type: string
              format: email
```

Looking at the example above, one can rapidly say this is the AsyncAPI definition of a User service, which its API version is 1.6.3 and it publishes to the `user/signedup` channel an event that is an object containing two properties: `fullName` and `email`.

We can define the event payload but its structure is totally free and user-defined. And that's what makes AsyncAPI so powerful! Since our event payload can be anything, it can also be a CloudEvents event.

# AsyncAPI + CloudEvents

Let's see an example of the two combined:

```yaml
asyncapi: 2.0.0-rc1
id: urn:com.asyncapi.examples.user
info:
  title: User service
  version: 1.6.3
channels:
  user/signedup:
    publish:
      message:
        payload:
          type: object
          properties:
            specversion:
              type: string
              enum: ['0.2']
            type:
              type: string
              example: com.github.pull.create
            source:
              type: string
              format: uri
              example: urn:com.asyncapi.examples.user
            id:
              type: string
              example: 'A234-1234-1234'
            time:
              type: string
              format: date-time
              example: 2018-04-05T17:31:00Z
            contenttype:
              type: string
              example: 'application/json'
            data:
              type: object
              properties:
                fullName:
                  type: string
                email:
                  type: string
                  format: email
```

Looking at the example above, one can say this is the AsyncAPI definition of a User service, which its API version is 1.6.3 and it publishes to the `user/signedup` channel a CloudEvents event whose data is a JSON object containing two properties: `fullName` and `email`.

## Leveraging AsyncAPI Custom Schema Formats

There's only one concern with the approach above: every single CloudEvents definition is going to be exactly the same from line 11 to 33 — except for the examples that were added in this blog for clarity.

The default format for defining events (messages) in AsyncAPI 2.0 is JSON Schema. Thankfully, AsyncAPI provides a way to define events in your own custom format —like Avro and Protobuf — or a hypothetical CloudEvents one in this case. See example:

{{<code lang="yaml" lines="10">}}
asyncapi: 2.0.0-rc1
id: urn:com.asyncapi.examples.user
info:
  title: User service
  version: 1.6.3
channels:
  user/signedup:
    publish:
      message:
        schemaFormat: 'application/cloudevents+json; version=0.2; charset=utf-8'
        payload:
          type: object
          properties:
            fullName:
              type: string
            email:
              type: string
              format: email
{{</code>}}

This results in a much shorter and nicer way of defining the usage of CloudEvents inside an AsyncAPI document.

## Ok, it's possible but, does it makes sense?

It really depends on your use case but it makes sense in scenarios where some kind of FaaS is involved. Consider the following example:

![](/images/diagrams/asyncapi-cloudevents.png)

Reading the diagram from the bottom up, we see an overly simplified diagram of a sign up process. The `user/signedup` event flows from the REST API to the monitoring service and the FaaS API through the broker. The event could have the CloudEvents format so that both, the FaaS API and the monitoring service, understand it. Obviously, one may argue that the Faas API could be wrapping the event data in CloudEvents format and leave the rest of the events untouched, in plain JSON. Fair.

So, does it really makes sense? It certainly does in some situations. Do you have to use AsyncAPI and CloudEvents together? As always that's up to you. **You have the tools. Choose them wisely.**

# Conclusion

We've learned how AsyncAPI differs from CloudEvents. Before I finish these lines, I'd like to make something clear again: AsyncAPI focuses on the application and how it is connected; and CloudEvents focuses on the message. Both things are compatible and complementary. Evaluate what are your needs and decide which one suits them better. There's no one-size-fits-all solution.

I hope you learned something new, if so, please consider donating to the [AsyncAPI Initiative](https://opencollective.com/asyncapi).

Until next time! 👋
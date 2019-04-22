---
title: "Coming from OpenAPI"
date: 2019-04-01T10:56:52+01:00
menu:
  docs:
    parent: 'getting-started'
weight: 20
---

{{% notice %}}
This article is about version 2.0.0-rc1 of the specification. Please note that documentation and tooling support are minimum or inexistent yet. We're working hard
to update everything to version 2.0.0 as soon as possible. Thanks for your patience.
{{% /notice %}}

If you're coming from OpenAPI, you must know that AsyncAPI [started as an adaptation of the OpenAPI specification](https://medium.com/asyncapi/whats-new-on-asyncapi-lots-2d9019a1869d). We wanted to have as much compatibility as possible between the two so users could reuse parts in both.

You'll find lots of similarities between OpenAPI and AsyncAPI. Just bear in mind that, in the world of event-driven architectures, we have more than one protocol and therefore some things are different. Check out the following comparison chart, inspired by [Darrel Miller's blog post](https://www.openapis.org/news/blogs/2016/10/tdc-structural-improvements-explaining-30-spec-part-2):

{{<openapi-comparison>}}

Aside from structural differences you must know that:

1. In OpenAPI, the meaning of the operation verbs must be seen from a client perspective. E.g., the client **can GET, POST, DELETE**, etc. to these paths. However, in AsyncAPI the meaning of the verbs "publish" and "subscribe" must be seen from the application perspective. E.g., your application **will publish and/or subscribe** to these channels.
2. OpenAPI schemas and AsyncAPI schemas are the same.
3. Message payload in AsyncAPI can be any value, not just an AsyncAPI/OpenAPI schema. For instance, it can be an Avro schema or a Protobuf message.
4. [AsyncAPI server object](/docs/specifications/2.0.0-rc1/#serverObject) is almost identical to its OpenAPI counterpart with the exception that `scheme` has been renamed to `protocol` and AsyncAPI introduces a new property called `protocolVersion`.
5. OpenAPI path parameters and [AsyncAPI channel parameters](/docs/specifications/2.0.0-rc1/#parameterObject) are a bit different since AsyncAPI doesn't have the notion of "query" and "cookie", and header parameters can be defined in the [message object](/docs/specifications/2.0.0-rc1/#messageObject). Therefore, AsyncAPI channel parameters are the equivalent of OpenAPI path parameters.

## Conclusion

As we have seen above, OpenAPI and AsyncAPI are very similar. In a real world environment, systems don't have just REST APIs or events but a mix of both. Most of the times, the information flowing in the events are very similar to the one the REST APIs have to handle in requests and responses, thus being able to reuse schemas is a huge win.

Enough speaking, let's get our hands dirty with some examples. Learn how to create an AsyncAPI document defining a "Hello world" application.

{{%next-chapter url="/docs/getting-started/hello-world"%}}

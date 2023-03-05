---
title: "Coming from OpenAPI"
date: 2019-04-01T10:56:52+01:00
menu:
  docs:
    parent: 'getting-started'
weight: 20
---

If you're coming from OpenAPI, you must know that AsyncAPI [started as an adaptation of the OpenAPI specification](https://medium.com/asyncapi/whats-new-on-asyncapi-lots-2d9019a1869d). We wanted to have as much compatibility as possible between the two so users could reuse parts in both.

You'll find lots of similarities between OpenAPI and AsyncAPI. Just bear in mind that in the world of event-driven architectures, you have more than one protocol and therefore some things are different. Check out the following comparison chart, inspired by [Darrel Miller's blog post](https://www.openapis.org/news/blogs/2016/10/tdc-structural-improvements-explaining-30-spec-part-2):

import OpenAPIComparison from '../../../../components/OpenAPIComparison'

<OpenAPIComparison className="my-8" />

Aside from structural differences you must know that:

1. AsyncAPI is compatible with OpenAPI schemas.
1. Message payload in AsyncAPI can be any value, not just an AsyncAPI/OpenAPI schema. For instance, it could be an Avro schema.
1. [AsyncAPI server object](/docs/specifications/2.2.0/#serverObject) is almost identical to its OpenAPI counterpart with the exception that `scheme` has been renamed to `protocol` and AsyncAPI introduces a new property called `protocolVersion`.
1. OpenAPI path parameters and [AsyncAPI channel parameters](/docs/specifications/2.2.0/#parameterObject) are a bit different since AsyncAPI doesn't have the notion of "query" and "cookie", and header parameters can be defined in the [message object](/docs/specifications/2.2.0/#messageObject). Therefore, AsyncAPI channel parameters are the equivalent of OpenAPI path parameters.

## Conclusion

As you have seen above, OpenAPI and AsyncAPI are very similar. In a real-world environment, systems don't have just REST APIs or events but a mix of both. Most of the time, the information flowing in the events is very similar to the one the REST APIs have to handle in requests and responses; thus, being able to reuse schemas is a huge win.

Enough reading, it's time to get your hands dirty with some actual examples. Let's learn how to create an AsyncAPI document that defines a "Hello world" application.

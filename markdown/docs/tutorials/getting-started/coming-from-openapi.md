---
title: "Coming from OpenAPI"
weight: 20
---

If you're coming from OpenAPI, you must know that AsyncAPI [started as an adaptation of the OpenAPI specification](https://medium.com/asyncapi/whats-new-on-asyncapi-lots-2d9019a1869d). AsyncAPI wanted to be as compatible as possible with OpenAPI so that the users could reuse parts in both.

Before AsyncAPI `3.0.0`, you could find many similarities between OpenAPI and AsyncAPI. Remember that in the world of Event-Driven Architectures, you have more than one protocol; therefore, some things are different. Check out the following comparison chart, inspired by [Darrel Miller's blog post](https://www.openapis.org/blog/2016/10/03/tdc-structural-improvements-explaining-the-3-0-spec-part-2):

import OpenAPIComparison from '../../../../components/OpenAPIComparison'

<OpenAPIComparison className="my-8" />

To enable more flexibility, the AsyncAPI `3.0.0` specification changes more and is less similar to OpenAPI starting with this version. The biggest change is in the channel structure, where operations are separated from it. It is like detaching operations from paths in OpenAPI. 

import OpenAPIComparisonV3 from '../../../../components/OpenAPIComparisonV3'

<OpenAPIComparisonV3 className="my-8" />

Aside from structural differences, you should know:

1. AsyncAPI is compatible with OpenAPI schemas.
1. The message payload in AsyncAPI can be any value, not just an AsyncAPI/OpenAPI schema. For instance, it could be an [Avro](https://avro.apache.org/) schema.
1. The [AsyncAPI server object](/docs/reference/specification/latest#serverObject) is almost identical to its OpenAPI counterpart, with the exception that `scheme` has been renamed to `protocol` and AsyncAPI introduces a new property called `protocolVersion`. AsyncAPI supports multiple protocols, not only HTTP, like in the case of OpenAPI.
1. OpenAPI path parameters and [AsyncAPI channel parameters](/docs/reference/specification/latest#parameterObject) are a bit different since AsyncAPI doesn't have the notion of "query" and "cookie", and header parameters can be defined in the [message object](/docs/reference/specification/latest#messageObject). Therefore, AsyncAPI channel parameters are the equivalent of OpenAPI path parameters.

## Conclusion

As you have seen above, OpenAPI and AsyncAPI are similar, but the specification's evolution will bring more differences in the future. In a real-world environment, systems don't have just REST APIs or events, but a mix of both. Most of the time, the information flowing in the events is very similar to the one the REST APIs have to handle in requests and responses; thus, being able to reuse schemas is a huge win.

Let's learn how to create an AsyncAPI document that defines a "Hello world" application.

---
title: 'Introduction'
weight: 50
---

The AsyncAPI document is a file describing the message-driven API in accordance with the AsyncAPI Specification via JSON objects that conform to the JSON standards. (YAML, being a superset of JSON, can also be used.)
The AsyncAPI document offers a standardized approach for documenting and describing asynchronous and event-driven systems, clearly defining various components like channels and messages. Additionally, users can leverage both the AsyncAPI document and tools like the AsyncAPI Generator for code and documentation generation, enhancing efficiency and consistency in their development processes.

Furthermore, the AsyncAPI document acts as a communication contract between `receivers` and `senders` within an event-driven system. It specifies the payload content required when a service produces a message and offers clear guidance to the consumer regarding the message's properties.

```YAML
asyncapi: 3.0.0
info:
  title: Cool Example
  version: 0.1.0
channels:
  user/signedup:
    subscribe:
      message:
        description: An event describing that a user just signed up.
        payload:
          type: object
          additionalProperties: false
          properties:
            fullName:
              type: string
            email:
              type: string
              format: email
            age:
              type: integer
              minimum: 18
```

## AsyncAPI document components

The AsyncAPI document follows a specific structure with certain fields:

- **`asyncapi`**: This is a required field that specifies the AsyncAPI specification version that your document adheres to.

- **`info`**: This required field holds metadata about the API. The `info` section must include the following sub-fields:
   
   - `title`: A descriptive title of the API.
   
   - `version`: An API version identifier.
   
   Optional fields within the `info` section could include `description`, `termsOfService`, `contact` (with subfields for `name`, `url`, `email`), and `license` (with `name` and `url` subfields).

- **`servers`**: An optional field specifying the server(s) where the API is available. Each server must have a `url` and may have `protocol`, `protocolVersion`, `description`, `variables`, `security`, and `bindings`.

- **`channels`**: This required field describes the paths available to the API and must include at least one channel. Each channel could include fields such as `description`, `subscribe`, `publish`, `parameters`, and `bindings`.

- **`components`**: An optional section for defining reusable components like `messages`, `schemas`, `securitySchemes`, and others.

- **`tags`**: An optional array of tags used by the specification with additional metadata. Each tag object can have `name` and `description`.

- **`externalDocs`**: An optional section to provide more information, such as a link to the API’s external documentation with a `description` and a `url`.


<Remember>
You might have additional fields depending on the implemented protocol (i.e., MQTT, AMQP, Kafka, etc.).
</Remember>
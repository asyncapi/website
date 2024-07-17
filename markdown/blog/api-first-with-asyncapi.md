---
title: API-First with AsyncAPI
date: 2023-08-10T06:00:00+01:00
type: Engineering
tags:
  - API-First
  - EDA
  - Specification
cover: /img/posts/zenwave/api-first-with-asyncapi-banner.png
canonical: https://zenwave360.github.io/Event-Driven-Architectures/API-First-with-AsyncAPI
authors:
  - name: Ivan Garcia Sainz-Aja
    photo: /img/avatars/ivangsa.webp
    link: https://www.linkedin.com/in/ivangarciasainzaja/
    byline: Software Architect at Sngular. Speaker. Building ZenWave 360º
excerpt: 'If you are familiar with OpenAPI and OpenAPI Generator API-First process, doing API-First with AsyncAPI is similar.'
---

# API-First with AsyncAPI

- [API-First with AsyncAPI](#api-first-with-asyncapi)
  - [Broker-based APIs are Symmetric](#broker-based-apis-are-symmetric)
  - [Events, Commands, and Messages](#events-commands-and-messages)
  - [Understanding AsyncAPI Definition](#understanding-asyncapi-definition)
    - [Info](#info)
    - [Servers](#servers)
    - [Channels: Publish / Subscribe](#channels-publish--subscribe)
    - [Messages](#messages)
    - [Message Payloads / Schemas](#message-payloads--schemas)
    - [Reusing Configurations: Operation Traits, Message Traits...](#reusing-configurations-operation-traits-message-traits)
  - [Different Styles of Event Messages](#different-styles-of-event-messages)
    - [Notification Messages](#notification-messages)
    - [State Transfer Messages](#state-transfer-messages)
    - [Domain Event Messages](#domain-event-messages)
  - [Next: Java Code Generator for AsyncAPI](#next-java-code-generator-for-asyncapi)

If you are familiar with OpenAPI and OpenAPI Generator API-First workflow:

- First, write the OpenAPI definition, collaborating between API providers and API consumers.
- Then, use OpenAPI Generator, either the maven plugin or a CLI, to generate some DTOs and interfaces from your OpenAPI definition.
- Implementing the generated interfaces, you can create a service for the API.
- As a client, you can use generated interfaces to consume the API with some HTTP client generated behind the scenes.

When doing API-First with AsyncAPI, the process is similar. After you generate some interfaces and DTOs from your API definition, you use the generated interfaces to produce messages, send them to the broker, and implement them to consume messages from the broker.

There is still a fundamental difference between OpenAPI and AsyncAPI: OpenAPI is used to document Request-Response / Client-Server APIs, while AsyncAPI is used to document Event-Driven APIs which, except for WebSockets, are Broker-based. 

And broker-based APIs, unlike Client-Server, are inherently **symmetric**.

## Broker-based APIs are Symmetric

![Client-server vs broker-based EDAs](/img/posts/zenwave/client-server-vs-broker-eda.excalidraw.svg)

Because APIs mediated by a broker are inherent **symmetric**, it's difficult to establish the roles of the client/server: what represents a `publish` operation from one side will be a `subscribe` operation seen from the other side. Also, a given service can act as a publisher and subscriber on the same API.

For these reasons, to avoid defining the same API operations multiple times from each perspective, we propose to define the API only once from the perspective of the provider of the functionality, which may be a producer, a consumer, or both. 

Some definitions:

- SERVICE: An independent piece of software, typically a microservice, that provides a set of capabilities to other services.
- PROVIDER: The service that implements the functionality of the API. It may be accepting asynchronous command requests or publishing business domain events.
- CLIENT/s: The service/s that uses the API's functionality. It may be requesting asynchronous commands or subscribing to business domain events.
- PRODUCER: A service that writes a given message.
- CONSUMER: A service that reads a given message.

> Define your AsyncAPI from the perspective of the **PROVIDER** of the functionality, which may be a producer, a consumer, or both. Share this definition with your **CLIENTS**.

Use the table to understand which section of AsyncAPI (publish or subscribe) to use for each topic and which role (provider or client) to use on the plugin configuration.

|                              | Events                | Commands                |
|------------------------------|-----------------------|-------------------------|
| Provider                     | Produces (publish)    | Consumes (subscribe)    |
| Client                       | Consumes (subscribe)  | Produces (publish)      |
| OperationId Suggested Prefix | **on**&lt;Event Name> | **do**&lt;Command Name> |

If you still find it confusing which one is a provider and a client, just use this rule: it can be only one provider of a given message, while clients of a given message there can be many:

- If the provider is the producer, use publish section
- If it is the consumer, use subscribe section.

## Events, Commands, and Messages

There are two types of messages in a messaging system: events and commands. An event message describes a change that has already happened, while a command message describes an operation that needs to be carried out. In other words, events are used to notify subscribers about something that has already occurred, while commands are used to initiate an action or process.

- **Event:** A message describing a change that has already happened.
- **Command:** A message describing an operation that has to be carried out.

Also, while there can be only one provider that produces a given event, commands can be issued for one or many client producers.

## Understanding AsyncAPI Definition

While OpenAPI and AsyncAPI come to document completely different architectural styles, they are similar in many aspects; in fact, AsyncAPI YAML format was initially based on OpenAPI format and structure.

If you are familiar with OpenAPI, you may find useful the following image borrowed from AsyncAPI documentation (click image to follow):

[![OpenAPI and AsyncAPI](/img/posts/zenwave/openapi-asyncapi.png)](https://www.asyncapi.com/docs/tutorials/getting-started/coming-from-openapi)

### Info

Document your API: name, purpose, contact details, and license...

### Servers

Document where your API will be deployed and required security...

You can also document some server **protocol-specific configurations** using free-form **bindings** property

### Channels: Publish / Subscribe

Each channel represents one single broker topic, channel, or queue... where you are about to publish or subscribe.

Use the table above to understand which section, publish or subscribe, you may want to use.

In a nutshell: 

> Providers publish events and subscribe to commands/queries/requests.

If you still find it confusing which is a provider and a client, use this rule: In a given messaging scenario, there can be only one provider of a message, while there can be multiple clients. If the provider is producing messages, use the `publish` section. If the provider is consuming messages, use the `subscribe` section.

### Messages

Use Messages to describe **Headers**, **Payload Schema**, and **Content-Type**. You can also include examples, descriptions, and protocol-specific binding documentation... 

```yml
components:
  messages:
    turnOnOff:
      name: turnOnOff
      title: Turn on/off
      summary: Command a particular streetlight to turn the lights on or off.
      headers:
        type: object
        properties:
          my-app-header:
            type: string
      payload:
        $ref: "#/components/schemas/turnOnOffPayload"

```

### Message Payloads / Schemas

You can define message payloads as:

- Inline components/schemas in the same familiar way you do in OpenAPI
- External files: both `json-schema` and `avro schemas` (.avsc) are supported

```yml
components:
  messages:
    MessageWithAsyncAPISchema:
      payload:
        $ref: "#/components/schemas/turnOnOffPayload" ## asyncapi/inline schema
    MessageWithExternalJsonSchema:
      schemaFormat: 'application/schema+json;version=draft-07'
      payload:
        $ref: "some/external/file.schema" ## a json-schema file
    MessageWithAvroSchema:
      schemaFormat: application/vnd.apache.avro+json;version=1.9.0
      payload:
        $ref: "v1/imports/file.avsc" ## and avro schema file
```


### Reusing Configurations: Operation Traits, Message Traits...

Operation Traits, Message Traits are an excellent way to reuse chunks of configuration between different operations or messages.

For instance, if various messages share some common headers, you can configure them as Message Traits:
```yml
components:
  messages:
    CustomerEventMessage:
      name: CustomerEventMessage
      title: Async Event for a Customer
      summary: Async Event for a Customer
      schemaFormat: application/vnd.aai.asyncapi;version=2.4.0
      traits:
      - $ref: '#/components/messageTraits/CommonHeaders' # 'CommonHeaders' contents will replace 'traits' property
      payload:
      $ref: '#/components/schemas/CustomerEventPayload'

  messageTraits:
    CommonHeaders:
      headers:
      type: object
      properties:
      my-app-header:
        type: integer
        minimum: 0
        maximum: 100
```

And the same concept applies to Operation Traits.


## Different Styles of Event Messages

### Notification Messages

An Event Notification **contains minimal information about the event** and enough information for interested consumers to locate additional details. The specifics of what information is included in an event notification can vary depending on the system or use case.

```json
{
  "headers": {
    "event-type": "customer-created",
    "event-id": "",
    "aggregate-id": "1",
    "aggregate-type": "customer"
  },
  "payload": {
    "id": 1,
    "eventType": "created",
    "link": "/customers/1"
  }
}
```

### State Transfer Messages

On the other hand, a State Transfer message **contains the entire state of the aggregate**, so a consumer does not need to make additional calls. This can be useful in situations where subscribers need to maintain a synchronized view of the data. Compacted keyed topics typically use this style of messages.

```json
{
  "headers": {
    "event-id": "",
    "aggregate-id": "1",
    "aggregate-type": "customer"
  },
  "payload": {
    "id": 1,
    "firstName": "string",
    "lastName": "string",
    "password": "string",
    "email": "string",
    "username": "string",
    "address": {
      "id": 1,
      "street": "string",
      "city": "string",
      "state": "string",
      "zip": "string"
    }
  }
}
```


### Domain Event Messages

Domain Event Messages **contains information about the event and interesting portions of the underlying aggregate**, but not the entire state of the aggregate. This style of events is typically used for Event Sourcing integration patterns.

```json
{
  "headers": {
    "event-type": "customer-address-updated",
    "event-id": "",
    "aggregate-id": "1",
    "aggregate-type": "customer"
  },
  "payload": {
    "id": 1,
    "eventType": "address-updated",
    "customer": {
      "id": 1,
      "new-address": {
        "street": "string",
        "city": "string",
        "state": "string",
        "zip": "string"
      }
    }
  }
}
```

 
## Next: Java Code Generator for AsyncAPI

[Next: Java Code Generator for AsyncAPI](zenwave-asyncapi-code-generator.md)

---

Originally published at [https://zenwave360.github.io](https://zenwave360.github.io/Event-Driven-Architectures/API-First-with-AsyncAPI)

---
title: Messages validation
description: This guide explains different use cases for message validation using AsyncAPI.
weight: 120
---

# Introduction
This guide explains different concepts of validating messages. You will also learn what role AsyncAPI documents play in validation.

# Message validation
To understand message validation, we must first understand the basic components involved.
- Producer: The producer is responsible for producing messages.
- Consumer: The consumer is responsible for getting the producer's messages.
- Broker: The broker acts as a bridge between the consumer and the producer because messages travel through the broker.

Message validation can occur in different places in your system. This guide highlights three of those:
- Both producers and consumers can do validation internally in runtime. 
- Validation of the message can be handled by API Gateway
- Validation of messages can be a native solution implemented by the broker.

Because consumers and producers cannot communicate directly, the AsyncAPI file dictates what should be included in the payload when a service produces a message. The AsyncAPI document also tells the consumer about the message's properties.

Let's further break down how validation works for all.

## Validation in runtime
Messages produced and consumed are both required for runtime message validation.
The AsyncAPI document should include descriptions of payload schemas so that you can read them in your application and validate messages that are consumed and produced by the application.

Before messages reach the consumer, runtime validation ensures that any errors are resolved and valid messages are sent to your application.

The [AsyncAPI schema validator](https://github.com/WaleedAshraf/asyncapi-validator) is a message validator which validates messages produced/consumed in your application against your AsyncAPI document.
Check out the Message validation in runtime() tutorial if you want to get your hands dirty with message validation. 

```mermaid
graph TD
    subgraph Producer
    G[Message produced] -->|Message| B{Is Message valid?}
    B -->|No| A[Logs]
    end
    B -->|Yes| C[Broker]
    C -->|Message| E{Is Message valid?}
    subgraph Consumer
    E -->|No| F[Logs]
    E -->|Yes| H[Message consumed]
    end
```

### `messageId` validation method
The `messageId` is defined in [AsyncAPI Schema v2.4.0](https://www.asyncapi.com/docs/reference/specification/v2.4.0#messageObject).
<CodeBlock>
`.validateByMessageId(key, payload)`
</CodeBlock>

1. Create an AsyncAPI document:
<CodeBlock language="yaml">
{`cat <<EOT >> asyncapi.yaml
asyncapi: 2.0.0
info:
  title: User Events
  version: 1.0.0
channels:
  user-events:
    description: user related events
    publish:
      message:
        name: UserDeletedMessage
        x-custom-key: UserDeleted
        payload:
          type: object
          properties:
            userEmail:
              type: string
            userId:
              type: string
              EOT`}
</CodeBlock>

2. Validate incoming MQTT messages by loading the AsyncAPI schema definition via the `fromSource` method. 

<CodeBlock>
{`const AsyncApiValidator = require('asyncapi-validator')
let va = await AsyncApiValidator.fromSource('./api.yaml')
// validate messageId 'UserRemoved'
va.validateByMessageId('UserRemoved', {
  userId: '123456789',
  userEmail: 'alex@mail.com',
})`}
</CodeBlock>

## Validation in a gateway
A gateway intercepts all incoming messages and routes them through the middleware and handler pipelines. The gateway sits between the producer and the broker. The messages are routed through the gateway first, and the gateway determines whether the message is valid. If the message is invalid, it displays an error and is not forwarded to the broker.

<Remember>
Currently, only the Kafka protocol is supported.
</Remember>

```mermaid
graph TD
    PR[Producer]-- Message --- EG[AsyncAPI Event-Gateway]
    EG -- Message --- EGV{Is Message valid?}
    EGV -->|Yes| BR[Broker]
    EGV --- |No| INV{Fail when invalid?}
    INV -->|Yes| ERR[/Fail/] -- Produce request errored --> PR
    INV -->|No| BR
```
The AsyncAPI document is important in this case because payload schemas are taken from it and messages as validated against it in your application.
You can spin up the AsyncAPI gateway using an AsyncAPI file. All the messages are forwarded to a WebSocket endpoint; if the message/payload is invalid, it includes a validation error message.

### UseCase
You can use a Kafka consumer/producer[(kcat)](https://github.com/edenhill/kcat), a broker, and a simple WebSocket to run the AsyncAPI gateway in your machine.
```
type: object
properties:
  lumens:
    type: integer
    minimum: 0
    description: Light intensity measured in lumens.
  sentAt:
    type: s
    format: date-time
    description: Date and time when the message was sent.
 ```
Here the expected payload `lightMeasured` is an integer. A validation error will be included if the producer sends a message with the type boolean.
 ```
 "_asyncapi_eg_validation_error": "{\"ts\":\"2021-12-20T11:33:26.583143572Z\",\"errors\":[\"lumens: Invalid type. Expected: integer, given: boolean\"]}",
 ```
## Validation handled by the broker
As producers and consumers do not communicate with each other directly, but rather information transfer happens via Kafka topic. At the same time, the consumer still needs to know the type of data the producer is sending. Imagine if the producer starts sending bad data to Kafka or if the data type of your data gets changed. We need a way to have a common data type that must be agreed upon.

That’s where Schema Registry comes into the picture. It is an application that resides outside of your Kafka cluster and handles the distribution of schemas to the producer and consumer by storing a copy of schema in its local cache.

```mermaid
graph LR
    A([Producer]) --->|send schemaID| B(Schema Registry) & C{Kafka Cluster}--->|recieve schemaID| D([Consumer])
```
With the schema registry in place, the producer first talks to the schema registry and checks if the schema is available before sending the data to Kafka. If it cannot locate the schema, it registers and caches it in the schema registry. When the producer receives the schema,to sends it to Kafka prefixed with a unique schema ID. When the consumer processes this message, it will communicate with the schema registry using the schema ID obtained from the producer. If there is a schema mismatch, the schema registry will throw an error, informing the producer that it is violating the schema agreement.

```mermaid
stateDiagram-v2
    Producer --> Broker : messages
    Producer --> Fail : error
    Broker --> Schema_registry : validation request
    Schema_registry --> consumer : valid message
    Schema_registry --> Fail : invalid message
```

Broker validation can also be implemented using other methods. AsyncAPI is not involved in validation here but the schemas that are stored in Schema registry can be referenced from AsyncAPI documents.
Here's an example of AsyncAPI document where you can see `schemaFormat` and `payload` 
```
asyncapi: 2.0.0
info:
  title: Example with Avro
  version: 0.1.0
channels:
  example:
    publish:
      message:
        schemaFormat: 'application/vnd.apache.avro;version=1.9.0'
        payload:
          $ref: 'https://example.europe-west3.gcp.confluent.cloud/subjects/test/versions/1/schema'
```

# Additional Resources
- Check out an [AsyncAPI file demo with Studio.](https://studio.asyncapi.com/?url=https://raw.githubusercontent.com/asyncapi/event-gateway/master/deployments/k8s/event-gateway-demo/event-gateway-demo.asyncapi.yaml)

- Check out other [AsyncAPI validators](https://www.asyncapi.com/docs/tools#validators)

---

<DocsButton
  suggestions={[
    {
      href: '/docs/guides/validate',
      title: 'Validate AsyncAPI Documents',
      type:'back',
    },
    {
      href: '/docs/reference',
      title: 'Reference - Overview',
      type:'next',
    }
  ]}
/>

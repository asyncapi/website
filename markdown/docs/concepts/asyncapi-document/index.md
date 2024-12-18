---
title: 'Introduction'
weight: 50
---

The [AsyncAPI specification](/docs/reference/specification/latest) defines fields for describing an application's API in an *AsyncAPI document*. While the document may reference other files for details or shared fields, it typically serves as a single, primary document that encapsulates the API description.

The AsyncAPI document is a communication contract between senders and receivers within an event-driven system. It specifies the payload content required for a service to send a message and provides the receiver with guidance about the message's properties.

```yaml
asyncapi: 3.0.0
info:
  title: Cool Example
  version: 0.1.0
channels:
  userSignedUp:
    address: user/signedup
    messages:
      userSignedUp:
        description: An event describing that a user just signed up.
        payload:
          type: object
          properties:
            fullName:
              type: string
            email:
              type: string
              format: email
            age:
              type: integer
              minimum: 18
operations: 
  userSignedUp:
    action: send
    channel: 
      $ref: '#/channels/userSignedUp'
```

<Remember>
Depending on the protocol (such as MQTT, AMQP, Kafka), your AsyncAPI document may have additional fields. For example, for [configuring Kafka bindings](https://github.com/asyncapi/bindings/tree/master/kafka).
</Remember>

---
title: 'Introduction'
weight: 50
---

The AsyncAPI Specification defines a set of fields that can be used in an AsyncAPI document to describe an application's API. The document may reference other files for additional details or shared fields, but it is typically a single, primary document that encapsulates the API description.

Furthermore, the AsyncAPI document acts as a communication contract between `receivers` and `senders` within an event-driven system. It specifies the payload content required when a service sends a message and offers clear guidance to the receiver regarding the message's properties.

```YAML
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
You might have additional fields depending on the implemented protocol (i.e., MQTT, AMQP, Kafka, etc.). 
  
For example, your AsyncAPI document could have additional fields for <a href= "https://github.com/asyncapi/bindings/tree/master/kafka">configuring Kafka bindings</a>.
</Remember>

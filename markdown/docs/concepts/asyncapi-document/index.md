---
title: 'Introduction'
weight: 50
---

The AsyncAPI Specification defines a set of fields that can be used in an AsyncAPI document to describe an application’s API. While the document may reference other files for additional details or shared fields, it usually serves as a single, primary document that encapsulates the API description.

Furthermore, the AsyncAPI document acts as a communication contract between receivers and senders within an event-driven system. It specifies the payload content necessary for a service to send a message and provides clear guidance to the receiver about the message's properties.

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
Depending on the implemented protocol (such as MQTT, AMQP, Kafka, etc.), you may have additional fields in your AsyncAPI document. For example, for <a href= "https://github.com/asyncapi/bindings/tree/master/kafka">configuring Kafka bindings</a>.
</Remember>

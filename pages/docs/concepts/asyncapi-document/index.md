---
title: 'Introduction'
weight: 50
---

The AsyncAPI Specification defines a set of files required to describe the API of an application. One of those files is the AsyncAPI document; it describes the message-driven API in accordance with the AsyncAPI Specification via JSON objects that conform to the JSON standards. (YAML, being a superset of JSON, can also be used.) The AsyncAPI document offers a standardized approach for documenting and describing asynchronous and event-driven systems, clearly defining various components like channels and messages. Additionally, users can leverage both the AsyncAPI document and tools like the AsyncAPI Generator for code and documentation generation, enhancing efficiency and consistency in their development processes.

Furthermore, the AsyncAPI document acts as a communication contract between `receivers` and `senders` within an event-driven system. It specifies the payload content required when a service produces a message and offers clear guidance to the receiver regarding the message's properties.

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
operations: 
  userSignedUp:
    action: send
    channel: 
      $ref: '#/channels/userSignedUp'
```

<Remember>
You might have additional fields depending on the implemented protocol (i.e., MQTT, AMQP, Kafka, etc.). 
  
For example, your AsyncAPI document could have additional fields for <a href= "https://github.com/asyncapi/bindings/tree/master/kafka#server-binding-object">configuring Kafka bindings</a>.
</Remember>

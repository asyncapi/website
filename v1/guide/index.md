---
title: Introduction
type: guide
order: 1
---

The [AsyncAPI specification](https://github.com/asyncapi/asyncapi) allows you to create machine-readable definitions of your asynchronous APIs. It's protocol-agnostic, so you can use it for APIs that work over MQTT, AMQP, WebSockets, STOMP, etc. The specification is heavily inspired on [OpenAPI](https://github.com/OAI/OpenAPI-Specification) (fka Swagger) and it's designed to maintain as much compatibility as possible with it.

## A basic example

```yaml
asyncapi: '1.0.0'
info:
  title: Streetlights API
  version: '1.0'
  description: |
    The Smartylighting Streetlights API allows you
    to remotely manage the city lights.
  license:
    name: Apache 2.0
    url: 'https://www.apache.org/licenses/LICENSE-2.0'
baseTopic: smartylighting.streetlights.1.0

servers:
  - url: api.streetlights.smartylighting.com:{port}
    scheme: mqtt
    description: Test broker
    variables:
      port:
        description: Secure connection (TLS) is available through port 8883.
        default: '1883'
        enum:
          - '1883'
          - '8883'

topics:
  event.{streetlightId}.lighting.measured:
    publish:
      $ref: '#/components/messages/lightMeasured'

components:
  messages:
    lightMeasured:
      summary: Inform about environmental lighting conditions for a particular streetlight.
      payload:
        $ref: "#/components/schemas/lightMeasuredPayload"

  schemas:
    lightMeasuredPayload:
      type: object
      properties:
        lumens:
          type: integer
          minimum: 0
          description: Light intensity measured in lumens.
        sentAt:
          $ref: "#/components/schemas/sentAt"
    sentAt:
      type: string
      format: date-time
      description: Date and time when the message was sent.
```

This example describes a very basic streetlights service. It says there's a service you can connect at `api.streetlights.smartylighting.com` (port 1883 or 8883) and it allows you to publish information about environmental lighting conditions.
Afterwards, the service might decide to turn on or off certain lights or it might simply log it for statistics. Or both! That's up to your implementation.

If you are familiar with the OpenAPI specification I'm sure you already found lots of similarities. But, what's this `topics` section in the file? And what's this `event.{streetlightId}.lighting.measured`? Let's dive into it!

## Core concepts

The AsyncAPI specification is based on the assumption of 2 core concepts:

### Messages

The way a consumer(s) can communicate with your API is based on messages. A message is a piece of information two or more programs exchange. Most of the times to notify the other end(s) that, either an event has occurred or you want them to perform an action.
 Technically speaking the events and actions will always be sent in the same way. These are just messages and their content can be anything. So when we speak about the difference between events and actions, this is just a semantic differentiation of message's content. We do not enforce you to make any difference between them, although we encourage you to do it.
A message can contain headers and a payload, however both are optional. To remain as much protocol-agnostic as possible, the specification allows you to define any kind of header.

### Topics

Message-driven protocols usually contain something that can be found as topic ([MQTT](http://www.hivemq.com/blog/mqtt-essentials-part-5-mqtt-topics-best-practices)), routing key (AMQP), destination (STOMP), etc. To some extent, they can compare to URLs in HTTP APIs. So when you send a message to your API it will be routed depending on the topic you published on. It allows you to create APIs that subscribe to certain topics and publish to other ones.
There's no standard way of naming topics so we recommend you to **[have a look at our proposal here](https://github.com/asyncapi/topic-definition)**.
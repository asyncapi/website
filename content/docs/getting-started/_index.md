---
title: "Getting started"
date: 2019-02-16T13:56:52+01:00
categories:
- getting-started
aliases:
- '/v1/guide/'
- '/v1/guide/index.html'
---

AsyncAPI provides a specification that allows you to define Message-Driven APIs in a machine-readable format. It’s protocol-agnostic, so you can use it for APIs that work over Kafka, MQTT, AMQP, WebSockets, STOMP, etc. The spec is very similar to [OpenAPI/Swagger](https://github.com/OAI/OpenAPI-Specification) so, if you’re familiar with it, AsyncAPI should be easy for you.

# A basic example

The following example describes a very simple streetlights service. It describes a service you can connect at `api.streetlights.smartylighting.com` (port 1883 or 8883) and allows you to publish information about environmental lighting conditions.

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
        type: object
        properties:
          lumens:
            type: integer
            minimum: 0
            description: Light intensity measured in lumens.
          sentAt:
            $ref: "#/components/schemas/sentAt"

  schemas:
    sentAt:
      type: string
      format: date-time
      description: Date and time when the message was sent.
```

If you are familiar with the OpenAPI specification, I’m sure you already found lots of similarities. But, what’s this `topics` section in the file? And what’s this `event.{streetlightId}.lighting.measured`? Let’s dive into it!

# Core concepts

The AsyncAPI specification assumes two core concepts:

## 1. Messages

Consumer(s) communicate with your API via messages. A message is a piece of information two or more programs exchange. Most of the times to notify the other end(s) that, either an event has occurred or you want to trigger a command.

Technically speaking the events and actions will always be sent in the same way. These are just messages, and their content can be anything. So when we talk about the difference between events and actions, this is only a semantic differentiation of message’s content. We do not enforce you to make any difference between them, although we encourage you to do it.

A message can contain headers and a payload. However, both are optional. The specification allows you to define any header, to remain as much protocol-agnostic as possible.

## 2. Topics

Message-driven protocols usually contain something called topic ([MQTT](http://www.hivemq.com/blog/mqtt-essentials-part-5-mqtt-topics-best-practices)), routing key (AMQP), destination (STOMP), etc. To some extent, they can compare to URLs in HTTP APIs. So, when you send a message to your API, it will be routed depending on the topic you published on. This feature allows you to create APIs that subscribe to specific topics and publish to other ones.

There’s no standard way of naming topics, so we recommend you to **[have a look at our proposal here](https://github.com/asyncapi/topic-definition)**.

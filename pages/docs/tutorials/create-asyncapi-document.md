---
title: Streetlights - Create an AsyncAPI Document
description: In this tutorial, you'll learn how to create an AsyncAPI document.
weight: 120
---

# Introduction

In this tutorial, you'll learn how to create an AsyncAPI document based on a sample real-world use case. Additionally, you will learn about event-driven architecture, message brokers, pub/sub pattern.

Let's pretend you have a company called Smarty Lighting, and you install smart-city streetlight lighting systems. This smart lighting system is a use case of the Internet of things (IoT).You will create a Smartylighting Streetlights API using Node.js and Mosquitto (MQTT) as the message broker. This API will allow you to manage city lights remotely. 

You want to build a system that can turn streetlights on and off based on their environmental conditions: 

- You will implement an event-driven architecture (EDA) with a message broker in its "center."

- Streetlights will publish information about their environmental lighting to the broker.

- Your application will connect to the broker and receive a stream of events from all the streetlights reporting their conditions.

- Your application decides based on events when to turn the streetlight off.

- Your application is not aware of how many streetlights are publishing events - it just connects to the broker and receives all events.


# Background Context

Event-driven architecture (EDA) is a design pattern built around the production, detection, and reaction to events that take place in time. In this pattern, a message broker, event publishers and subscribers are its main components for event exchange within microservices.

[Message brokers](https://deploy-preview-601--asyncapi-website.netlify.app/docs/tutorials/getting-started/event-driven-architectures#message-broker) enables asynchronous communications between services so that the sending service need not wait for the receiving service’s reply. This allows interdependent services to “talk” with one another directly, even if they were written in different languages or implemented on different platforms. 

Futhermore, the [Pub/sub](https://deploy-preview-601--asyncapi-website.netlify.app/docs/tutorials/getting-started/event-driven-architectures#publishersubscriber) is appealing for IoT use cases due to two key features: support for flexible coupling between publishers/subscribers and inherent support for point-to-multipoint transmission.  

[MQTT](https://mqtt.org/), is a well-known protocol that is widely used in IoT applications because it was created particularly to address machine-to-machine (M2M) communication.

# Installation Guide

You'll use Node.js to code the APIs and [Mosquitto](https://mosquitto.org/) MQTT service as the message broker. The selected technology is irrelevant here, since everything explained in this tutorial is applicable to any other programming language and message brokers.

Before you proceed to the next stage, you'll need to download a few things:

1. Install [Node.js](https://nodejs.org/en/download/) (v15 or newer).

2. Install Git on your Operating System:
    - [Install Git on MacOs](https://git-scm.com/download/mac)
    - [Install Git on Windows](https://git-scm.com/download/win)
    - [Install Git on Linux](https://git-scm.com/download/linux)

# Create the AsyncAPI Document

In this step, we will create an AsyncAPI document to describe the Streelights API. It will help you generate the code and the documentation later on.

To create one, you can either use the [AsyncAPI studio](https://studio.asyncapi.com) or the [AsyncAPI CLI](https://github.com/asyncapi/cli) depending on your project need.

Let's go ahead to create the specification documents titled `asyncapi` with a `.yaml` extension.

<CodeBlock>
{`asyncapi: '2.5.0'
info:
  title: Streetlights API
  version: '1.0.0'
  description: |
    The Smartylighting Streetlights API allows you
    to remotely manage the city lights.
  license:
    name: Apache 2.0
    url: 'https://www.apache.org/licenses/LICENSE-2.0'
servers:
  mosquitto:
    url: mqtt://test.mosquitto.org
    protocol: mqtt
channels:
  light/measured:
    publish:
      summary: Inform about environmental lighting conditions for a particular streetlight.
      operationId: onLightMeasured
      message:
        name: LightMeasured
        payload:
          type: object
          properties:
            id:
              type: integer
              minimum: 0
              description: Id of the streetlight.
            lumens:
              type: integer
              minimum: 0
              description: Light intensity measured in lumens.
            sentAt:
              type: string
              format: date-time
              description: Date and time when the message was sent.`}
</CodeBlock>

Let's break it down into pieces:

<CodeBlock>
{`asyncapi: '2.5.0'
info:
  title: Streetlights API
  version: '1.0.0'
  description: |
    The Smartylighting Streetlights API allows you
    to remotely manage the city lights.
  license:
    name: Apache 2.0
    url: 'https://www.apache.org/licenses/LICENSE-2.0'`}
</CodeBlock>

- The `asyncapi` field indicates you use the AsyncAPI version 2.5.0.

- The `info` field holds information about the Streetlights API. Here we defined its title, version, description and license.

Moving on, tet's talk about the `servers` section.
<CodeBlock>
{`servers:
  mosquitto:
    url: mqtt://test.mosquitto.org
    protocol: mqtt`}
</CodeBlock> 

This is the section we defined the mosquitto message broker. The `url` object defines that of Mosquitto and the `protocol` as MQTT.

Now lets move on to the `channels` section. This section is used to describe the event names your API will be publishing and/or subscribing to.

<CodeBlock>
{`channels:
  light/measured:
    publish:
      summary: Inform about environmental lighting conditions for a particular streetlight.
      operationId: onLightMeasured`}
</CodeBlock>

In this example, `light/measured` is the channel name the Streetlight API will `subscribe` to (i.e, to interact with the Streetlight API you `publish` to the broker). The `operationId` property, describes what is the name of function or method that takes care of this functionality in the generated code.

Next is the `payload` property which is used to understand how the event should look like when publishing to that channel:

<CodeBlock>
{`      payload:
        type: object
        properties:
          id:
            type: integer
            minimum: 0
            description: Id of the streetlight.
          lumens:
            type: integer
            minimum: 0
            description: Light intensity measured in lumens.
          sentAt:
            type: string
            format: date-time
            description: Date and time when the message was sent.`}
</CodeBlock>

The `payload` property defines the content of the event using AsyncAPI schemas. It means that your event payload should contain an `id` and a `lumens` property —which are integers bigger than zero—, and a `sentAt` property that should be a string containing a date and time.

> JSON Schema Draft 07 is 100% compatible with AsyncAPI schemas.

# Summary

In this tutorial, we learned how to create an AsyncAPI specification document in a real-life example i.e IoT use case.

This tutorial is only a bootstrap; you'll need to add your own business logic into it. Take some time to play with it. There are still lots of things to be covered, but the intent of this tutorial is to make it simple for you to get an idea of the potential.

# Next steps
Now that you've completed this tutorial, let's learn how to [generate code]() from our specification document using the AsyncAPI generator.


---

<DocsButton
  suggestions={[
    {
      href: '/docs/tutorials',
      title: 'Tutorials - Overview',
      type:'back',
    },
    {
      href: '/docs/tutorials/streetlights-interactive',
      title: 'Streetlights - Interactive (Alpha)',
      type:'next',
    }
  ]}
/>

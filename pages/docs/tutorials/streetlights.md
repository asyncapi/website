---
title: Streetlights
description: In this tutorial, you'll start with IoT code samples and pretend you have a company called Smarty Lighting that engineers smart-city lighting systems.

---

# Introduction

In this tutorial, you get started with actual code and a sample real-world use case. Let's pretend you have a company called Smarty Lighting, and you install smart-city streetlight lighting systems. This smart lighting system is a use case of the Internet of things (IoT).


You will create a Smartylighting Streetlights API using Node.js and Mosquitto as the message broker. This API will allow you to manage city lights remotely. 


You want to build a system that can turn streetlights on and off based on their environmental conditions: 

- You will implement an event-driven architecture (EDA) with a Message Broker in its "center."

- Streetlights will publish information about their environmental lighting to the broker.
- Your application will connect to the broker and receive a stream of events from all the streetlights reporting their conditions.

- Your application decides based on events when to turn the streetlight off.

- Your application is not aware of how many streetlights are publishing events - it just connects to the broker and receives all events.


You will learn about event-driven architecture, message brokers, pub/sub architecture, and creating an AsyncAPI file to describe your API and generate code from it.


# Background Context

Event-driven architecture (EDA) is a design pattern built around the production, detection, and reaction to events that take place in time.
[Message brokers](https://deploy-preview-601--asyncapi-website.netlify.app/docs/tutorials/getting-started/event-driven-architectures#message-broker) enable asynchronous communications between services so that the sending service need not wait for the receiving service’s reply. This allows interdependent services to “talk” with one another directly, even if they were written in different languages or implemented on different platforms. 

In this tutorial, we'll look at an IoT use case: a Smart-City street lighting system. [Pub/sub](https://deploy-preview-601--asyncapi-website.netlify.app/docs/tutorials/getting-started/event-driven-architectures#publishersubscriber) is appealing for IoT use cases due to two key features: support for flexible coupling between publishers/subscribers and inherent support for point-to-multipoint transmission.  [MQTT](https://mqtt.org/) and DDS are two well-known protocols that are widely used in IoT applications.

# Installation Guide

You'll use Node.js to code the APIs and [Mosquitto](https://mosquitto.org/) as the message broker. The selected technology is irrelevant here, since everything explained in this tutorial is applicable to any other programming language and message brokers.

Before you proceed to the next stage, you'll need to download a few things:

1. Install [Node.js](https://nodejs.org/en/download/) (v15 or newer).

2. Install Git based on your Operating System:
    - [Install Git on MacOs](https://git-scm.com/download/mac)
    - [Install Git on Windows](https://git-scm.com/download/win)
    - [Install Git on Linux](https://git-scm.com/download/linux)

# Creating the AsyncAPI file

In this step, we will create an AsyncAPI file to describe your API. It will help you generate the code and the documentation later on.

<CodeBlock>
{`asyncapi: '2.4.0'
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
{`asyncapi: '2.4.0'
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

- The `asyncapi` field indicates you use the AsyncAPI version 2.4.0.
- The `info` field holds information about the API, such as its name, version, description, and license.

Now lets move all the way to the `channels` section. This section is used to describe the event names your API will be publishing and/or subscribing to.

<CodeBlock>
{`channels:
  light/measured:
    publish:
      summary: Inform about environmental lighting conditions for a particular streetlight.
      operationId: onLightMeasured`}
</CodeBlock>

In this example, `light/measured` is the channel name the Streetlight API will `subscribe` to (i.e, to interact with the Streetlight API you `publish` to the broker). The `operationId` property, describes what is the name of function or method that takes care of this functionality in the generated code. The `payload` property is used to understand how the event should look like when publishing to that channel:

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

The `Payload` property defines the content of the event using AsyncAPI schemas. It means that your event payload should contain an `id` and a `lumens` property —which are integers bigger than zero—, and a `sentAt` property that should be a string containing a date and time.

> JSON Schema Draft 07 is 100% compatible with AsyncAPI schemas.

Cool! You're done with your AsyncAPI file! Now let's get into generating code.

# Generating code

In this step, we will generate your code, you'll use the [AsyncAPI Generator](https://github.com/asyncapi/generator) Node.js template.

### 1. Install the generator to use it as a command-line tool
<CodeBlock language="bash">
{`npm install -g @asyncapi/generator`}
</CodeBlock>

### 2. Create a directory for your projects and enter it:
<CodeBlock language="bash">
{`mkdir streetlights && cd "$_"`}
</CodeBlock>

### 3. Create a file with the AsyncAPI machine-readable description you defined before using terminal. The `cat` command is a utility command in Linux. On Windows use `type` instead of `cat`:
<CodeBlock language="yaml">
{`cat <<EOT >> asyncapi.yaml
asyncapi: '2.4.0'
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
              description: Date and time when the message was sent.
EOT`}
</CodeBlock>

### 4. Trigger generation of the Node.js code:
<CodeBlock language="bash">
{`ag asyncapi.yaml @asyncapi/nodejs-template -o output -p server=mosquitto`}
</CodeBlock>

### 5. And voilà! List all files in directory and check that Node.js application is generated:
<CodeBlock language="bash">
{`cd output && ls`}
</CodeBlock>

# Running your code

### 1. Install dependencies of newly generated application:
<CodeBlock language="bash">
{`npm install`}
</CodeBlock>

### 2. Start the application:
<CodeBlock language="bash">
{`npm start`}
</CodeBlock>

### 3. In another terminal start MQTT broker:
<CodeBlock language="bash">
{`docker run -it -p 1883:1883 eclipse-mosquitto:1.5`}
</CodeBlock>

### 4. In another terminal install the MQTT.js library:
<CodeBlock language="bash">
{`npm install mqtt -g`}
</CodeBlock>

### 5. Send a correct message to your application:
<CodeBlock language="bash">
{`mqtt pub -t 'light/measured' -h 'test.mosquitto.org' -m '{"id": 1, "lumens": 3, "sentAt": "2017-06-07T12:34:32.000Z"}'`}
</CodeBlock>

### 6. Send an incorrect message to your application:
<CodeBlock language="bash">
{`mqtt pub -t 'light/measured' -h 'test.mosquitto.org' -m '{"id": 1, "lumens": "3", "sentAt": "2017-06-07T12:34:32.000Z"}'`}
</CodeBlock>

### 7. Go back to the previous terminal and check if your application logged the streetlight condition you just sent, with errors related to the invalid message.

# Summary

In this tutorial, we learned how to create an AsyncAPI description file and how to generate our API code from the [AsyncAPI Generator](https://github.com/asyncapi/generator), by using Node.js and Mosquitto as the message broker. We also learned how to implement the event-driven architecture in a real-life example, using pub/sub architecture to send a message to our application with an MQTT and Mosquitto message broker.

Today's sample code is only a bootstrap; you'll need to add your own business logic into it. Take some time to play with it. There are still lots of things to be covered, but the intent of this tutorial is to make it simple for you to get an idea of the potential.

We would love to see what you create with AsyncAPI! As an open-source project, we're open to proposals, questions, suggestions, and contributions. If you don't feel in the mood to contribute but you're using AsyncAPI, just raise your hand by [creating an issue in our Github repo](https://github.com/asyncapi/asyncapi/issues/new) or [join our Slack channel](https://www.asyncapi.com/slack-invite/). Don't be shy.

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

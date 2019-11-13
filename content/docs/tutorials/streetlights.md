---
title: "Streetlights"
date: 2019-02-16T17:41:57+01:00
menu:
  docs:
    name: Streetlights
    parent: tutorials
aliases:
- '/v1/tutorial/'
categories:
- tutorials
---

In this tutorial I want to help you get started with actual code and a (could-be) real world use case. <!--more-->
Let's pretend we have a company called Smarty Lighting and we do smart-city lighting systems.

# System Description

We want to create a system capable of turning on/off the streetlights depending on the environmental conditions of each of them:

- We're going to implement a event-driven architecture, with a Message Broker in its "center".
- Streetlights will send information about its environmental lighting to the broker.
- None of the services will wait for any kind of response. Think about it as fire and forget. We'll publish messages to the broker and that's it. Our service don't know who will receive them.

# Technology

We'll use Node.js to code our APIs and Mosquitto as our message broker. Please note this is just my choice for the tutorial but what is going to be explained here is applicable to any other programming language and message brokers.

# The AsyncAPI file

Let's start by creating an AsyncAPI file to describe our API. It will help us generate the code and the documentation later.

```yaml
asyncapi: '2.0.0'
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
```

Let's break it down into pieces:

```yaml
asyncapi: '2.0.0'
info:
  title: Streetlights API
  version: '1.0.0'
  description: |
    The Smartylighting Streetlights API allows you
    to remotely manage the city lights.
  license:
    name: Apache 2.0
    url: 'https://www.apache.org/licenses/LICENSE-2.0'
```

- The `asyncapi` field indicates we want to use AsyncAPI version 2.0.0.
- Inside the `info` field we can find information about the API, like its name, version, a description and its license.

We're now going for the channels section. It is used to describe the event names your API will be publishing and/or subscribing to.

```yaml
channels:
  light/measured:
    publish:
      summary: Inform about environmental lighting conditions for a particular streetlight.
      operationId: onLightMeasured
```

In this example, `light/measured` is the channel name your API will allow you to `publish` to. The `operationId` property, describes what will be the name of function or method that will take care of this functionality in the case we generate code (which is the case). To understand how the event should look like when publishing to that channel, there is the `payload` property:

```yaml
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
```

It defines the content of the event using AsyncAPI schemas. It means that our event payload should contain an `id` and a `lumens` property —which are integers bigger than zero—, and a `sentAt` property that should be a string containing a date and time.

> JSON Schema Draft 07 is 100% compatible with AsyncAPI schemas.

Cool! So we're done with our AsyncAPI file! Let's get into generating code.

# Generating code

To generate our code we'll use the [AsyncAPI Generator](https://github.com/asyncapi/generator) Node.js template.

```bash
npm install -g asyncapi-generator
```

(You might need to use sudo)

Create a directory for your projects and step into it:

```bash
mkdir streetlights && cd "$_"
```

Create a file with the AsyncAPI machine-readable description we created before:

```bash
touch asyncapi.yaml
# Open asyncapi.yaml and paste the definition
```

And now let's generate the code for it:
```bash
ag asyncapi.yaml nodejs -p server=mosquitto
```

And voilà!

# Running our code

Before running your code don't forget to install the dependencies on every project:

```bash
npm install
```

Run the code:

```bash
npm start
```

Now that you have your code running you'll want to test it, right? Go and install the mqtt library:

```bash
npm install mqtt -g
```

(You might need to use sudo)

Try to send messages to your service using the command line:

```bash
mqtt pub -t 'light/measured' -h 'test.mosquitto.org' -m '{"id": 1, "lumens": 3, "sentAt": "2017-06-07T12:34:32.000Z"}'
```

You should see our application logging the message you just sent.

# Conclusions

We've learned how to create an AsyncAPI description file and how to generate code from it. The code is just a bootstrap and you'll need to add your business logic into it. Take some time to play with it.
There are still lots of things to be covered but I kept the tutorial simple on purpose, so you get an idea of the potential.

We would also like to see what you create with AsyncAPI. As an open-source project we're open to proposals, questions, suggestions and contributions. If you don't feel in the mood to contribute but you're using AsyncAPI, just raise your hand [creating a issue in our Github repo](https://github.com/asyncapi/asyncapi/issues/new) or [join our Slack channel](https://async-apis-slack.herokuapp.com/). Don't be shy :)
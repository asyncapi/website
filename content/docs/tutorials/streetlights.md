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

In this tutorial, you get started with actual code and a (could-be) real-world use case. <!--more-->
Let's pretend you have a company called Smarty Lighting and you do smart-city lighting systems.

# System Description

You want to create a system capable of turning on/off the streetlights depending on the environmental conditions of each of them:

- You're going to implement an event-driven architecture, with a Message Broker in its "center".
- Streetlights will send information about its environmental lighting to the broker.
- None of the services waits for any kind of response. Think about it as _fire and forget_. You publish messages to the broker and that's it. Your service doesn't know who receives them.

# Technology

You'll use Node.js to code APIs and Mosquitto as the message broker. Selected technology is irrelevant here, as things explained here in this tutorial are applicable to any other programming language and message brokers.

# The AsyncAPI file

Let's start by creating an AsyncAPI file to describe your API. It will help you generate the code and the documentation later.

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

- The `asyncapi` field indicates you use AsyncAPI version 2.0.0.
- Inside the `info` field you find information about the API, like its name, version, description, and its license.

We're now going for the `channels` section. It is used to describe the event names your API will be publishing and/or subscribing to.

```yaml
channels:
  light/measured:
    publish:
      summary: Inform about environmental lighting conditions for a particular streetlight.
      operationId: onLightMeasured
```

In this example, `light/measured` is the channel name your API `publish` to. The `operationId` property, describes what will be the name of function or method that takes care of this functionality in generated code. To understand how the event should look like when publishing to that channel, there is the `payload` property:

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

`Payload` property defines the content of the event using AsyncAPI schemas. It means that your event payload should contain an `id` and a `lumens` property —which are integers bigger than zero—, and a `sentAt` property that should be a string containing a date and time.

> JSON Schema Draft 07 is 100% compatible with AsyncAPI schemas.

Cool! So you're done with your AsyncAPI file! Let's get into generating code.

# Generating code

To generate your code you'll use the [AsyncAPI Generator](https://github.com/asyncapi/generator) Node.js template.

1. Install the generator to use is at a command-line tool
    ```bash
    npm install -g asyncapi-generator
    ```

2. Create a directory for your projects and enter it:
    ```bash
    mkdir streetlights && cd "$_"
    ```
3. Create a file with the AsyncAPI machine-readable description you defined before:
    ```bash
    cat <<EOT >> asyncapi.yaml
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
    EOT
    ```
4. Trigger generation of the Node.js code:
    ```bash
    ag asyncapi.yaml nodejs -p server=mosquitto
    ```
5. And voilà! List all files in directory and notice that Node.js application is generated:
    ```bash
    ls
    ```

# Running our code

1. Install dependencies of newly generated application:
    ```bash
    npm install
    ```
2. Start the application:
    ```bash
    npm start
    ```
3. In another terminal install the MQTT.js library:
    ```bash
    npm install mqtt -g
    ```
4. Send message to your application:
    ```bash
    mqtt pub -t 'light/measured' -h 'test.mosquitto.org' -m '{"id": 1, "lumens": 3, "sentAt": "2017-06-07T12:34:32.000Z"}'
    ```
5. Go back to previous terminal and notice that your application logs the message you just sent.

# Conclusions

You've learned how to create an AsyncAPI description file and how to generate code from it. The code is a bootstrap and you'll need to add your business logic into it. Take some time to play with it.
There are still lots of things to be covered but intent of this tutorial is to be simple so you get an idea of the potential.

We would also like to see what you create with AsyncAPI. As an open-source project, we're open to proposals, questions, suggestions, and contributions. If you don't feel in the mood to contribute but you're using AsyncAPI, just raise your hand [creating a issue in our Github repo](https://github.com/asyncapi/asyncapi/issues/new) or [join our Slack channel](https://www.asyncapi.com/slack-invite/). Don't be shy :)
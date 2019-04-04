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

- We're going to implement a message-driven architecture, with a Message Broker in its "center".
- Streetlights will send information about its environmental lighting to the broker.
- None of the services will wait for any kind of response. Think about it as fire and forget. We'll publish messages to the broker and that's it. Our service don't know who will receive them.

# Technology

We'll use Node.js to code our APIs and Mosquitto as our message broker. Please note this is just my choice for the tutorial but what is going to be explained here is applicable to any other programming language and other message brokers.

# The AsyncAPI file

Let's start by creating an AsyncAPI file to describe our API. It will help us generate the code and the documentation later.

```yaml
asyncapi: '1.0.0'
info:
  title: Streetlights API
  version: '1.0.0'
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

Let's break it down into pieces:

```yaml
asyncapi: '1.0.0'
  info:
    title: Streetlights API
    version: '1.0.0'
    description: |
      The Smartylighting Streetlights API allows you
      to remotely manage the city lights.
    license:
      name: Apache 2.0
      url: 'https://www.apache.org/licenses/LICENSE-2.0'
  baseTopic: smartylighting.streetlights.1.0
```

- The `asyncapi` field indicates we want to use AsyncAPI version 1.0.0.
- Inside the `info` field we can find information about the API, like its name, version, a description and its license.
- The `baseTopic` field is a string that will be prepended to the topics we'll be defining afterwards. It is optional.

We're now going for the topics section. It is used to describe the event names or action names your API will be publishing and/or subscribing to.

```yaml
topics:
  event.{streetlightId}.lighting.measured:
    publish:
      $ref: '#/components/messages/lightMeasured'
```

Here `event.{streetlightId}.lighting.measured` is the topic name your API will allow you to publish to. The `{streetlightId}` part is a variable and it means you can actually specify whatever there. Remember the baseTopic we mentioned before? Well, it means that your API will actually be subscribed to `smartylighting.streetlights.1.0.event.{streetlightId}.lighting.measured`, but to avoid repeating the first part in every topic we decided to move it to the baseTopic field.

Something we should take into account when we see `$ref: '#/components/messages/turnOnOff'` is that `$ref` references a URL. This means that `#` refers to our document (like in websites), but it could be a URL pointing to an external file.

Next up is our components section:

```yaml
components:
  messages:
    ...

  schemas:
    ...
```

The components section can contain messages, schemas and security schemes - we're not using security schemes for simplicity. In the messages subsection we'll define how our messages will look like and, in the schemas section, we'll put reusable pieces of the data the messages will contain.

```yaml
components:
  messages:
    lightMeasured:
      summary: Inform about environmental lighting conditions for a particular streetlight.
      payload:
        $ref: "#/components/schemas/lightMeasuredPayload"
```

Here we're describing the a message that we're going to use for our example. A message can contain a summary, a description, a payload, etc. [Learn more here.](https://github.com/asyncapi/asyncapi#messageObject)

Let's pay special attention to the payload attribute, which references a schema defining how the message data is structured.

```yaml
components:
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

It will be an object containing 2 properties: lumens and sentAt. The former is a number describing the light intensity and the second is a date-time string indicating when the message was sent. We can describe much more things using the JSON schema syntax, [check out here](https://github.com/asyncapi/asyncapi#schemaObject).

Cool! So we're done with our AsyncAPI file!

# Generating code

To generate our code we'll use the [AsyncAPI Node.js code generator](https://www.npmjs.com/package/asyncapi-node-codegen).

```bash
npm install -g asyncapi-node-codegen
```

(You might need to use sudo)

Create a directory for your projects and step into it:

```bash
mkdir streetlights && cd "$_"
```

Create a file with the AsyncAPI machine-readable description we created before:

```bash
touch asyncapi.yml
# Open asyncapi.yml and paste the definition
```

And now let's generate the code for it:
```bash
asyncapi-node-codegen asyncapi.yml .
```

And voilà!

# Running our code

Before running your code don't forget to install the dependencies on every project:

```bash
npm install
```

Then go to `config/common.yml` and change the default mqtt host to `mqtt://test.mosquitto.org` and default mqtt topics to `smartylighting/streetlights/1/0/event/#`.

Finally you can run the code by simply running `npm start`.

Now that you have your code running you'll want to test it, right? Go and install the mqtt library:

```bash
npm install mqtt -g
```

(You might need to use sudo)

Try to send messages to your service using the command line:

```bash
mqtt pub -t 'smartylighting/streetlights/1/0/event/farolina/lighting/measured' -h 'test.mosquitto.org' -m '{"lumens": 3, "sentAt": "2017-06-07T12:34:32.000Z"}'
```

You should see our application logging the message you just sent.

# Conclusions

We've learned how to create an AsyncAPI description file and how to generate code from it. The code is just a bootstrap and you'll need to add your business logic into it. Take some time to play with it.
There are still lots of things to be covered but I kept the tutorial simple on purpose, so you get an idea of the potential.

We would also like to see what you create with AsyncAPI. As an open-source project we're open to proposals, questions, suggestions and contributions. If you don't feel in the mood to contribute but you're using AsyncAPI, just raise your hand [creating a issue in our Github repo](https://github.com/asyncapi/asyncapi/issues/new) or [join our Slack channel](https://async-apis-slack.herokuapp.com/). Don't be shy :)
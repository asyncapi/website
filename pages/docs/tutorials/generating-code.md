---
title: Streetlights - Generating Code 
description: In this tutorial, you'll learn how to generate your code from an AsyncAPI document.
weight: 130
---

# Introduction

In this tutorial, you'll learn how to generate your code from an AsyncAPI document using the AsyncAPI generator

# Background Context
The [AsyncAPI Generator](https://github.com/asyncapi/generator) tool is used to create the documentation from the specification file. It is built in JavaScript and can be accessible using npm or Docker. 

The generator tool supports a number of templates to generate code for a variety of different languages and protocols as the output. These templates helps to specify what exactly must be generated and for this tutorial, a Nodejs template will be specified.

# Installation Guide
Before proceeding to the next step, make sure the following are still actively installed on your local PC:

1. Install [Node.js](https://nodejs.org/en/download/) (v15 or newer).

2. Install Git on your Operating System:
    - [Install Git on MacOs](https://git-scm.com/download/mac)
    - [Install Git on Windows](https://git-scm.com/download/win)
    - [Install Git on Linux](https://git-scm.com/download/linux)

# Generating code

In this section, we will go ahead with the steps to enable us generate our code from the document;

### 1. Install the generator to use it as a command-line(CLI) tool
<CodeBlock language="bash">
{`npm install -g @asyncapi/generator`}
</CodeBlock>

The command above helps install the generator tool globally.

### 2. Create a directory for your projects and enter it:
<CodeBlock language="bash">
{`mkdir streetlights && cd "$_"`}
</CodeBlock>

### 3. Create a file with the AsyncAPI machine-readable description you defined before using terminal. 
The `cat` command below is a utility command in Linux. On Windows use `type` instead of `cat`:
<CodeBlock language="yaml">
{`cat <<EOT >> asyncapi.yaml
asyncapi: '2.5.0'
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

From the command above, the `-o` specifies where to output the result.

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

### 3. In another terminal install the MQTT.js library:
<CodeBlock language="bash">
{`npm install mqtt -g`}
</CodeBlock>

### 4. Send a correct message to your application:
<CodeBlock language="bash">
{`mqtt pub -t 'light/measured' -h 'test.mosquitto.org' -m '{"id": 1, "lumens": 3, "sentAt": "2017-06-07T12:34:32.000Z"}'`}
</CodeBlock>

### 5. Send an incorrect message to your application:
<CodeBlock language="bash">
{`mqtt pub -t 'light/measured' -h 'test.mosquitto.org' -m '{"id": 1, "lumens": "3", "sentAt": "2017-06-07T12:34:32.000Z"}'`}
</CodeBlock>

### 6. Go back to the previous terminal and check if your application logged the streetlight condition you just sent, with errors related to the invalid message.


# Summary

In this tutorial, we learned how to generate our code from the Streetlights API specification document created in the [previous tutorial]() using the AsyncAPI generator tool. 

Additionally, we learnt how to run our code by installing the generated code's dependencies and sending several test messages to the Streelights application using the MQTT library.


# Next steps
Now that you've completed this tutorial, let's learn how to [validate]() our code through the validation techniques supported by AsyncAPI.


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

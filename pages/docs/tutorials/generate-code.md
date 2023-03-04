---
title: Generate code 
description: In this tutorial, you'll learn how to generate code from your AsyncAPI document.
weight: 100
---

## Introduction

In this tutorial, you'll learn how to generate code from your AsyncAPI document using the AsyncAPI generator tool.

## Background context
The [AsyncAPI Generator](https://github.com/asyncapi/generator) is a tool that you can use to generate whatever you want based on the AsyncAPI document. You can generate docs and code. It can be used as a library in a Node.js application or through the [AsyncAPI CLI](https://github.com/asyncapi/cli).

The generator tool supports a number of templates to generate code for a variety of different languages and protocols as the output. These templates help to specify what exactly must be generated, and in this tutorial, you'll use a [Node.js template](https://github.com/asyncapi/nodejs-template).

## Installation guide
<Remember>

It is important to have [Node.js](https://nodejs.org/en/download/) installed which will enable the installation of the required dependencies using <b>npm</b>.

</Remember>

import CliInstallation from '../../../assets/docs/fragments/cli-installation.md' 

<CliInstallation/>

## Generate code

To generate code from the [AsyncAPI document created in a previous tutorial](https://asyncapi.com/docs/tutorials/create-asyncapi-document), follow the steps listed below:

<Remember>

If you did not follow the previous tutorial and do not have an `asyncapi.yaml` file ready, generate one running `asyncapi new --example=tutorial.yml --no-tty`.

</Remember>

1. Trigger generation of the Node.js code:
    <CodeBlock language="bash">
    {`asyncapi generate fromTemplate asyncapi.yaml @asyncapi/nodejs-template -o output -p server=mosquitto`}
    </CodeBlock>

    Let's break down the previous command:
    - `asyncapi generate fromTemplate` is how you use AsyncAPI Generator via the AsyncAPI CLI. 
    - ` asyncapi.yaml` is how you point to your AsyncAPI document and can be a URL. 
    - `@asyncapi/nodejs-template` is how you specify the Node.js template.
    - `-o` determines where to output the result.
    - `-p` defines additional parameters you want to pass to the template. Here, the `server` parameter specifies the server's name as it is defined in AsyncAPI document.

2. List all files in directory and check that the Node.js application is generated:
    <CodeBlock language="bash">
    {`cd output && ls`}
    </CodeBlock>

    Upon execution of the command above, the following is an example of the expected result:
    <CodeBlock language="bash">
    {`$ ls
    Dockerfile
    asyncapi.yaml
    docs
    src
    README.md
    config
    package.json`}
    </CodeBlock>

## Start generated application
1. Install dependencies of the newly generated application:
    <CodeBlock language="bash">
    {`npm install`}
    </CodeBlock>

2. Start the application:
    <CodeBlock language="bash">
    {`npm start`}
    </CodeBlock>

## Send message to broker
1. In another terminal install the MQTT.js library:
    <CodeBlock language="bash">
    {`npm install mqtt -g`}
    </CodeBlock>

2. Send a message to the MQTT broker that's connected to your generated application. Run the following MQTT client command:
    <CodeBlock language="bash">
    {`mqtt pub -t 'light/measured' -h 'test.mosquitto.org' -m '{"id": 1, "lumens": 3, "sentAt": "2017-06-07T12:34:32.000Z"}'`}
    </CodeBlock>

3. Go back to the previous terminal to check if your application logged the streetlight condition you just sent. You should see something like this displayed in the terminal:
    <CodeBlock language="bash">
    {`light/measured was received:
    { id: 1, lumens: 3, sentAt: '2017-06-07T12:34:32.000Z' }`}
    </CodeBlock>
## Summary
In this tutorial, you learned how to generate your code from the [Streetlights API specification document created in a previous tutorial](https://asyncapi.com/docs/tutorials/create-asyncapi-document) using the AsyncAPI generator tool. 

Additionally, you've learned how to run your code by installing the generated code's dependencies and sending several test messages to the Streelights application using the MQTT client.

## Next steps
Now that you've completed this tutorial, go ahead and learn how to [validate your AsyncAPI messages (events)](https://asyncapi.com/docs/tutorials/message-validation.md) through the message validation techniques supported by AsyncAPI.

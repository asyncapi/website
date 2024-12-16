---
title: Generate code 
description: In this tutorial, you'll learn how to generate code from your AsyncAPI document.
weight: 100
---

## Introduction

In this tutorial, you'll learn how to generate an application that uses the [Glee](https://github.com/asyncapi/glee) framework. You'll do it with an AsyncAPI document and the [AsyncAPI CLI](/tools/cli).

## Background context
[Glee](https://github.com/asyncapi/glee) is a TypeScript/JavaScript framework that enables you to create APIs and messaging clients based on your AsyncAPI document. Instead of generating code, this framework tightly integrates with your AsyncAPI document and binds functions to specific AsyncAPI operations. You only have to provide the code for these functions and Glee handles the rest.

Glee is often used with the [AsyncAPI CLI](/tools/cli) for a better development experience.

In the previous tutorial, you created an AsyncAPI document that is used in this tutorial.

<Remember>

If you did not follow the previous tutorial and do not have an `asyncapi.yaml` file for overview, then generate one by running the following command using the AsyncAPI CLI: 
`asyncapi new --example=tutorial.yml --no-tty`.

</Remember>

## Installation guide
<Remember>

It is important to have [Node.js](https://nodejs.org/en/download/) installed which will enable the installation of the required dependencies using <b>npm</b>.

</Remember>

import CliInstallation from '@/assets/docs/fragments/cli-installation.md'

<CliInstallation/>

## Create a Glee project

1. Trigger the creation of the Glee project:
    <CodeBlock language="bash">
    {`asyncapi new glee --name=tutorial --template=tutorial`}
    </CodeBlock>

    Let's break down the previous command:
    - `asyncapi new glee` is how you use Glee via the AsyncAPI CLI. 
    - `--name=tutorial` is how you tell the AsyncAPI CLI to name your new Glee project. 
    - `--template=tutorial` is how you tell the AsyncAPI CLI to use the template of a Glee project that was created specifically for this tutorial. 

2. List all files in the directory and confirm your Glee project creation:
    <CodeBlock language="bash">
    {`cd tutorial && ls`}
    </CodeBlock>

    Upon execution of the command above, the following is an example of the expected result:
    <CodeBlock language="bash">
    {`$ ls
    LICENSE
    README.md
    asyncapi.yaml
    functions
    package.json`}
    </CodeBlock>

## Start generated application
1. Install dependencies of the newly generated application:
    <CodeBlock language="bash">
    {`npm install`}
    </CodeBlock>

2. Start the application:
    <CodeBlock language="bash">
    {`npm run dev`}
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
    {`lightMeasured was received from mosquitto:
    { id: 1, lumens: 3, sentAt: '2017-06-07T12:34:32.000Z' }
    Streetlight with id "1" updated its lighting information to 3 lumens at 2017-06-07T12:34:32.000Z.`}
    </CodeBlock>
## Summary
In this tutorial, you learned how to create a Glee project from the [Streetlights API specification document created in a previous tutorial](https://asyncapi.com/docs/tutorials/create-asyncapi-document). 

Additionally, you've learned how to run your code by installing the project's dependencies and sending several test messages to the Streelights application using the MQTT client.

## Next steps
Now that you've completed this tutorial, go ahead and learn how to [validate your AsyncAPI messages (events)](https://asyncapi.com/docs/tutorials/message-validation) through the message validation techniques supported by AsyncAPI.

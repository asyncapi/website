---
title: Streetlights - Generate Code 
description: In this tutorial, you'll learn how to generate your code from an AsyncAPI document.
weight: 130
---

# Introduction

In this tutorial, you'll learn how to generate your code from an AsyncAPI document using the AsyncAPI generator tool.

# Background Context
The [AsyncAPI Generator](https://github.com/asyncapi/generator) is a tool that you can use to generate whatever you want based on the AsyncAPI document. You can generate docs and code. It can be used as a library in Nodejs application or through the [AsyncAPI CLI](https://github.com/asyncapi/cli).

The generator tool supports a number of templates to generate code for a variety of different languages and protocols as the output. These templates help to specify what exactly must be generated, and in this tutorial, you use [Nodejs template](https://github.com/asyncapi/nodejs-template).

# Installation Guide
Before proceeding to the next step, install the generator tool to use it as a command-line(CLI);

<CodeBlock language="bash">
{`npm install -g @asyncapi/generator`}
</CodeBlock>

The command above helps you install the generator tool globally.


# Generate code

To generate code from the AsyncAPI document created from the [previous tutorial]("), follow the steps listed below;

<!--Using the AsyncAPI document created from the [previous tutorial]("), generate your code by following the steps listed below;-->

1. Trigger generation of the Node.js code:

<CodeBlock language="bash">
{`asyncapi generate fromTemplate asyncapi.yaml @asyncapi/nodejs-template -o output -p server=mosquitto`}
</CodeBlock>

The command `asyncapi generate fromTemplate asyncapi.yaml` allowed code to be generated from the AsyncAPI document that was created. The Node.js template was specified by the `@asyncapi/nodejs-template` command.
 
The `-o` determined where to output the result, and the `-p` defined additional parameters you want to pass to the template, in this instance, the `server`.

2. List all files in directory and check that Node.js application is generated:
<CodeBlock language="bash">
{`cd output && ls`}
</CodeBlock>


# Run your code

1. Install dependencies of newly generated application:
<CodeBlock language="bash">
{`npm install`}
</CodeBlock>

2. Start the application:
<CodeBlock language="bash">
{`npm start`}
</CodeBlock>

3. In another terminal install the MQTT.js library:
With the MQTT client, which must first be installed, you can create messages.
<CodeBlock language="bash">
{`npm install mqtt -g`}
</CodeBlock>

4. Send a message to your application:
<CodeBlock language="bash">
{`mqtt pub -t 'light/measured' -h 'test.mosquitto.org' -m '{"id": 1, "lumens": 3, "sentAt": "2017-06-07T12:34:32.000Z"}'`}
</CodeBlock>

6. Go back to the previous terminal and check if your application logged the streetlight condition you just sent.

# Summary

In this tutorial, you learned how to generate your code from the Streetlights API specification document created in the [previous tutorial]() using the AsyncAPI generator tool. 

Additionally, you have learned how to run your code by installing the generated code's dependencies and sending several test messages to the Streelights application using the MQTT client.


# Next steps
Now that you've completed this tutorial, go ahead to learn how to [validate]() your code through the validation techniques supported by AsyncAPI.

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

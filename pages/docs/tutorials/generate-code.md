---
title: Generate code 
description: In this tutorial, you'll learn how to generate code from your AsyncAPI document.
weight: 100
---

## Introduction

In this tutorial, you'll learn how to generate code from your AsyncAPI document using the AsyncAPI generator tool.

## Background context
The [AsyncAPI Generator](https://github.com/asyncapi/generator) is a tool that you can use to generate whatever you want based on the AsyncAPI document. You can generate docs and code. It can be used as a library in Nodejs application or through the [AsyncAPI CLI](https://github.com/asyncapi/cli).

The generator tool supports a number of templates to generate code for a variety of different languages and protocols as the output. These templates help to specify what exactly must be generated, and in this tutorial, you use [Nodejs template](https://github.com/asyncapi/nodejs-template).

## Installation guide
<Remember>

It is important to have <a href='https://nodejs.org/en/download/'>Node.js</a> installed which will enable the installation of the required dependencies using <b>npm</b>.

</Remember>

- Install the generator tool to use it as a command-line (CLI):

<CodeBlock language="bash">
{`npm install -g @asyncapi/cli`}
</CodeBlock>

The command above helps you install the generator tool globally.

- To install a specific version of the generator tool, pass the version during installation:

<CodeBlock language="bash">
{`npm install -g @asyncapi/cli@{version}`}
</CodeBlock>


## Generate code

To generate code from the AsyncAPI document created from the [previous tutorial](""), follow the steps listed below;

1. Trigger generation of the Node.js code:

<CodeBlock language="bash">
{`asyncapi generate fromTemplate asyncapi.yaml @asyncapi/nodejs-template -o output -p server=mosquitto`}
</CodeBlock>

From the command above;

- `asyncapi generate fromTemplate` is how you use AsyncAPI Generator through the AsyncAPI CLI. 

- ` asyncapi.yaml` is how you point to your AsyncAPI document. It can also be a URL. 

- `@asyncapi/nodejs-template` is how you specify the Node.js template.
 
- `-o` determines where to output the result.

- `-p` defines additional parameters you want to pass to the template, in this instance, the `server` parameter which is where you specify the server's name as it is defined in AsyncAPI document.

2. List all files in directory and check that Node.js application is generated:
<CodeBlock language="bash">
{`cd output && ls`}
</CodeBlock>

Upon execution of the command above, the following is an example of the expected result;
```
$ ls
Dockerfile
asyncapi.yaml
docs
src
README.md
config
package.json
```


## Start generated application

1. Install dependencies of newly generated application:
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

2. Send a message to MQTT broker that the generated application is now connected to. You will use the MQTT client command in your terminal:
<CodeBlock language="bash">
{`mqtt pub -t 'light/measured' -h 'test.mosquitto.org' -m '{"id": 1, "lumens": 3, "sentAt": "2017-06-07T12:34:32.000Z"}'`}
</CodeBlock>

3. Go back to the previous terminal and check if your application logged the streetlight condition you just sent. You should see something like this displayed in the terminal;

```
light/measured was received:
{ id: 1, lumens: 3, sentAt: '2017-06-07T12:34:32.000Z' }
```

# Summary

In this tutorial, you learned how to generate your code from the Streetlights API specification document created in the [previous tutorial]() using the AsyncAPI generator tool. 

Additionally, you have learned how to run your code by installing the generated code's dependencies and sending several test messages to the Streelights application using the MQTT client.


# Next steps
Now that you've completed this tutorial, go ahead to learn how to [validate your document using the AsyncAPI studio]() through the validation techniques supported by AsyncAPI.

---

<DocsButton
  suggestions={[
    {
      href: '/docs/tutorials/validate-documents.md',
      title: 'Validate AsyncAPI document',
      type:'back',
    },
    {
      href: '/docs/tutorials/message-validation.md',
      title: 'Validate messages/events',
      type:'next',
    }
  ]}
/>

# Introduction
We'll discuss what it means to validate AsyncAPI files in this tutorial. AsyncAPI files can be validated in two different ways; by validating the AsyncAPI document and by validating messages or events in runtime. 

This tutorial's main focus will be on how AsyncAPI document validation is done.

# Background context

AsyncAPI is an open-source specification standard that seeks to improve the current state of Event-Driven Architecture (EDA) by making it as easy to work with as REST APIs. That goes from documentation to code generation, from discovery to event management. 

With AsyncAPI, you can create specifications that allows developers, architects, and product managers to define the interfaces of an event API the same way, [OpenAPI (formerly known as Swagger)](https://github.com/OAI/OpenAPI-Specification) does for REST APIs.


# Installation Guide
Before you proceed to the next stage, you'll need to download a few things:

1. Install [Node.js](https://nodejs.org/en/download/) (v15 or newer).
2. Install Git on your Operating System (OS):
  - [Install Git on MacOs](https://git-scm.com/download/mac)
  - [Install Git on Windows](https://git-scm.com/download/win)
  - [Install Git on Linux](https://git-scm.com/download/linux)

# Creating an AsyncAPI Document
An AsyncAPI document is a machine-readable definition of your Event-Driven API that can be used to generate documentation and code.

To create an AsyncAPI document, you can use the [AsyncAPI studio](https://studio.asyncapi.com) or the [AsyncAPI CLI](https://github.com/asyncapi/cli) depending on your project need. 

To use the studio, you can update it with the code as shown below;

```
asyncapi: '2.2.0'
info:
  title: Validate App
  version: '1.0.0'
  description: Trying out the first steps to validating AsyncAPI.
  license:
    name: Apache 2.0
    url: 'https://www.apache.org/licenses/LICENSE-2.0'
servers:
  swamp:
    url: localhost
    protocol: ws
channels:
  user/login:
    subscribe:
      summary: A practice to login a user to a system.    
      message:
        $ref: '#/components/messages/UserLoginDetails'
components:
  messages:
    UserLoginDetails:
      payload:
        type: object
        properties:
          userName:
            type: string
            description: A logged in user name.
          password:
            type: number
            format: number
            description: The logged in user password.
```

- To use the CLI, run;
```
npm install -g @asyncapi/cli
```
The code above helps you install the package globally on your system.

- Then run the following command, follow the prompts to create a new specification file;
```
asyncapi new
```
- Open the file and make the necessary updates using the example specification file above or your own API definition.

# Validation of AysncAPI Document
When validating an AsyncAPI document, it could be in these forms;
- Validation against the specification.
- Validation against the company best practices or governance.

### Validation against the specification
 It entails making sure that every content of the document is written in accordance with the AsyncAPI specification.

Using the AsyncAPI studio is a quick and easy way to validate against the specification.  It uses [AsyncAPI parser](https://github.com/asyncapi/parser-js) behind the scenes to perform syntax checks and see if a document is valid or not. 

A red underline appears when an AsyncAPI document is invalid. The console provides feedback quickly, allowing you to check the format of your AsyncAPI document.

In addition, the right-side of the studio is where changes made are seen and if a document is invalid, it gives the error `Empty or invalid document please fix errors / define AsyncAPI document`.


### Validation against company best practices or governance
When AsyncAPI is used by various members of the team in an organization, API management policies can be applied to your messages before they arrive to your broker.

This can be done using **Spectral**, an API linting tool which has a built-in "asyncapi" ruleset for the AsyncAPI specification and helps to define best practices for your Event-Driven APIs. You can learn more about it [here](https://www.asyncapi.com/blog/creating-consistency-announcing-asyncapi-spectral-together).

# Summary
In this tutorial, we've learnt how to create an AsyncAPI specification file using either the studio or the CLI. We also learned about what validation of an AsyncAPI document entails using the studio.

# Next Steps
Now that you've completed this tutorial, check out our [Streetlights](https://www.asyncapi.com/docs/tutorials/streetlights) tutorial to learn how to create a sample IoT system that turns streetlights on and off with AsyncAPI.

---
title: Introduction
date: 2019-02-16T13:56:52+01:00
weight: 0
categories:
- introduction
aliases:
- '/v1/guide/'
- '/v1/guide/index.html'
---

Welcome to the AysncAPI documentation section where you get to learn about solutions to automate and formalize the documentation or code generation of your event-driven (micro)services.

Likewise, If you are aiming to establish solid standards for your events and improve the governance of your asynchronous APIs, you are in the right place.

This tutorial will walk you through how to get started with AsyncAPI. 


## Background Context

AsyncAPI is an open source initiative that seeks to improve the current state of Event-Driven Architecture (EDA). Our long-term goal is to make working with EDAs as easy as working with REST APIs. That goes from documentation to code generation, from discovery to event management. Most of the processes you apply to your REST APIs nowadays would be applicable to your event-driven/asynchronous APIs too.

To make this happen, the first step has been to create a specification that allows developers, architects, and product managers to define the interfaces of an async API. In the same way, [OpenAPI (formerly known as Swagger)](https://github.com/OAI/OpenAPI-Specification) does for REST APIs.

> The AsyncAPI specification settles the base for a greater and better tooling ecosystem for EDA's.

## Installation Guide
In order to successfully set up AsyncAPI, you'll need to download a few things:

1. Install [Node.js](https://nodejs.org/en/download/) (v15 or newer).
2. Install Git on your Operating System (OS):
  - [Install Git on MacOs](https://git-scm.com/download/mac)
  - [Install Git on Windows](https://git-scm.com/download/win)
  - [Install Git on Linux](https://git-scm.com/download/linux)

## Creating Specifications for your EDAs
AsyncAPI is a specification that is usually written in yaml or json format. It contains a variety of top level fields in the specification documents, each of which has a meaning for what you're trying to describe.

If you're new to AsyncAPI and wish to experiment with the specs, you can start with the AsyncAPI playground. Validations and syntax checks can be carried out on the left side of the studio, while the changes made can be seen on the right.

In case you're working on anything considerably bigger, you might want to utilize an IDE like VSCode. In addition, AsyncAPI offers a VSCode extension that allows you to preview documents.

Let's go ahead to create a sample specification document as shown below;

<CodeBlock>
{`asyncapi: '2.2.0'
info:
  title: Speed App
  version: 1.0.0
  description: Trying out the first steps to getting started with AsyncAPI.
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
          `}
</CodeBlock>

From the specifications above, we defined the following fields:

- `asyncapi`: A specific version of the document we are authoring.

- `Info`: Aspects of the documentation that are human readable, such as a title, API version, a description that supports markdown, and a license.

- `servers`: API's endpoints that can be used to consume or publish messages.

- `channels`: The connection points, in this example a 'user/login' channel that accepts the user's login information.

- `components`: A field to hold various schemas for our specification, here the user name and password.


## Summary
In this tutorial, we were able to learn how to setup an AsyncAPI document from scratch.

## Next Steps
Now that you've completed this tutorial, check out our [Streetlights](https://www.asyncapi.com/docs/tutorials/streetlights) tutorial to learn how to create a basic practical example of a system that can turn on and off streetlights with AsyncAPI.


---

<DocsButton
 suggestions={[
   {
      href:'/docs/getting-started/event-driven-architectures',
      type: 'next',  
      title: 'Event-Driven Architectures',
   }
 ]}
/>

---
title: "Validate AsyncAPI document using Studio"
description: In this tutorial we'll learn how to validate AsyncAPI document using Studio
weight: 120
---

# Introduction
In this tutorial, we will use [Studio](https://studio.asyncapi.com/) to validate an AsyncAPI document.
Validating AsyncAPI documents can be done in two ways: by validating the AsyncAPI document and by validating messages or events in runtime.

Here in this tutorial, we will go over various aspects of an AsyncAPI document and attempt to fix an invalid document using Studio which will always work for you no matter what operating system you have. 

# Background context
An AsyncAPI document is a file that defines and annotates the different components of a specific Event-Driven API. The format of the file must be JSON or YAML.
This document can be used afterward to generate documentation and code, validate the messages your application receives, and even apply API management policies to your messages before they arrive to your broker.
AsyncAPI studio allows you to develop an AsyncAPI document, validate it, convert it to the latest version, preview the documentation and visualize the events flow.

# Create an AsyncAPI file
In this step, we will be using Studio to create an AsyncAPI file. 
- Open [Studio](https://studio.asyncapi.com/)
- Now navigate to the left side bar and click on new file.
- You can select any template you want to, we will be using "Simple Example" for this tutorial.
```
asyncapi: '2.4.0'
info:
  title: Account Service
  version: 1.0.0
  description: This service is in charge of processing user signups
channels:
  user/signedup:
    subscribe:
      message:
        $ref: '#/components/messages/UserSignedUp'
components:
  messages:
    UserSignedUp:
      payload:
        type: object
        properties:
          displayName:
            type: string
            description: Name of the user
          email:
            type: string
            format: email
            description: Email of the user
```
Let's break this down and see various components needed to validate the file:

```
asyncapi: '2.4.0'
info:
  title: Account Service
  version: 1.0.0
  description: This service is in charge of processing user signups
  ```
`asyncapi` shows the version of AsyncAPI you are using which is `2.4.0`

```
channels:
  user/signedup:
    subscribe:
      message:
        $ref: '#/components/messages/UserSignedUp'
 ```
 Now we have `channels` section. This section is used to describe the event names your API will be publishing and/or subscribing to.
 We see that the application allows consumers to subscribe to the user/signedup channel to receive userSignUp messages.
 
 ```
 payload:
        type: object
        properties:
          displayName:
            type: string
            description: Name of the user
          email:
            type: string
            format: email
            description: Email of the user
```
The `Payload` property defines the content of the event using AsyncAPI schemas. Your event payload should contain a `displayName` and a `email` property which should be string.

# Scope of Validation

We can validate AsyncAPI document in two ways:
- Validation against the specification.
- Validation against the company best practices or governance.

# Validation against specification

The AsyncAPI [Specification](https://www.asyncapi.com/docs/reference/specification/v2.0.0#specification) defines a set of files required to describe such an API. These files can then be used to create utilities, such as documentation, integration and/or testing tools.
The file MUST describe the operations an application accepts.
We will be using Studio to validate our AsyncAPI document against the specification as it uses [AsyncAPI parser](https://github.com/asyncapi/parser-js). The parser API is generally structured the same way as the AsyncAPI specification.
Now let's say we have an invalid document, you can update it with the code as shown below in the studio:
```
asyncapi: '2.7.0'
info:
  title: Account Service
  version: 2.0.0
  
channels:
  user/signedup:
    subscribe:
      message:
      $ref: 'UserSignedUp'
components:
  messages:
    UserSignedUp:
      payload:
        type: object
        properties:
          displayName:
            type: string
            description: Name of the user
          email:
            type: string
            format: email
            description: Email of the user
 ```
 In studio, you can click on visualizer which is on the left side and see that it says `Empty or invalid document. Please fix errors/define AsyncAPI document.`
 Now we will fix the errors one by one and validate it.
 
 ```
 asyncapi: '2.7.0'
info:
  title: Account Service
  version: 2.0.0
  ```
You can see that the `asyncapi` property shows wrong specification and `version` should be `1.0.0` too. 
We notice that `description` property is missing but that does not make the document invalid.

```
channels:
  user/signedup:
    subscribe:
      message:
      $ref: 'UserSignedUp'
```
Check the studio console, we can see the error `Error downloading https://studio.asyncapi.com/UserSignedUp HTTP ERROR 404`
We need to fix `$ref` so that the consumers can to subscribe to the user/signedup channel to receive userSignUp messages.
`'#/components/messages/UserSignedUp'` is the correct one.

# Summary
In this tutorial, we learnt how to validate AsyncAPI document using studio, how AsyncAPI parser works in the background and the properties of AsyncAPI specification for the application to accept the file.

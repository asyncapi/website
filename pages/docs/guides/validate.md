---
title: "Validate AsyncAPI Files"
description: In this tutorial we'll learn how to validate AsyncAPI files.
weight: 120
---

# Introduction
In this guide, we'll discuss what it means to validate AsyncAPI documents. When people talk about AsyncAPI validation they sometimes mean completely different things: validation of AsyncAPI documents or validation of messages in runtime, messages that have their schemas provided in the AsyncAPI document. 

# Background context

AsyncAPI is an open-source specification standard that seeks to improve the current state of Event-Driven Architecture (EDA) by making it as easy to work with as REST APIs. That goes from documentation to code generation, from discovery to event management. 

With AsyncAPI, you can create specifications that allows developers, architects, and product managers to define the interfaces of an event API the same way, [OpenAPI (formerly known as Swagger)](https://github.com/OAI/OpenAPI-Specification) does for REST APIs.

# Create an AsyncAPI Document
An AsyncAPI document is a machine-readable definition of your Event-Driven API that can be used to generate documentation and code.

With the [AsyncAPI CLI](https://github.com/asyncapi/cli#installation), you can create an AsyncAPI document. You can also validate your document and use a generator in the future. To quickly generate an example AsyncAPI document run the CLI command below. It will generate an example `asyncapi.yaml` file for you

```
asyncapi new --example=default-example.yaml --no-tty
```


# Scope of validation
When validating an AsyncAPI document, it means two things:
- Validation against the specification.
- Validation against the best practices or company governance rules.

## Validation against the specification
This entails making sure that every content of the document is written in accordance with the AsyncAPI specification. Here, validation can be done through;
### AsyncAPI studio
This is a quick and easy way to validate against the specification.  It uses [AsyncAPI parser](https://github.com/asyncapi/parser-js) behind the scenes to perform syntax checks and see if a document is valid or not. 

A red underline appears when an AsyncAPI document is invalid. The console provides feedback quickly, allowing you to check the format of your AsyncAPI document.

In addition, the right-side of the studio is where changes made are seen and if a document is invalid, it gives the error `Empty or invalid document please fix errors / define AsyncAPI document`.

### AsyncAPI CLI
This can be done on your local computer or in automation by simply running the command below against your generated asyncapi document;

 ```
 asyncapi validate asyncapi.yaml

 ```

### Code
AsyncAPI provides official [JavaScript](https://github.com/asyncapi/parser-js) and [Go](https://github.com/asyncapi/parser-go) parsers which parses and validates AsyncAPI documents according to dedicated schemas. 

Also, AsyncAPI provides JSON Schemas that makes custom validation easier. Note that if you decide to bypass parsers, JSON Schemas do not cover specification validation 100%. You can learn more [here](https://github.com/asyncapi/spec-json-schemas#custom-validation-needs).

## Validation against company best practices or governance
When AsyncAPI is used by various members of the team in an organization, API management policies can be applied to your messages before they arrive to your broker.

This can be done using **Spectral**, an API linting tool which has a built-in "asyncapi" ruleset for the AsyncAPI specification and helps to define best practices for your Event-Driven APIs. 

To get started, the first step is to install [Spectral](https://meta.stoplight.io/docs/spectral/b8391e051b7d8-installation). Then, create a file named `.spectral.yaml` so you can begin to write your API descriptions. Below is a basic sample of rules that applies to an AsyncAPI document;

```
{
  "formats": ["asyncapi2"],
  "extends": "spectral:asyncapi",
  "rules": {
    // you can add your own rules here
  }
}
```
To create and add your custom ruleset, an example is shown below;
```
{
  "formats": [
    "asyncapi2"
  ],
  "extends": "spectral:asyncapi",
  "rules": {
    //your added rules here
    "valid-document-version": {
      "message": "Version must match 2.x.x",
      "severity": "hint",
      "given": "$.info",
      "then": [
        {
          "field": "version",
          "function": "defined"
        },
        {
          "field": "version",
          "function": "pattern",
          "functionOptions": {
            "match": "^[0-9]+$"
          }
        }
      ]
    }
  }
}
```
You can learn about more [custom ruleset](https://meta.stoplight.io/docs/spectral/e5b9616d6d50c-custom-rulesets) properties and [AsyncAPI rules](https://meta.stoplight.io/docs/spectral/1e63ffd0220f3-async-api-rules) built-in to Spectral.

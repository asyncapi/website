---
title: "AsyncAPI documents"
date: 2019-04-01T10:56:52+01:00
menu:
  docs:
    parent: 'getting-started'
weight: 101
---

An AsyncAPI document is a file that defines and annotates the different components of **a specific Event-Driven API**.

The format of the file must be JSON or YAML; however, only the subset of YAML that matches the JSON capabilities is allowed.

<CodeBlock>
{`asyncapi: 2.5.0
info:
  title: Example
  version: 0.1.0
channels:
  user/signedup:
    subscribe:
      message:
        description: An event describing that a user just signed up.
        payload:
          type: object
          additionalProperties: false
          properties:
            fullName:
              type: string
            email:
              type: string
              format: email
            age:
              type: integer
              minimum: 18`}
</CodeBlock>

The AsyncAPI document is a machine-readable definition of your Event-Driven API. This document can be used afterward to generate documentation and code, validate the messages your application receives, and even apply API management policies to your messages before they arrive to your broker.

Your API documentation is now machine-readable –easily parseable by code— so the myriad of useful applications is endless.

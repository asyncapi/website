---
title: Reusable parts
weight: 280
---

Reusable parts in AsyncAPI provide flexibility, modularity, and code reusability. You can reuse the majority of document sections like messages, schema definitions, channels, operations, and more.

Reusable parts allow you to split up the AsyncAPI document into many files and reference them using the [Reference Object](/docs/reference/specification/v3.0.0#referenceObject). You can use the `$ref` keyword to reference the same document, another local file, or an external URL. The diagram below describes how to reuse parts in AsyncAPI:

## Same document

You can use the `$ref` keyword to reference a component in an AsyncAPI document. In the example below, you define a component called `MyMessageSchema` under the `schemas` section to describe the structure of a message. Under the `myChannel` channel, you have a message with a payload definition that's represented as a reference to the `MyMessageSchema` schema via the `$ref` keyword.

```yaml
channels:
  myChannel:
    message:
      myMessage:
        payload:
          $ref: '#/components/schemas/MyMessageSchema'
components:
  schemas:
    MyMessageSchema:
      type: object
      properties:
        message:
          type: string
```

## Another local file

You can reference another local document using the `$ref` keyword. Ensure the path to the local file is correct and accessible from your main AsyncAPI document.

In the code below, you reference the component from another local document, such as `message-schema.yaml`.

```yaml
UserSignup:
  name: UserSignup
  title: User signup
  summary: Action to sign a user up.
  description: A longer description
  contentType: application/json
  payload: null
```

In the code below, you use another local document, `message-schema.yaml`, through a reference inside the AsyncAPI document. 

```yaml
channels:
  signUp:
    address: user/signedup
    messages:
      UserSignup:
        $ref: './message-schema.yaml#/UserSignup'
operations:
  user/signedup.publish:
    action: receive
    channel:
      $ref: '#/channels/signUp'
    messages:
      - $ref: '#/channels/signUp/messages/UserSignup'
```

## External URL

You can reference an external URL using the `$ref` keyword. Ensure the external URL provides the referenced component in a compatible format, such as YAML or JSON. In the example below, you reference the component from an external URL. The `$ref` value specifies the full URL to the external resource and the component's location.

```yaml
channels:
  signUp:
    address: user/signedup
    messages:
      UserSignup:
        $ref: https://example.com/my-components.yaml#/schemas/MySchema
operations:
  user/signedup.publish:
    action: receive
    channel:
      $ref: '#/channels/signUp'
    messages:
      - $ref: '#/channels/signUp/messages/UserSignup'
```

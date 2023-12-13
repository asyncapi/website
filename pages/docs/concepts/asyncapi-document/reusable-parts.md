---
title: Reusable parts
weight: 280
---

Reusable parts in AsyncAPI provide flexibility, modularity, and code reusability. You can reuse majority of document sections such as messages or schema definitions, but also channels, operations and many others.

Reusable parts allow you to split up the AsyncAPI document into many files and reference them using the [Reference Object](/docs/reference/specification/v3.0.0#referenceObject). You can use the `$ref` keyword to reference the same or another local file or external URL. The diagram below describes how to reuse parts in AsyncAPI.

## Same document

You can use the `$ref` keyword to reference a component within the same document. In the example below, you define a component called `MyMessageSchema` under the `schemas` section to describe the structure of a message. Under `myChannel` channel you have a message, its payload definition is represented as a reference to `MyMessageSchema` schema using the `$ref` keyword.

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

You can use the `$ref` keyword to reference another local document. Ensure the path to the local file is correct and accessible from your main AsyncAPI document.

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

In the code below, you use another local document `message-schema.yaml` through a reference inside AsyncAPI document.

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

You can use the `$ref` keyword to reference an external URL. Ensure the external URL should provide the referenced component in a compatible format, such as YAML or JSON. In the example below, you reference the component from an external URL. The `$ref` value specifies the full URL to the external resource and the component's location.

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

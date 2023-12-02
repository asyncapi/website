---
title: Reusable parts
weight: 280
---

Reusable parts in AsyncAPI provide flexibility, modularity, and code reusability. You can reuse specific document sections such as Messages or schema definitions.

Reusable parts allow you to split up the AsyncAPI document into many files and reference them using the Reference Object. You can use the $ref keyword to reference the same or another local file or external URL. The diagram below describes how to reuse parts in AsyncAPI.

```mermaid
graph TD

    A[Message]
    B[Payload]
    C[Reusable Part]

style A fill:#47BCEE,stroke:#47BCEE;
style B fill:#47BCEE,stroke:#47BCEE;
style C fill:#47BCEE,stroke:#47BCEE;

  A -->|references| B
  B -->|local file reference| C
  B -->|same file reference| C
  B -->|external URL reference| C

```

## Same file

You can use the $ref keyword to reference a component within the same document. In the example below, you define a component called MyMessageSchema under the schemas section to describe the structure of a message. Under the publish operation of myChannel, you reference the MyMessageSchema component using the $ref keyword.

```yaml
channels:
  myChannel:
    publish:
      message:
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

You can use the $ref keyword to reference another local document. Ensure the path to the local file is correct and accessible from your main AsyncAPI document.

In the code below, you reference the component from another local document, such as message-schema.yaml.

```yaml
UserSignup:
  name: UserSignup
  title: User signup
  summary: Action to sign a user up.
  description: A longer description
  contentType: application/json
  payload: null
```

In the code below, you use another local document message-schema.yaml in another local document such as consume-schema.yaml.

```yaml
channels:
  user/signedup:
    address: user/signedup
    messages:
      publish.message:
        $ref: './message-schema.yaml#/UserSignup'
operations:
  user/signedup.publish:
    action: receive
    channel:
      $ref: '#/channels/user~1signedup'
    messages:
      - $ref: '#/channels/user~1signedup/messages/publish.message'
```

## External URL

You can use the $ref keyword to reference an external URL. Ensure the external URL should provide the referenced component in a compatible format, such as YAML or JSON. In the example below, you reference the component from an external URL. The $ref value specifies the full URL to the external resource and the component's location.

```yaml
channels:
  user/signedup:
    address: user/signedup
    messages:
      publish.message:
        $ref: https://example.com/my-components.yaml#/schemas/MySchema
operations:
  user/signedup.publish:
    action: receive
    channel:
      $ref: '#/channels/user~1signedup'
    messages:
      - $ref: '#/channels/user~1signedup/messages/publish.message'
```

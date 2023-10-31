---
title: Adding Operations
weight: 60
---

In a messaging system, the term "operations" refers to the various methods by which messages are exchanged between participants or components. 

## Features

- Operations describe the behaviors and capabilities of the messaging channels described in the AsyncAPI document.

- In a messaging channel, an operation represents a particular action or interaction that can be performed. 

- The purpose of these operations is to provide a standardized means for describing the process of sending, receiving from, requesting, or replying to messages within the messaging system.

## Defining Operations

Operations can be defined as an independent object in the AsyncAPI document. Operations have the following components for their definition. More information about each field name that is used to define operations can be found [here](https://v3.asyncapi.com/docs/reference/specification/v3.0.0-next-major-spec.12#operationObject). 
Additionally, an example to show the usage of each field name in defining operations can be found [here](https://v3.asyncapi.com/docs/reference/specification/v3.0.0-next-major-spec.12#operationsObject).

The following diagram briefs the important field names that are frequently used to define AsyncAPI operations in Spec 3.0.0 -

```mermaid
graph LR
A[Required Fields to define AsyncAPI Operations]
B[Summary]
C[Action]
D[Optional Fields to define AsyncAPI Operations]
E[Description]
F[Channel]
G[Tags]
H[Bindings]
I[Traits]

A -->|1.| B
A -->|2.| C
D --> |1.| E
D --> |2.| F
D --> |3.| G
D --> |4.| H
D --> |5.| I

style A fill:#E5EE8C,stroke:#000
style B fill:#DF7401,stroke:#000
style C fill:#F5B5EF,stroke:#000
style D fill:#E5EE8C,stroke:#000
style E fill:#B40486,stroke:#000
style F fill:#86B404,stroke:#000
style G fill:#01A9DB,stroke:#000
style H fill:#F781F3,stroke:#000
style I fill:#F568A8,stroke:#000

classDef labelStyle color:#000000;
    class A,B,C,D,E,F,G,H,I labelStyle;
```

## Adding Operations

`operations` are separate objects in the AsyncAPI document on the root level together with `channels` and other objects. 
Operations must specify on what channel it is performed. You do it by referencing the `channel` with `$ref`, just like in the following example:

```
onUserSignUp:
  title: User sign up
  summary: Action to sign a user up.
  description: A longer description
  action: send
  channel:
    $ref: '#/channels/userSignup'
```

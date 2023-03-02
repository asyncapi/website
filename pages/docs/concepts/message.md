---
title: Message
weight: 30
---

## What is a message?
A `message` is a communication asset used to transmit or exchange information from a sender to the receiver through `channels`. A single `message` can be consumed by multiple independent receivers and can also be defined as an _event_ or _command_. The sender includes a payload of data that needs to be processed and serialized by the receiver into an appropriate format, e.g., JSON, XML, binary, etc. It may also include metadata, i.e., information that describes the message itself. This metadata is often known as _headers_ or _properties_.


``` mermaid
graph LR
subgraph one[channel]
b([message])
end

A{{sender application}} --> b --> C{{receiver application}}
  
```

In the diagram above, the sender application transmits a `message` to the receiver application.

## Messages vs Events
A `message` carries information from one application to the other, while an `event` is a message that provides details of something that has already occurred. One important aspect to note is that depending on the type of information a `message` contains, it can fall under an _event_, _query_, or _command_. 
*See the diagram below.*

``` mermaid
graph TD
    A(Message)
    A --> B(Event)
    A --> C(Request)
    C --> D(Query)
    C --> E(Command)
```

Overall, `events` are `messages` but not all `messages` are `events`.

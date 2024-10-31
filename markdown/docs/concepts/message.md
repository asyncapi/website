---
title: Message
weight: 30
---

## What is a message?
A _message_ is a communication asset that transmits or exchanges information from a sender to the receiver through channels.

One message can also be defined as an event or command and can be consumed by multiple independent receivers. The sender encodes a payload of data (serialized into a suitable format, such as JSON, XML, binary, or others) that requires processing by the receiver. Additionally, the message may include _metadata_, which is information that describes the message itself. This metadata is commonly referred to as _headers_ or _properties_.

``` mermaid
graph LR
subgraph one[channel]
b([message])
end

A{{sender application}} --> b --> C{{receiver application}}
  
```

The diagram above illustrates how a sender application transmits a message through a channel to a receiver application, demonstrating the basic flow of message-based communication.

## Messages vs Events
A **message** conveys information between applications, while an **event** is a message that provides details of something that has already occurred. A crucial aspect to note is that depending on the type of information a message carries, it can either be an event, query, or command. Check the diagram below.

``` mermaid
graph TD
    A(Message)
    A --> B(Event)
    A --> C(Request)
    C --> D(Query)
    C --> E(Command)
```

Summing up, events are messages, but not all messages are events.

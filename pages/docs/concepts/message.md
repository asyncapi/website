---
title: Message
weight: 5
---

## What is a message?
A `message` is a method of communication used to transmit or exchange information from a sender to the receiver through the use of `channels`. A single `message` can be consumed by multiple independent receivers, and can also be defined as an _event_ or _command_. The sender includes in the message a payload of data that needs to be processed and serialized by the receiver into an appropriate format e.g JSON, XML, binary, etc.


``` mermaid
graph LR
subgraph one[channel]
b([message])
end

A{{sender application}} --> b --> C{{receiver application}}
  
```

## Messages vs Events
A `message` carries information from one application to the other, while an `event` is a message that provides details of something that has already occurred. `Messages` contain all necessary information required to perform the request, while `events` only contain data of the changed state.
Overall, `events` are `messages` but not all `messages` are `events`.


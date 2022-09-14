---
title: Message
weight: 2
---

## What is a message?
`Message` is a method of communication used to transmit or exchange information from a sender to the receiver through the use of `channels`. A `message` is generic and can also be defined as an event, command, or request. The sender includes a payload that contains data that would be processed according to the preferred format defined by the receiver.

## Messages vs Events
A `message` carries information from one application to the other, while an `event` is a message that provides details of something that has already occurred. `Messages` contain all necessary information required to perform the request, while on the other hand, `events` only contain data of the changed state.
Overall, `events` are `messages` but not all `messages` are `events`.




``` mermaid
graph LR
subgraph one[message]
b([channel])
end

A{{sender application}} --> b --> C{{receiver application}}
  
```

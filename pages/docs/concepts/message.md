---
title: Message
weight: 2
---

## What is a message?
Message is a method of communication used to transmit or exchange information from a sender to the receiver through the use of channels. A message is generic and can also be defined as an event, command, or request. The sender includes a payload that contains data that would be processed according to the preferred format defined by the receiver.

## Messages vs Events




``` mermaid
graph LR
subgraph one[message]
b([channel])
end

A{{sender application}} --> b --> C{{receiver application}}
  
```

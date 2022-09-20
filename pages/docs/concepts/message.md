---
title: Message
weight: 5
---

## What is a message?
A `message` is a method of communication used to transmit or exchange information from a sender to the receiver through the use of `channels`. A `message` is generic and can also be defined as an _event_, _command_, or _request_. The sender includes a payload containing data that is processed according to the preferred format defined by the receiver.


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



---
title: Message
weight: 2
---

## What is a message?
A message is a technique used to transmit or exchange information from servers and application through channels. Each message contains a payload that contains the data sent to the server when making an API call.

## What is the purpose of message?




``` mermaid
graph LR
    A[(Server)] --> b[message]
    b -->  D([channel1])
    b --> E([channel2])
    D --> F[application A]
    E --> G[application B]
  
```

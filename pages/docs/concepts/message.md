---
title: Message
weight: 2
---

## What is a message?
A message is a method of communication used to transmit or exchange information from either a server (sender) to an application (receiver) through the use of channels.

## What is the purpose of message?




``` mermaid
graph LR
    A[(Server)] --> b[message]
    b -->  D([channel1])
    b --> E([channel2])
    D --> F[application A]
    E --> G[application B]
  
```

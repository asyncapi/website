---
title: Request/Reply Info
weight: 210
---

Introduction to Request-Reply pattern. 1 - 2 paras talking about it in asyncapi that it is now added on a operation level as a dedicated reply object. Solves two main use cases where you want to have a way to specify a static info, what is the reply given to a specific channel and then the dynamic way to specify the reply.

What it is, how it works. Why is it important and how it matters now with respect to AsyncAPI


Make a point that irrespective of the appraoch you can now implement the reply info now in operatiosn object

Use cases
- Dynamic channels(Cost calculation)
Start with explanation, Imagine where you have system that sends requests for cost calculation and has to respond to a given request to the given reqyester. 
Make sure to talk about reply object in operations and that the expression is runtime when it comes to where the service can find the address as to where it should reply to
Simple mermaid diagram replicating the use case


- Reply message(Webscoket use case-> Single channels with dif types of messages)(In aysncpi you can tell which messages are just reply and not messgaes that you actually send)
Ping pong example with multiple channels(but the same address).
Single channel with all messages defined and explain the operation(Message filter way)


3 diagrams, One in the introduction -> Basic request reply flow
One for each approach -> Message filtering, dynamic
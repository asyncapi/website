---
type: Engineering
title: "The journey of documenting a Socket.IO API (Pt 1)"
date: 2021-09-23T10:00:00+01:00
cover: /img/posts/socketio-part1/cover.webp
tags:
   - Specification
   - Socket.IO
   - Protocol
   - Asynction
authors:
   - name: Dimitrios Dedoussis
     photo: /img/avatars/dedoussis.webp
     link: https://twitter.com/dedoussis
     byline: Senior Software Engineer at Babylon & Maintainer of Asynction
---

> This post originally appeared on [https://dedouss.is](https://dedouss.is/posts/2021-06-24-documenting-socketio-part-1.html)

My recent adventures with [Socket.IO](https://socket.io/) took me off on a tangent, exploring the world of [AsyncAPI](https://www.asyncapi.com/) as a means of documenting Socket.IO APIs. This is the first part of a series of blog posts covering the modeling of the Socket.IO protocol using AsyncAPI objects, followed by a step-by-step tutorial on how to create a specification YAML file given an existing Socket.IO API.

## Setting the scene

Earlier this year my team undertook the task of re-implementing the backend of a realtime chat application _-_ mentioning _re-implementing_ and _backend_ in the very first sentence is probably a PTSD trigger for many of you, but thankfully this post has nothing to do with rewriting-from-scratch horror stories. The app was originally built using a 3rd party push-notifications platform which allowed us to deliver a functional MVP in a relatively speedy manner. However, as new requirements started creeping in from the business, it was clear to the team that this 3rd party dependency was not really worth it anymore. We thus had to take the (arguably not so easy) decision to implement our own realtime API to gain complete control of each server connection. The design meeting would soon follow, to answer questions like _“What framework should we use?”_ or _“Would serverless make sense?”_. The stack of the team, namely Python, [Flask](https://flask.palletsprojects.com/) and [Kubernetes](https://kubernetes.io/), pointed us in the direction of [Flask-SocketIO](https://flask-socketio.readthedocs.io/), making Socket.IO the protocol of choice. Although pragmatic, this stack driven design approach felt very unorthodox. The tooling dictated the choice of the client<Text content='<->' />server communication protocol rather than the other way around. It was a decision primarily based on the stack and the expertise of the backend team. What if the Socket.IO client library for Swift is not maintained anymore? What if Socket.IO is a very verbose protocol, not friendly for clients with limited network connectivity? Thankfully, this is not the case and Socket.IO happens to be a well supported and carefully designed protocol. Nonetheless, the decision was made and the development of a Socket.IO API was about to commence.

In the spirit of not repeating the sins of the past (i.e. not focusing on the client<Text content='<->' />server interface), I started looking into how one can document a Socket.IO API. By document, I mean putting together some sort of spec or contract that can be agreed upon and shared with the consumers of the API. To my surprise, I couldn’t find a lot of resources on the topic. Coming from the REST world (where [OpenAPI](https://www.openapis.org/) is nowadays the de facto standard) and from the [GraphQL](https://graphql.org/) world (where everything is strictly typed), I found myself rather disappointed. It felt like the industry had been treating the documentation of event-driven APIs, such as Socket.IO or WebSocket ones, as a niche area not worth standardising. This felt odd, given how popular event-driven architectures had become over the past decade.

After getting over the initial shock of this realisation, I finally managed to put together some properly worded google searches and came across [AsyncAPI](https://www.asyncapi.com/). Apparently, there is a growing community out there that serves this exact purpose of documenting event-driven APIs! Since 2017, the AsyncAPI folks have been developing a protocol agnostic specification for asynchronous APIs (inspired by OpenAPI), along with tooling such as spec parsers and code generators. Diving deeper into my google search, I looked for articles and tutorials on how one may express a Socket.IO API using the AsyncAPI specification. The only single resource I managed to find on the public cyberspace was [this](https://stackoverflow.com/a/45701602/10975573) (not very comprehensive) StackOverflow answer. It was at this point when I realised that I was on my own, facing the problem of modelling the Socket.IO protocol using the AsyncAPI semantics. I decided to take on the challenge and if successful, write a blog post documenting my journey. So here we are.

## What is Socket.IO?

Before jumping to the AsyncAPI part of the problem, let’s first try to establish some common understanding of what Socket.IO is.

Many would argue that Socket.IO is a library rather than a protocol. In fact, [its wikipedia entry](https://en.wikipedia.org/wiki/Socket.IO) defines Socket.IO as a JavaScript library for realtime web applications. However, I regard this as an outdated definition. I see Socket.IO as a protocol of its own, with a JavaScript library being the reference implementation. It is a protocol enabling duplex, event-driven communication, treating the underlying WebSocket and fallback HTTP long-polling mechanisms as an infrastructure layer that the user should never be bothered with. The protocol is implemented in various languages ([Java](https://github.com/socketio/socket.io-client-java), [Python](https://github.com/miguelgrinberg/python-socketio), [C++](https://github.com/socketio/socket.io-client-cpp) and [Rust](https://github.com/1c3t3a/rust-socketio) to name a few) and has an official specification sourced at [https://github.com/socketio/socket.io-protocol](https://github.com/socketio/socket.io-protocol).

The caveat is that a user of Socket.IO (client or server) should never interact with the protocol directly, but instead use the Socket class API of the respective implementation library. The Socket class implements the following symmetrical interface:

- `socket.on(eventName, callback)`:
  1. Registers a new handler (callback) for a given event.
  1. Implements a subscribing operation.
  1. The return value of the callback is sent to the sender party as an acknowledgement.
- `socket.emit(eventName[, …args][, ack])`:
  1. Emits an event to the receiver party.
  1. Implements a publishing operation.
  1. The `ack` callback is invoked only if the receiver returns an acknowledgment.

A more advanced concept of Socket.IO is [Namespace](https://socket.io/docs/v4/namespaces/), which enables multiplexing capabilities. A Namespace has its own event handlers (and potentially its own dedicated connection). Socket.IO uses the main Namespace (`/`) by default, but it is possible to set up multiple custom Namespaces.

At this point one may wonder:

> This is all great, but why do we even need to document a Socket.IO API?

The `eventName` granularity allows Socket.IO to dispatch messages (`args`) based on event names. This means that a Socket.IO server could be supporting any amount of custom event names per namespace. Also note that the event payload (`args`) along with the ACK (`callback` return value) can be of any type as long as it is serializable. Now imagine the very likely scenario of the Socket.IO client being developed from a completely separate team (or even company) to the one developing the server. How would the client know what namespaces and event names the server supports? And even if it was aware of the supported events, how would it know what data structures the server expects for each of those? Does the client need to acknowledge the messages it receives? If yes, what would be the structure of the acknowledgement payload? I wouldn’t want to live in a world where the answers to all of these questions would only be agreed verbally through some meeting. A piece of documentation should stand as the source of truth.

Note that the scope of this documentation is limited to the interface between the client and the server, and does NOT cover the functionality of the server itself. Hence, we are not interested in server specific Socket.IO concepts such as [rooms](https://socket.io/docs/v4/rooms/index.html) or [broadcasting events](https://socket.io/docs/v4/broadcasting-events/).

## What's next

Stay tuned for the next (and most exciting) part of this series which adds AsyncAPI into the equation. In the meantime, you can check out [Asynction](https://github.com/dedoussis/asynction), a python Socket.IO micro-framework driven by the AsyncAPI specification.

_Special thanks to [derberq](https://twitter.com/derberq) and [quetzalliwrites](https://x.com/quetzalliwrites) for reviewing this post!_ 🙏

> Photo by <a href="https://unsplash.com/photos/A4iL43vunlY">Matt Howard</a> on <a href="https://unsplash.com/photos/A4iL43vunlY">Unsplash</a>

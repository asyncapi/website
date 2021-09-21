---
title: "Event-driven architectures"
date: 2019-04-01T10:56:52+01:00
menu:
  docs:
    parent: 'getting-started'
weight: 10
---

Many developers, architects, and product managers have used REST APIs and are familiar with the synchronous communication paradigm. You make a request and wait for the response. This is exactly how the world wide web works. You enter a URL e.g., www.google.com in the browser's address bar and it sends a request to the server. Following, the server sends the response with the website content. **The web is the greatest implementation of a REST API.**

However, there are certain situations where you don't really need a response from the server. In most cases its only important to have some confirmation that the request was received. This is also called _"fire and forget"_, and it's very useful when you just want to communicate or inform that "something happened." You're not requesting or asking for anything, thus you don't need a response.  Examples of this are:

* A user just signed up.
* You have a new follower.
* Your fridge is almost empty.

Along with the event, you may also want to send _extra information_. For instance:

* A user just signed up: here's the user information e.g., name, email, age, etc.
* You have a new follower: here are the details of the follower e.g., username, name, picture, etc.
* Your fridge is almost empty: here's the percentage of "emptiness" or available volume e.g. 23%

This extra information is often referred to as _event payload_ or _message payload_.

## Core concepts

![](/img/diagrams/simple-event-driven.png)

In most cases, Event-Driven Architectures (EDAs) are broker-centric, as in the diagram above. There are some new concepts in it, so let's go through them now.

### Message broker

A message broker (or _"broker"_) is a piece of infrastructure in charge of receiving messages and delivering them to those who have shown interest. They often store messages until they are delivered, which makes EDAs very resilient to failures. Examples of brokers are [RabbitMQ](https://rabbitmq.com), [Apache Kafka](http://kafka.apache.org/), [Solace](http://solace.com), etc.

### Publisher/Subscriber

A publisher (a.k.a. _producer_) is an application that sends messages to the _broker_.

A subscriber (a.k.a. _consumer_) is an application that connects to the _broker_, manifests an interest in a certain type of messages, and leaves the connection open so the _broker_ can push messages to them.

### Message

A message is a piece of information that's sent by the publishers to the broker, and received by all the interested subscribers. The content of the message can be anything, and they are frequently catalogued as _events_ and _commands_. As you saw above, _events_ communicate a fact that occurred. On the other hand, _commands_ are very much like _requests_ in REST APIs: They tell the subscribers "do this."

**To be precise, _events_ and _commands_ share the same structure, but differ conceptually.**

### Channels

One detail that might pass unnoticed from the diagram above is the existence of _channels_. All the _brokers_ support communication through multiple channels. The industry doesn't have a common term though so you may find them as _topics_, _routing keys_, _event types_, and probably other ones I'm missing.

They're usually assigned a name or identifier e.g., `user_signed_up` and it's often good practice to send a single type of message through them. Think about TV or radio channels: the BBC only broadcasts its information through an assigned channel. If the broadcasters (publishers) didn't respect that rule you (the subscriber) would only see and hear interferences.

## Why "event-driven" and not "message-driven"?

You will find both used interchangeably, although they are not exactly the same. You will even find _"message-based"_ and _"event-based"_. In practice, chances are they all refer to the same thing.

Theoretically, _"message-driven"_ is the most generic term, meaning you may use events and commands, while _event-driven_ means that it's purely about events. However, that's not always the case, as Martin Fowler explains in his talk _"the many meanings of event-driven architecture"_:

<div className="my-8">
  <YouTube id="STKCRSUsyP0" />
</div>

## Conclusion

We've seen what an event-driven architecture is, how it works, and explained its components. AsyncAPI defines and documents each of these components. We'll go through it during the rest of this guide but, before you continue, please choose what's your next step:

<ChapterSuggestions
  suggestions={[
    {
      href: '/docs/getting-started/coming-from-openapi',
      title: 'Coming from OpenAPI',
      description: 'If you\'re familiar with OpenAPI (fka Swagger), you should really read this.',
      linkText: 'Learn how AsyncAPI compares to OpenAPI',
    },
    {
      href: '/docs/getting-started/hello-world',
      title: 'Hello World',
      description: 'Jump straight into an example of how to create your first AsyncAPI document.',
      linkText: 'Learn the basics of the AsyncAPI specification',
    }
  ]}
/>

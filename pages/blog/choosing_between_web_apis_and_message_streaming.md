---
title: "Choosing Between Web APIs and Message Streaming"
date: 2020-06-23T07:00:00+01:00
type: Engineering
tags:
  - REST APIs
  - Streaming
  - EDA
cover: /img/posts/choosing_between_web_apis_and_message_streaming/cover.webp
authors:
  - name: James Higginbotham
    photo: /img/avatars/jhigginbotham.webp
    link: https://twitter.com/launchany
    byline: AsyncAPI Contributor
excerpt: When faced with a variety of options, how are developers building APIs supposed to know which is the right one for their solution? In this article, I’m going to outline the common characteristics for both REST APIs and message streaming so developers can better understand when (and when not) to use each one.
---

> This post originally appeared on [Capital One Tech](https://medium.com/capital-one-tech/choosing-between-rest-web-apis-and-message-streaming-8e2f4813a058)

When faced with a variety of options, how are developers building APIs supposed to know which is the right one for their solution? In this article, I’m going to outline the common characteristics for both REST APIs and message streaming so developers can better understand when (and when not) to use each one.

## Characteristics of REST-Based Web APIs

REST-based web APIs create a conversation between a client (the API consumer) and an API server (the backend). When we build REST-based APIs within Capital One, we use HTTP as our protocol. Our designs depend heavily on HTTP, from the methods (e.g. GET, POST, PUT, PATCH, DELETE) to the headers that help us communicate between client and server (e.g. Authorization, Accept, Content-Type).

![Request/response client-server list conversation](/img/posts/choosing_between_web_apis_and_message_streaming/convo-1.webp)

```
GET /projects
Accept: application/json

200 OK
Content-Type: application/json
 
 [
  { "projectId":"...", "name":"..." },
  { "projectId":"...", "name":"..." },
  { "projectId":"...", "name":"..." },
  ...
 ]
```

![Request/response client-server create conversation](/img/posts/choosing_between_web_apis_and_message_streaming/convo-2.webp)

```
POST/projects
Content-Type: application/json

{ "name":"...", ... }

201 Created
Content-Type: application/json
 
 { "projectId":"...", "name":"...", ... }

```

The client (or API consumer) is the app, which sends a message (i.e. an HTTP request) to the API whenever it needs something. The server then replies with the response, including a status code that indicates if the request was processed successfully (2xx error code), failed due to client error (4xx error code), or failed due to server error (5xx error code). All communication flows from the consumer to the API backend.

When we add in hypermedia links, we extend the conversation with some additional information that may be helpful to the client:

![Request/response client-server hypermedia conversation](/img/posts/choosing_between_web_apis_and_message_streaming/convo-3.webp)

```
GET /projects/12345
Accept: application/json

200 OK
Content-Type: application/json
 
 { 
 "name":"...", ...,
 "_links": {
   { "self" :"/projects/1234" }, 
   { "related_projects": [
     { "4567" :"/projects/4567" }, 
     { "8901" :"/projects/8901" }, 
     { "9012" :"/projects/9012" } 
   ]}, 
   { "members": [
     { "1" :"/users/1" }, 
     { "2" :"/users/2" }, 
     { "3" :"/users/3" }, 
     { "4" :"/users/4" }, 
     { "5" :"/users/5" } 
   ]}
 }
```

REST-based APIs have a specific set of characteristics that are summarized below:

* __Request/response model__ — API consumers send requests to an API server and receive a response.
* __Pull-based interaction__ — API consumers send an API request when data or functionality is required (e.g. user interface, at a pre-scheduled time).
* __Synchronous__ — API consumers receive the response after a request is sent.
* __Multiple content types__ — since REST APIs are built upon HTTP, responses may be JSON, XML, or other content types as necessary to support consumer needs (e.g. CSV, PDF).
* __Flexible interactions__ — Building upon the available HTTP verbs, consumers may interact with REST-based APIs through resources in a variety of ways: queries/search, creating new resources, modifying existing resources, and deleting resources. We can also build complex workflows by combining these interactions into higher-level processes.
* __Caching and concurrency protocol support__ — HTTP has caching semantics built-in, allow for caching servers to be placed between the consumer and API server, as well as cache control of responses and eTags for concurrency control to prevent overwriting content.
* __Internal and external access__ — REST APIs may be restricted for internal use or for external use by partners or public developers.

For most solutions, offering a REST-based API is a great starting point, allowing any application or automation script to interact with your API over HTTP.

## Characteristics of Message Streaming

Unlike REST APIs, message streaming is better at providing notifications when new messages arrive. Once subscribed, the client will be notified when new messages are available:

![Event-based API subscription](/img/posts/choosing_between_web_apis_and_message_streaming/convo-4.webp)

```
POST /subscriptions
Content-Type: application/json

{ "callbackUrl":"https://my.callback/path", ... }

201 Created
Content-Type: application/json
 
```

Now that the client is subscribed to a topic, it will receive notifications when new messages are available. This may be the result of a REST API processing incoming requests from a web or mobile app, then adding messages into the message stream topic to notify anyone that is interested:

![Event-based API notifications](/img/posts/choosing_between_web_apis_and_message_streaming/convo-5.webp)

```
POST https://my.callback/path
<<project created event>>

POST https://my.callback/path
<<project archived event>>

POST https://my.callback/path
<<project updated event>>
```

Notice how our conversation became more interesting. We now can be notified when things change or critical business events occur; without needing to modify and redeploy the API to support a new integration that emerges in the future. This is called loose coupling, and it helps our systems be used in new ways without the originator of the messages even knowing about current and future subscribers.

Those familiar with message brokers will realize that this is familiar. The difference between a message broker and message streaming is that _message streaming allows us to revisit past messages in sequence as well_:

![Streaming API conversation](/img/posts/choosing_between_web_apis_and_message_streaming/convo-6.webp)

```
<<request last 12 messages from project_messages topic>>

<<retrieve and send last 12 messages from project_messages topic>>
```

This feature is useful when we need to go aggregate values or perform a new calculation we previously didn’t realize we needed.

Note — we can’t filter messages or perform other aggregate queries when requesting the messages — only the client can do this after requesting the messages from the topic. REST APIs are better suited for performing ad hoc queries than message streams.

As you are discovering, message streaming is a different style of interaction than REST-based APIs. Additional characteristics of message streaming are summarized below:

* __Publish/subscribe model__ — Apps or APIs publish messages to a topic which may have zero, one, or many subscribers rather than a request/response model.
* __Subscriber notification interaction__ — Apps receive notification when a new message is available, such as when data is modified or new data is available.
* __Asynchronous__ — Unlike REST APIs, apps cannot use message streams to submit a request and receive a response back without complex coordination between parties.
* __Single content-type__ — At Capital One, our message streaming is built upon Avro, a compact binary format useful for data serialization. Unlike HTTP, Avro doesn’t support other content types (e.g. CSV, PDF).
* __Replayability__ — At Capital One, our message streaming is built on Kafka, subscribers may revisit and replay previous messages sequentially.
* __No caching or concurrency protocol support__ — Message streaming doesn’t offer caching semantics, cache-control, or concurrency control between publisher and subscriber.
* __Internal access only__ — Subscribers must be internal to the organization, unlike HTTP which may be externalized to partner or public consumers.

Message streaming offers some additional communication options that REST-based APIs do not — push-based notifications when new data or state changes occur, and the option of revisiting past messages in the stream to perform new calculations or re-execute logic that failed previously. When combined together, REST-APIs enable consuming apps to integrate easily with an HTTP API, while message streaming allow consumers to be notified of changes without needing to check with the REST API first. This can be a powerful combination that can satisfy use cases that exist today, while allowing emerging use cases to be handled in the future — all without modifying existing systems to accommodate new solutions.

## Summary

As you may have realized, choosing between a web API and message streaming isn’t difficult, as long as you understand the characteristics of each one. REST APIs are best suited to request/response interactions where the client application sends a request to the API backend over HTTP. Message streaming is best suited to notification when new data or events occur that you may want to take action upon. Just be sure to match the needs of the consumer with one or more approaches to offer a robust interface to your solution’s capabilities.

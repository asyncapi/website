---
title: Creating AsyncAPI for WebSocket API - Step by Step
date: 2021-04-21T06:00:00+01:00
type: Engineering
tags:
  - WebSocket
cover: /img/posts/websocket-part2/cover.webp
authors:
  - name: Lukasz Gornicki
    photo: /img/avatars/lpgornicki.webp
    link: https://twitter.com/derberq
    byline: AsyncAPI Maintainer and Community Guardian
excerpt: Learn how to create a complex AsyncAPI document using WebSocket API as an example. 
---

>  This step-by-step guide is a continuation of a series of articles about WebSockets. I recommend reading [WebSocket, Shrek, and AsyncAPI - An Opinionated Intro](/blog/websocket-part1) first.

If you do not want to read this article, then watch the recording of the live stream about the same:
<YouTube id="8tFBcf31e_c" />

All roads lead to Rome, but all those roads are different. First, you need to identify where you are and what is the purpose of your journey. What is your goal? What do you want to use AsyncAPI for?

You may invest in using the specification for many different reasons, like for example:
- documentation
- testing
- mocking
- code generation
- message validation

Depending on your goal, you might need to take different roads to get there. If your only goal is documentation, you might take a different approach to writing an AsyncAPI file than you would take while thinking about code generation.

## Choosing the right road to Rome

Let's say AsyncAPI does not fully cover your use case. You are missing some extra property. You are disappointed that you cannot explicitly provide information that your production servers both support different channels. Server A supports channel AA and AB, while Server B supports channel BA and BB. It is not currently possible with the specification as the assumption is that your application communicates with servers that support the same channels.

There are two roads to Rome:

Road **docs-only**: You need AsyncAPI for docs generation only and have no intention of sharing the source document with anyone. It means you do not need to bother much about inventing some specification extension. You can just add missing information to the description of a given object.

Road **automation**: You need AsyncAPI for docs and code generation, which means that all details in your AsyncAPI document must be machine-readable. You can't just put unsupported information in the description.

## Kraken API use case

I'm going to guide you through the process of creating an AsyncAPI document. I'll use the example of Kraken API mentioned in my [previous article](/blog/websocket-part1).

The challenge I had here was that I'm trying to document an API basing on public docs with no access to a subject matter expert. I also have zero understanding of the cryptocurrency industry and still do not fully understand the vocabulary. 

> **Message to Kraken API developers and technical writers** <br/>
In case you want to continue the work I started on the AsyncAPI document for Kraken API, feel free to do that. I'm happy to help, just let me know. Reach me out in our [AsyncAPI Slack workspace](https://www.asyncapi.com/slack-invite/).

More interesting here are the technical challenges though, caused by the fact that Kraken's API:
- has two production servers for non-secure and secure message exchange
- some messages are supported only by the public and some only by a private server
- has just one entry point for communication. You do not get specific messages from one of many endpoints. You get specific messages after first sending a subscription message. Meaning you have a request message and you get a reply message, so something that is not yet possible to describe with AsyncAPI in a machine-readable way

## Writing a single AsyncAPI document

Because of all these different challenges, I took the **docs-only** road described in section [Choosing the right road to Rome](#choosing-the-right-road-to-rome). No worries though, I give tips for the **automation** road too.

### Basic information about the API

First, provide some basic information that every good AsyncAPI file should have:
- What AsyncAPI version do you use?
- What is the name of your API?
- What version of the API you describe?
- Do not underestimate the description. Optional != not needed. AsyncAPI supports markdown in descriptions. Provide long generic documentation for your API. Benefit from markdown features to structure it, so it is easier to read

> In case you think using just one property to add overarching documentation for your API is very limiting, I agree with you :smiley: Join discussion [here](https://github.com/asyncapi/extensions-catalog/issues/11). I believe spec should have better support for docs, and we should first explore it with specification extensions. To be honest, I always thought documentation deserves its specification, but I don't want to bother you with my wicked visions now.


```yaml
asyncapi: 2.0.0
info:
  title: Kraken Websockets API
  version: '1.8'
  description: |
    WebSockets API offers real-time market data updates. WebSockets is a bidirectional protocol offering fastest real-time data, helping you build real-time applications. The public message types presented below do not require authentication. Private-data messages can be subscribed on a separate authenticated endpoint. 

    ### General Considerations

    - TLS with SNI (Server Name Indication) is required in order to establish a Kraken WebSockets API connection. See Cloudflare's [What is SNI?](https://www.cloudflare.com/learning/ssl/what-is-sni/) guide for more details.
    - All messages sent and received via WebSockets are encoded in JSON format.
    - All decimal fields (including timestamps) are quoted to preserve precision.
    - Timestamps should not be considered unique and not be considered as aliases for transaction IDs. Also, the granularity of timestamps is not representative of transaction rates.
    - At least one private message should be subscribed to keep the authenticated client connection open.
    - Please use REST API endpoint [AssetPairs](https://www.kraken.com/features/api#get-tradable-pairs) to fetch the list of pairs which can be subscribed via WebSockets API. For example, field 'wsname' gives the supported pairs name which can be used to subscribe.
    - Cloudflare imposes a connection/re-connection rate limit (per IP address) of approximately 150 attempts per rolling 10 minutes. If this is exceeded, the IP is banned for 10 minutes.
    - Recommended reconnection behaviour is to (1) attempt reconnection instantly up to a handful of times if the websocket is dropped randomly during normal operation but (2) after maintenance or extended downtime, attempt to reconnect no more quickly than once every 5 seconds. There is no advantage to reconnecting more rapidly after maintenance during cancel_only mode.
```

### Provide server information

Describe how to connect to the API:
- What is the URL of the server?
- Is there any authorization in place?
- What is the protocol requirement, is SSL connection required?

The Kraken API is an excellent example of how different WebSocket implementations can be and that there is never one way to design your architecture. It all depends on your requirements, the use cases that drive your product.

#### Describing multiple servers

Below you can notice two different servers. These are not, as you might think, production and development servers. Here you have a clear division between publicly available data and private-only data. In other words, users use two different servers, not channels/paths/endpoints, to talk to the API.

```yaml
servers:
  public:
    url: ws.kraken.com
    protocol: wss
    description: |
      Public server available without authorization.
      Once the socket is open you can subscribe to a public channel by sending a subscribe request message.
  private:
    url: ws-auth.kraken.com
    protocol: wss
    description: |
      Private server that requires authorization.
      Once the socket is open you can subscribe to private-data channels by sending an authenticated subscribe request message.
```

You can verify if above is true by connecting to **ws.kraken.com** and trying to subscribe to one of the event streams that require a token: 
```json
{ "event": "subscribe",  "subscription": { "name": "ownTrades", "token": "WW91ciBhdXRoZW50aWNhdGlvbiB0b2tlbiBnb2VzIGhlcmUu" } }
```

In response you get an error:
```json
{"errorMessage":"Private data and trading are unavailable on this endpoint. Try ws-auth.kraken.com","event":"subscriptionStatus","status":"error","subscription":{"name":"ownTrades","token":"WW91ciBhdXRoZW50aWNhdGlvbiB0b2tlbiBnb2VzIGhlcmUu"}}
```

> In the documentation, they also indicate beta servers like `beta-ws.kraken.com`. It is hard to understand their purpose, so I did not put them in the AsyncAPI document. For me, beta means something new, some upgrades, and I would consider writing a separate AsyncAPI document.

Is it reasonable to describe API that has two different production servers in one AsyncAPI? As usual, it depends. For **docs-only** road described in section [Choosing the right road to Rome](#choosing-the-right-road-to-rome), you can "workaround" some AsyncAPI features if they do not support your use case. Check out, for example, what I had to do in section [Server security](#server-security) where I was not sure how to describe the specific security of the private server. Short answer: just extend the description.

For **automation** road described in [Choosing the right road to Rome](#choosing-the-right-road-to-rome) section, you need a machine-readable structure. In case you have messages that can be consumed only by the **private** server, you need a way to specify that the given message can be published only to the **private** server. It is exactly the case with Kraken API.

Imagine you want to read the AsyncAPI document in real-time in your server and validate all incoming messages. Take server **ws.kraken.com**. The only way to emit errors like `Private data and trading are unavailable on this endpoint. Try ws-auth.kraken.com` is by writing the code that handles validation manually. You can't generate that as the AsyncAPI file does not specify what messages can go to **ws.kraken.com** and what messages can't.

Why?

At the moment, in AsyncAPI, you don't have a way to "wire" a server with a message, operation, or a channel. There are no default properties that allow you to provide information that message with the name **ownTrades** can only be sent to `ws-auth.kraken.com` server.

Solution?

Create two AsyncAPI documents. Treat those two servers as separate services that share messages and schemas. Use **$ref** feature to [cross-reference schemas](/blog/organizing-asyncapi-documents).

#### Server security

You can use AsyncAPI also to describe the security of your API. You can describe in a machine-readable way the security mechanism that protects the server. Several [security schemes](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#securitySchemeObject) are supported. In Kraken's case, I could not figure out what kind of security scheme they use from their docs.  They seem to have a non-standard set up for getting the authorization token, which is why the only option was to put a human-readable-only description there.

```yaml
servers:
  public:
    url: ws.kraken.com
    protocol: wss
    description: |
      Public server available without authorization.
      Once the socket is open, you can subscribe to a public channel by sending a subscribe request message.
  private:
    url: ws-auth.kraken.com
    protocol: wss
    description: |
      Private server that requires authorization.
      Once the socket is open, you can subscribe to private-data channels by sending an authenticated subscribe request message.

      The API client must request an authentication "token" via the following REST API endpoint "GetWebSocketsToken" to connect to WebSockets Private endpoints. For more details, read https://support.kraken.com/hc/en-us/articles/360034437672-How-to-retrieve-a-WebSocket-authentication-token-Example-code-in-Python-3

      The resulting token must be provided in the "token" field of any new private WebSocket feed subscription: 
      ```
      {
        "event": "subscribe",
        "subscription":
        {
          "name": "ownTrades",
          "token": "WW91ciBhdXRoZW50aWNhdGlvbiB0b2tlbiBnb2VzIGhlcmUu"
        }
      }
      ```
```

### Endpoints aka Channels

I saw WebSocket APIs that provide different streams of messages on separate endpoints. It is often the case when you build the WebSocket API for the frontend only and design it for different UI views. In the case of Kraken API we have no endpoints. You connect to the root of the server.

No matter what setup you have, just remember you should use **channels** to describe it. In the case of connecting to the root, it is as simple as:

```yaml
channels:
  /:
```

### Multiple different messages on the same channel

You can have one or many different messages coming to your channel. Like in the case of Kraken API, you can even have multiple messages, incoming and outgoing. You can describe it using **oneOf** on **message** object as you can see below:

```yaml
channels:
  /:
    publish:
      operationId: sendMessage
      message:
        oneOf:
          - $ref: '#/components/messages/ping'
          - $ref: '#/components/messages/subscribe'
          - $ref: '#/components/messages/unsubscribe'
    subscribe:
      operationId: processMessage
      message:
        oneOf:
          - $ref: '#/components/messages/pong'
          - $ref: '#/components/messages/heartbeat'
          - $ref: '#/components/messages/systemStatus'
          - $ref: '#/components/messages/subscriptionStatus'
```

Hold on! Where did these **publish** and **subscribe** keywords came from. 

When we talk about WebSocket, we usually do not use words like subscribe and publish, as we do not think about producers and consumers. Just check out [the protocol RfC](https://www.rfc-editor.org/rfc/rfc6455). We are used to **sending** and **receiving** messages.

Let me present to you an unofficial AsyncAPI vocabulary translator for WebSocket users :smiley:

WebSocket term | AsyncAPI term | Meaning from API server perspective | Meaning from API user perspective
---|---|---|---
Send | Publish | The API server receives the given message. | The API user can send a given message to the API server.
Receive | Subscribe | The API server sends a given message. | The API user can receive a given message from the API server.

### Messages definition

In event-driven architectures (EDA) it's all about the event, right? The message passed in the system. You need to specify many details about the message, like its payload structure, headers, purpose, and many others. 

Above all, always remember to have good examples. Please don't count on the autogenerated ones, as in most cases, they're useless. 

```yml
messages:
  systemStatus:
    description: Status sent on connection or system status changes.
    payload:
      $ref: '#/components/schemas/systemStatus'
    examples:
      - payload:
          connectionID: 8628615390848610000
          event: systemStatus
          status: online
          version: 1.0.0
```

### Describe responses - specification extensions

Describe responses? What responses? 

It is EDA. Who cares about responses, right? Fire and forget rules!

The thing is that request and reply pattern is also used in EDA. This is also the case with Kraken API where communication goes through a single channel with multiple different messages. One message triggers another message in response.

The simplest example is the message **ping** that triggers a **pong** reply. The current AsyncAPI limitation is that you cannot specify that once the user sends (publish) message **ping**, the **pong** message is received in a reply. Look at this [thread](https://github.com/asyncapi/spec/issues/94) to participate in an ongoing discussion about request/reply pattern support in AsyncAPI.

For **docs-only** road from section [Choosing the right road to Rome](#choosing-the-right-road-to-rome), I would be lazy and just put such info in the description of both messages. Even though this is an error-prone approach, I would just make my life easier. For **automation** road I would choose to use a specification extension.

What is specification extension?

You can extend every AsyncAPI object in the AsyncAPI document with extra properties. You only need to prefix them with `x-`. You can also share extensions or reuse extensions from others thanks to [extensions catalog](https://github.com/asyncapi/extensions-catalog).

In the below document, you will notice that for the request/reply pattern, I use AsyncAPI specification extensions called **x-response**.

```yml
messages:
  ping:
    summary: Ping server to determine whether connection is alive
    description: Client can ping server to determine whether connection is alive, server responds with pong. This is an application level ping as opposed to default ping in websockets standard which is server initiated
    payload:
      $ref: '#/components/schemas/ping'
    x-response:
      $ref: '#/components/messages/pong'
```

Even though the reference to another object is provided inside the extension that is not part of AsyncAPI, our parser will resolve it correctly. It means that under **x-response** property, I will have access to the entire message object.

### Schemas vs JSON Schema

Because the message itself is most important in the entire EDA, you need to describe the message payload properly. 

AsyncAPI allows you to provide payload information in different schema formats. The default format is AsyncAPI Schema that is a superset of JSON Schema. You can use others too, like Avro, for example.

From the AsyncAPI document point of view, the most important is that you can reuse schemas. In other words, instead of providing data directly to the **payload** object, you can **$ref** them from **components.schemas** or even an external document. Just DRY, right?

The rest, I would say, has nothing to do with AsyncAPI itself. How you structure schemas depends on you and the schema format that you use. It is why the next sections of my article describe something specific, not for the AsyncAPI itself but rather JSON Schema.

Simplest example of schemas from Kraken API is a payload for **ping** message:

```yml
schemas:
  ping:
    type: object
    properties:
      event:
        type: string
        const: ping
      reqid:
        $ref: '#/components/schemas/reqid'
    required:
      - event
  reqid:
    type: integer
    description: client originated ID reflected in response message.
```

You can see that **ping** message is an object that has two properties where only one is required. One property is used across other messages, so is part of many different schemas, so better to keep its definition as a separate schema and reference where needed.

### Schemas complexity

Splitting schemas into reusable chunks with **$ref** usage is not something complex. It gets complex when messages are complex, when you get different message payload depending on system behavior.

Kraken API has a **subscriptionStatus** message where payload depends on the success of the subscription. In case of successful subscription, you get a message with **channelID** and **channelName** properties, but in case of failure, the message doesn't contain these properties but in exchange has **errorMessage**. In other words, some properties are mutually exclusive.

```yml
    subscriptionStatus:
      type: object
      oneOf:
        - required:
            - errorMessage
          not:
            required:
                - channelID
                - channelName
        - required:
            - channelID
            - channelName
          not:
            required:
                - errorMessage
      properties:
        channelID:
          type: integer
          description: ChannelID on successful subscription, applicable to public messages only.
        channelName:
          type: string
          description: Channel Name on successful subscription. For payloads 'ohlc' and 'book', respective interval or depth will be added as suffix.
        errorMessage:
          type: string
        event:
          type: string
          const: subscriptionStatus
        reqid:
          $ref: '#/components/schemas/reqid'
        pair:
          $ref: '#/components/schemas/pair'
        status:
          $ref: '#/components/schemas/status'
        subscription:
          type: object
          properties:
            depth:
              $ref: '#/components/schemas/depth'
            interval:
              $ref: '#/components/schemas/interval'
            maxratecount:
              $ref: '#/components/schemas/maxratecount'
            name:
              $ref: '#/components/schemas/name'
            token:
              $ref: '#/components/schemas/token'
          required:
            - name
      required:
        - event
```

It is what I call a complex schema, where good JSON Schema knowledge is needed. The problem with complex schemas is that not many tools support these kinds of schemas. By the time I write this article, our AsyncAPI tools for documentation rendering will fail to render the above schema correctly.

It is why you sometimes need compromises and adjusts schemas, so they get proper tooling support. Below you can see the same schema but structured in a more straightforward way supported by most tools.

```yml
    subscriptionStatus:
      type: object
      oneOf:
        - $ref: '#/components/schemas/subscriptionStatusError'
        - $ref: '#/components/schemas/subscriptionStatusSuccess'
    subscriptionStatusError:
      allOf:
        - properties:
            errorMessage:
              type: string
          required:
            - errorMessage
        - $ref: '#/components/schemas/subscriptionStatusCommon'
    subscriptionStatusSuccess:
      allOf:
        - properties:
            channelID:
              type: integer
              description: ChannelID on successful subscription, applicable to public messages only.
            channelName:
              type: string
              description: Channel Name on successful subscription. For payloads 'ohlc' and 'book', respective interval or depth will be added as suffix.
          required:
            - channelID
            - channelName
        - $ref: '#/components/schemas/subscriptionStatusCommon'
    subscriptionStatusCommon:
      type: object
      required:
         - event
      properties:
        event:
          type: string
          const: subscriptionStatus
        reqid:
          $ref: '#/components/schemas/reqid'
        pair:
          $ref: '#/components/schemas/pair'
        status:
          $ref: '#/components/schemas/status'
        subscription:
          required:
            - name
          type: object
          properties:
            depth:
              $ref: '#/components/schemas/depth'
            interval:
              $ref: '#/components/schemas/interval'
            maxratecount:
              $ref: '#/components/schemas/maxratecount'
            name:
              $ref: '#/components/schemas/name'
            token:
              $ref: '#/components/schemas/token'
```

I managed to get a structure that will be nicely rendered in the UI. Even code generation will work well. It is a bit more complex than initial structure, although this is rather subjective personal-taste-like opinion.

### Let's have a look at the final document

Websocket protocol is very flexible, and therefore you can implement the server in many different ways. The path that Kraken API took is complex but not impossible to describe with the AsyncAPI document. Look at the document's final structure and keep in mind that it is not a complete document for Kraken API and the road that I chose to get to Rome was to focus on documentation rendering only. 

For **automation** road described in section [Choosing the right road to Rome](#choosing-the-right-road-to-rome), the document should be split into two documents: one for private and one for public servers. Common parts, like common messages and schemas, should be stored in separate files and referred from these two AsyncAPI documents using **$ref**. Another solution would be to use specification extensions to describe relations between messages and servers.

> You can open this document directly in AsyncAPI Studio by clicking [this](https://studio.asyncapi.com?url=https://gist.githubusercontent.com/derberg/4e419d6ff5870c7c3f5f443e8bd30535/raw/5e9b733b80a0209ba5520e5f41ab18c2a112e0a9/asyncapi-websocket-kraken.yml) link. Compare it also with the [original documentation](https://docs.kraken.com/websockets/).

```yml
asyncapi: 2.0.0

info:
  title: Kraken Websockets API
  version: '1.8.0'
  description: |
    WebSockets API offers real-time market data updates. WebSockets is a bidirectional protocol offering fastest real-time data, helping you build real-time applications. The public message types presented below do not require authentication. Private-data messages can be subscribed on a separate authenticated endpoint. 

    ### General Considerations

    - TLS with SNI (Server Name Indication) is required in order to establish a Kraken WebSockets API connection. See Cloudflare's [What is SNI?](https://www.cloudflare.com/learning/ssl/what-is-sni/) guide for more details.
    - All messages sent and received via WebSockets are encoded in JSON format
    - All decimal fields (including timestamps) are quoted to preserve precision.
    - Timestamps should not be considered unique and not be considered as aliases for transaction IDs. Also, the granularity of timestamps is not representative of transaction rates.
    - At least one private message should be subscribed to keep the authenticated client connection open.
    - Please use REST API endpoint [AssetPairs](https://www.kraken.com/features/api#get-tradable-pairs) to fetch the list of pairs which can be subscribed via WebSockets API. For example, field 'wsname' gives the supported pairs name which can be used to subscribe.
    - Cloudflare imposes a connection/re-connection rate limit (per IP address) of approximately 150 attempts per rolling 10 minutes. If this is exceeded, the IP is banned for 10 minutes.
    - Recommended reconnection behaviour is to (1) attempt reconnection instantly up to a handful of times if the websocket is dropped randomly during normal operation but (2) after maintenance or extended downtime, attempt to reconnect no more quickly than once every 5 seconds. There is no advantage to reconnecting more rapidly after maintenance during cancel_only mode.

servers:
  public:
    url: ws.kraken.com
    protocol: wss
    description: |
      Public server available without authorization.
      Once the socket is open you can subscribe to a public channel by sending a subscribe request message.
  private:
    url: ws-auth.kraken.com
    protocol: wss
    description: |
      Private server that requires authorization.
      Once the socket is open you can subscribe to private-data channels by sending an authenticated subscribe request message.

      The API client must request an authentication "token" via the following REST API endpoint "GetWebSocketsToken" to connect to WebSockets Private endpoints. For more details read https://support.kraken.com/hc/en-us/articles/360034437672-How-to-retrieve-a-WebSocket-authentication-token-Example-code-in-Python-3

      The resulting token must be provided in the "token" field of any new private WebSocket feed subscription: 
      ```
      {
        "event": "subscribe",
        "subscription":
        {
          "name": "ownTrades",
          "token": "WW91ciBhdXRoZW50aWNhdGlvbiB0b2tlbiBnb2VzIGhlcmUu"
        }
      }
      ```

channels:
  /:
    publish:
      description: Send messages to the API
      operationId: processReceivedMessage
      message:
        oneOf:
          - $ref: '#/components/messages/ping'
          - $ref: '#/components/messages/subscribe'
          - $ref: '#/components/messages/unsubscribe'

    subscribe:
      description: Messages that you receive from the API
      operationId: sendMessage
      message:
        oneOf:
          - $ref: '#/components/messages/pong'
          - $ref: '#/components/messages/heartbeat'
          - $ref: '#/components/messages/systemStatus'
          - $ref: '#/components/messages/subscriptionStatus'

components:
  messages:
    ping:
      summary: Ping server to determine whether connection is alive
      description: Client can ping server to determine whether connection is alive, server responds with pong. This is an application level ping as opposed to default ping in websockets standard which is server initiated
      payload:
        $ref: '#/components/schemas/ping'
      x-response:
        $ref: '#/components/messages/pong'
    heartbeat:
      description: Server heartbeat sent if no subscription traffic within 1 second (approximately)
      payload:
        $ref: '#/components/schemas/heartbeat'
    pong:
      summary: Pong is a response to ping message
      description: Server pong response to a ping to determine whether connection is alive. This is an application level pong as opposed to default pong in websockets standard which is sent by client in response to a ping
      payload:
        $ref: '#/components/schemas/pong'
    systemStatus:
      description: Status sent on connection or system status changes.
      payload:
        $ref: '#/components/schemas/systemStatus'
      examples:
        - payload:
            connectionID: 8628615390848610000
            event: systemStatus
            status: online
            version: 1.0.0
    subscribe:
      description: Subscribe to a topic on a single or multiple currency pairs.
      payload:
        $ref: '#/components/schemas/subscribe'
      examples:
        - payload:
            event: subscribe
            pair:
              - XBT/USD
              - XBT/EUR
            subscription:
              name: ticker
        - payload:
            event: subscribe
            subscription:
              name: ownTrades
              token: WW91ciBhdXRoZW50aWNhdGlvbiB0b2tlbiBnb2VzIGhlcmUu
      x-response:
        $ref: '#/components/messages/subscriptionStatus'
    unsubscribe:
      description: Unsubscribe, can specify a channelID or multiple currency pairs.
      payload:
        $ref: '#/components/schemas/subscribe'
      examples:
        - payload:
            event: unsubscribe
            pair:
              - XBT/EUR
              - XBT/USD
            subscription:
              name: ticker
        - payload:
            event: unsubscribe
            subscription:
              name: ownTrades
              token: WW91ciBhdXRoZW50aWNhdGlvbiB0b2tlbiBnb2VzIGhlcmUu
      x-response:
        $ref: '#/components/messages/subscriptionStatus'
    subscriptionStatus:
      description: Subscription status response to subscribe, unsubscribe or exchange initiated unsubscribe.
      payload:
        $ref: '#/components/schemas/subscriptionStatus'
      examples:
        - payload:
            channelID: 10001
            channelName: ohlc-5
            event: subscriptionStatus
            pair: XBT/EUR
            reqid: 42
            status: unsubscribed
            subscription:
              interval: 5
              name: ohlc
        - payload:
            errorMessage: Subscription depth not supported
            event: subscriptionStatus
            pair: XBT/USD
            status: error
            subscription:
              depth: 42
              name: book

  schemas:
    ping:
      type: object
      properties:
        event:
          type: string
          const: ping
        reqid:
          $ref: '#/components/schemas/reqid'
      required:
        - event
    heartbeat:
      type: object
      properties:
        event:
          type: string
          const: heartbeat
    pong:
      type: object
      properties:
        event:
          type: string
          const: pong
        reqid:
          $ref: '#/components/schemas/reqid'
    systemStatus:
      type: object
      properties:
        event:
          type: string
          const: systemStatus
        connectionID:
          type: integer
          description: The ID of the connection
        status:
          $ref: '#/components/schemas/status'
        version:
          type: string
    status:
      type: string
      enum:
        - online
        - maintenance
        - cancel_only
        - limit_only
        - post_only
    subscribe:
      type: object
      properties:
        event:
          type: string
          const: subscribe
        reqid:
          $ref: '#/components/schemas/reqid'
        pair:
          $ref: '#/components/schemas/pair'
        subscription:
          type: object
          properties:
            depth:
              $ref: '#/components/schemas/depth'
            interval:
              $ref: '#/components/schemas/interval'
            name:
              $ref: '#/components/schemas/name'
            ratecounter:
              $ref: '#/components/schemas/ratecounter'
            snapshot:
              $ref: '#/components/schemas/snapshot'
            token:
              $ref: '#/components/schemas/token'
          required:
            - name
      required:
        - event
    unsubscribe:
      type: object
      properties:
        event:
          type: string
          const: unsubscribe
        reqid:
          $ref: '#/components/schemas/reqid'
        pair:
          $ref: '#/components/schemas/pair'
        subscription:
          type: object
          properties:
            depth:
              $ref: '#/components/schemas/depth'
            interval:
              $ref: '#/components/schemas/interval'
            name:
              $ref: '#/components/schemas/name'
            token:
              $ref: '#/components/schemas/token'
          required:
            - name
      required:
        - event
    subscriptionStatus:
      type: object
      oneOf:
        - $ref: '#/components/schemas/subscriptionStatusError'
        - $ref: '#/components/schemas/subscriptionStatusSuccess'
    subscriptionStatusError:
      allOf:
        - properties:
            errorMessage:
              type: string
          required:
            - errorMessage
        - $ref: '#/components/schemas/subscriptionStatusCommon'
    subscriptionStatusSuccess:
      allOf:
        - properties:
            channelID:
              type: integer
              description: ChannelID on successful subscription, applicable to public messages only.
            channelName:
              type: string
              description: Channel Name on successful subscription. For payloads 'ohlc' and 'book', respective interval or depth will be added as suffix.
          required:
            - channelID
            - channelName
        - $ref: '#/components/schemas/subscriptionStatusCommon'
    subscriptionStatusCommon:
      type: object
      required:
         - event
      properties:
        event:
          type: string
          const: subscriptionStatus
        reqid:
          $ref: '#/components/schemas/reqid'
        pair:
          $ref: '#/components/schemas/pair'
        status:
          $ref: '#/components/schemas/status'
        subscription:
          required:
            - name
          type: object
          properties:
            depth:
              $ref: '#/components/schemas/depth'
            interval:
              $ref: '#/components/schemas/interval'
            maxratecount:
              $ref: '#/components/schemas/maxratecount'
            name:
              $ref: '#/components/schemas/name'
            token:
              $ref: '#/components/schemas/token'
    interval:
      type: integer
      description: Time interval associated with ohlc subscription in minutes.
      default: 1
      enum:
        - 1
        - 5
        - 15
        - 30
        - 60
        - 240
        - 1440
        - 10080
        - 21600
    name:
      type: string
      description: The name of the channel you subscribe too.
      enum:
        - book
        - ohlc
        - openOrders
        - ownTrades
        - spread
        - ticker
        - trade
    token:
      type: string
      description: base64-encoded authentication token for private-data endpoints.
    depth:
      type: integer
      default: 10
      enum:
        - 10
        - 25
        - 100
        - 500
        - 1000
      description: Depth associated with book subscription in number of levels each side.
    maxratecount:
      type: integer
      description: Max rate-limit budget. Compare to the ratecounter field in the openOrders updates to check whether you are approaching the rate limit.
    ratecounter:
      type: boolean
      default: false
      description: Whether to send rate-limit counter in updates (supported only for openOrders subscriptions)
    snapshot:
      type: boolean
      default: true
      description: Whether to send historical feed data snapshot upon subscription (supported only for ownTrades subscriptions)
    reqid:
      type: integer
      description: client originated ID reflected in response message.
    pair:
      type: array
      description: Array of currency pairs.
      items:
        type: string
        description: Format of each pair is "A/B", where A and B are ISO 4217-A3 for standardized assets and popular unique symbol if not standardized.
        pattern: '[A-Z\s]+\/[A-Z\s]+'
```

Stay tuned for more articles around WebSocket and AsyncAPI. Share your feedback and connect with the AsyncAPI community in our [Slack workspace](https://www.asyncapi.com/slack-invite/).

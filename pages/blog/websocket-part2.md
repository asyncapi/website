---
title: Creating AsyncAPI for WebSocket API - Step by Step
date: 2021-04-13T06:00:00+01:00
type: Communication
tags:
  - websocket
cover: /img/posts/websocket-part2/cover.webp
authors:
  - name: Lukasz Gornicki
    photo: /img/avatars/lpgornicki.webp
    link: https://twitter.com/derberq
    byline: AsyncAPI Maintainer and Community Guardian
excerpt: TODO
featured: true
---
#### Basic information about the API

Let me first provide some basic information that every good AsyncAPI file should have:
- What AsyncAPI version you use?
- What is the name of your API?
- What version of the API you describe?
- Do not underestimate the description. Optional != not needed. AsyncAPI supports markdown in descriptions. Provide long generic documentation for your API. Benefit from markdown features to structure it, so it is easier to read?

> In case you think using just one property to add overarching documentation for your API is very limiting, I agree with you :smiley: Join discussion [here](https://github.com/asyncapi/extensions-catalog/issues/11). I believe spec should have better support for docs, and we should first explore it with specification extensions.

```yaml
asyncapi: 2.0.0
info:
  title: Kraken Websockets API
  version: '1.8'
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
```

#### Provide server information

Let me now describe how to connect to the API:
- What is the URL of the server?
- Is there any authorization in place?
- What is the protocol requirement, is SSL connection required?

An example of Kraken API is a great example of how different architecture can be and that there is never one way to design your architecture. It all depends on your requirements, the use cases that drive your product.

##### Describing multiple servers

Below you can notice two different servers. These are not, as you might think, production and development servers. Here you have a clear division between publicly available data and private-only data. In other words, users use two different servers, not channels, to talk to the API.

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

You can verify if above is true it by connecting to `ws.kraken.com` and trying to subscribe to one of the event streams that require a token: 
```json
{        "event": "subscribe",        "subscription":        {          "name": "ownTrades",          "token": "WW91ciBhdXRoZW50aWNhdGlvbiB0b2tlbiBnb2VzIGhlcmUu"        }      }
```

In response you get an error:
```json
{"errorMessage":"Private data and trading are unavailable on this endpoint. Try ws-auth.kraken.com","event":"subscriptionStatus","status":"error","subscription":{"name":"ownTrades","token":"WW91ciBhdXRoZW50aWNhdGlvbiB0b2tlbiBnb2VzIGhlcmUu"}}
```

> In documentation, they indicate also beta servers like `beta-ws.kraken.com`. It is hard to understand their purpose, so I did not put them in the AsyncAPI document. For me, beta means something new, some upgrades, and I would consider writing a separate AsyncAPI document.

Is it reasonable to describe API that has two different production servers in one AsyncAPI? As usual, it depends, sorry.

I believe you always need to ask ourselves a question first: `What do you need the AsyncAPI document for?`:
- Is it only for documentation?
- Is it fol docs, testing, mocking, and many other things?

Why? 

For documentation, you can "workaround" some AsyncAPI features if they do not support your use case or do not need to be specific. Check out, for example, what I had to do in section [Server security](#server-security).

For validation or mocking the server, you need a machine-readable structure. In case you have messages that can be consumed only by the **private** server, you need a way to describe that the message can be published only to the **private** server?

Imagine you want to read the AsyncAPI document in real-time in your server and validate all incoming messages. Take server `ws.kraken.com`. The only way to emit errors like _Private data and trading are unavailable on this endpoint. Try ws-auth.kraken.com_ is by writing the code that handles validation manually. You cannot generate that.

Why?

At the moment, in AsyncAPI, you don't have a way to "wire" a server with a message or an operation. Version 2.0 was created with the assumption that you have one server, and it's different versions per environment. It is impossible to model information that messages with the name **ownTrades** can only be sent to `ws-auth.kraken.com` server.

Solution?

Create two AsyncAPI documents. Treat those two servers as separate services that share messages and schemas. Use **$ref** feature to cross-reference schemas.

In this blog post I don't want to go that far. Let's focus on a use case that we just want to document the API. Destructuring of AsyncAPI file and using references is a topic for another post.

##### Server security

You can use AsyncAPI also to describe the security of your API. You can describe in a machine-readable way the security mechanism that protects the server. For that, you use. Several [security schemes](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md#securitySchemeObject) are supported. In Kraken's case, I could not figure out from their docs what kind of security scheme they use, that is the standard set up for getting the authorization token, which is why the only option was to put a human-readable-only description there.

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
```

### Endpoints aka Channels

I saw WebSocket APIs that provide different streams on different endpoints. In the case of Kraken API we have no endpoints. You connect to the root of the server.

No matter what setup you have, just remember you should use `channels` object to describe it. In the case of connecting to the root, it is a simple as:

```yaml
channels:
  /:
```

### Multiple different messages on the same channel

tbd

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

### Describe responses

tbd

### Messages definition

### Schemas vs JSON Schema

### Schemas complexity

### Let's have a look at the final document
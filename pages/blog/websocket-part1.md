---
title: WebSocket, Shrek, AsyncAPI - An Opinionated Intro
date: 2021-04-01T06:00:00+01:00
type: Communication
tags:
  - websocket
cover: /img/posts/websocket-part1/cover.webp
authors:
  - name: Lukasz Gornicki
    photo: /img/avatars/lpgornicki.webp
    link: https://twitter.com/derberq
    byline: AsyncAPI Maintainer and Community Guardian
excerpt: Websocket is a protocol, an industry standard for building client applications that users love to use. What AsyncAPI has to do with it?
featured: true
---

It is a pretty subjective post. I'm gonna share my perspective, taking into account years of experience building backend and frontend with user experience in mind. 

>  Everything we hear is an opinion, not a fact. Everything we see is a perspective, not the truth.
― [Marcus Aurelius](https://www.politifact.com/factchecks/2019/sep/26/viral-image/no-marcus-aurelius-didnt-say-about-opinions-and-fa/)

This blog post is the first one about Websocket, but there will be more. I'm working on a series of blog posts about WebSocket.

## What is WebSocket

It is a pretty old protocol used for duplex communication over TCP connection. It was standardized in 2011. Yes, ten years ago means it is old, super old. 

So why are we even mention it in 2021? 

It is very widely adopted and will not go away anytime soon because tooling support is excellent and serves its purpose well. Just remind yourself when HTTP/2 showed up and how many years it took everyone to migrate, and it would not happen if not a strong support and push from all the big players. 

Sure, there is [HTTP/2 multiplexing](https://developers.google.com/web/fundamentals/performance/http2/#request_and_response_multiplexing) and protocols like [Mercure](https://mercure.rocks/docs/mercure). There is also [RFC8441](https://tools.ietf.org/html/rfc8441) for Websocket and HTTP/2 and tooling already adopts it, like [Envoy](https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/http/upgrades) or [Jetty](https://github.com/eclipse/jetty.project/issues/3537). Nevertheless, WebSocket is not going anywhere.

Anyway, the future of Websocket has nothing to do with this post. This post is for the AsyncAPI community looking into the AsyncAPI spec because of WebSockets now, no matter the future of the protocol.

## Websocket use case

- Do you like to see in Slack that someone is typing a response? 
- Do you like when a user interface updates without page refresh?
- Do you like it when your client app knows there are updates available for display?

It's what WebSocket is for. You establish a connection between client and server, a long-living connection. Through such a connection, client can send a stream of messages to the server, and this is possible the other way around at the same time.

One could say: _I don't need WebSocket to achieve that. I could just set up a data pulling with REST API. Just ask the API every few seconds if there are updates._

Sadly this is not a joke. Engineers do it. Some engineers just take shortcuts, mostly because deadlines hunt them.

HTTP pulling was presented very well in Shrek's famous _Are we there yet?_ scene.

<YouTube id="basofea2UEs" />

Don't go that path. Do not perform unnecessary connections to your servers and create more and more traffic with more and more resource consumption. Wasting resources is bad and makes Shrek angry. Websocket change a lot there:

<Figure
  src="/img/posts/websocket-part1/websocket-shrek.webp"
  caption="Figure 1: HTTP Pull vs WebSocket vs Shrek."
/>

## Why AsyncAPI

When building a WebSocket API on a server, you might have some additional needs:
- Want to document the API for the team that writes a client app, Web UI, Desktop app, or Mobile app. 
- Want to have a way to specify the format of the messages that the server understands, to validate them in the runtime.
- Want to generate a server or/and a client? If not for final production use, then for sure for prototyping and testing.

These are just a few common needs. For WebSocket, you only establish a connection over HTTP protocol, and the rest goes over WS, so OpenAPI specification won't help you much here. WebSocket is one of the patterns in event-based systems. In the end, it is all about a stream of messages and asynchronous processing. Yes, it would be best if you had AsyncAPI :smiley:

## WebSocket described with AsyncAPI

When I google for some public WebSocket API to play with, I find mostly currency trading products:
- [Kraken WebSocket API](https://docs.kraken.com/websockets/)
- [Gemini WebSocket API](https://docs.gemini.com/websocket-api/)
- [CEXIO Websocket API](https://cex.io/websocket-api)

Currency trading is a topic I know nothing about :man_shrugging: but it feels interesting to explore more. Documentation of the 1st and 2nd API looks familiar from look&feel perspective. I think we can make a bet they are already using AsyncAPI, and Kraken most probably is still running on version 1. Let's release the Kraken then.

> I'm sorry if you expected me to describe with AsyncAPI Shrek's interface. It would be fun, but only fun, and except of fun, I'd like also to teach you something.

I'm gonna try to write an AsyncAPI document for Kraken API  after playing with the API and basing it on the [current documentation](https://docs.kraken.com/websockets/).

### Playing with WebSocket API

The best way to play with API is through CLI. Who didn't hear about **curl** in the REST API world? For WebSocket, I would recommend **websocat**. Kraken's API is partially public without authorization which is just great because to play with it, you do not have to set up an account to get an authorization token.

1. Install **websocat**. For other installation options, check [this](https://github.com/vi/websocat#installation) list.
  ```sh
  brew install websocat
  ```
1. Establish connection with the API:
  ```sh
  websocat wss://ws.kraken.com
    ```
1. Ping the API to see if it responds. Just type the below message and hit Enter:
  ```json
  {"event": "ping"}
  ```
1. Now subscribe to the event **ticker** stream that sends messages with currency price. Just type the below message and hit Enter:
  ```json
  {  "event": "subscribe",  "pair": [    "XBT/USD",    "XBT/EUR"  ],  "subscription": {    "name": "ticker"  }}
  ```
1. You should now see a constant stream of data sent by the server. You do not have to ask the API every second for an update, as the update is pushed to you.
  ```json
  {"event":"heartbeat"}
  [340,{"a":["45520.10000",6,"6.78103490"],"b":["45520.00000",0,"0.00185230"],"c":["45520.10000","0.01643250"],"v":["1397.95434819","5589.12101024"],"p":["44883.49461","44062.07654"],"t":[14350,66782],"l":["43607.60000","42770.80000"],"h":["45811.10000","45811.10000"],"o":["43659.30000","44709.10000"]},"ticker","XBT/EUR"]
  [340,{"a":["45520.10000",5,"5.84803490"],"b":["45492.50000",0,"0.09374582"],"c":["45492.50000","0.00625418"],"v":["1398.10526819","5589.26685876"],"p":["44883.56109","44062.11477"],"t":[14359,66790],"l":["43607.60000","42770.80000"],"h":["45811.10000","45811.10000"],"o":["43659.30000","44709.10000"]},"ticker","XBT/EUR"]
  {"event":"heartbeat"}
  [340,{"a":["45503.80000",1,"1.00000000"],"b":["45496.20000",0,"0.01426600"],"c":["45496.20000","0.00109400"],"v":["1398.10636219","5589.26295766"],"p":["44883.56157","44062.11447"],"t":[14360,66788],"l":["43607.60000","42770.80000"],"h":["45811.10000","45811.10000"],"o":["43659.30000","44709.90000"]},"ticker","XBT/EUR"]
  {"event":"heartbeat"}
  ```

  Boy, it is always such a fun to do it. Like seriously, I always have fun playing with APIs, any APIs. Just making this API "conversation". I hope nothing is wrong with me :sweat_smile:

  Now you know how to interact with the Kraken API. Now let's try to describe it using AsyncAPI.

### Describing API using AsyncAPI

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

components:

  messages:
    ping:
      payload:
        $ref: '#/components/schemas/ping'
    heartbeat:
      description: Server heartbeat sent if no subscription traffic within 1 second (approximately)
      payload:
        $ref: '#/components/schemas/heartbeat'
    pong:
      payload:
        $ref: '#/components/schemas/pong'
    systemStatus:
      payload:
        $ref: '#/components/schemas/systemStatus'
      examples:
        - payload:
            connectionID: 8628615390848610000
            event: systemStatus
            status: online
            version: 1.0.0
    subscribe:
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
    unsubscribe:
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
    subscriptionStatus:
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
        - required:
            - errorMessage
        - required:
            - channelID
            - channelName
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

### Conclusions

tbd

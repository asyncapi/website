---
title: WebSocket, Shrek, and AsyncAPI - An Opinionated Intro
date: 2021-04-16T06:00:00+01:00
type: Engineering
tags:
  - WebSocket
cover: /img/posts/websocket-part1/cover.webp
authors:
  - name: Lukasz Gornicki
    photo: /img/avatars/lpgornicki.webp
    link: https://twitter.com/derberq
    byline: AsyncAPI Maintainer and Community Guardian
excerpt: WebSocket is a protocol, an industry standard for building client applications that users love to use. What does AsyncAPI have to do with it?
---

This is a pretty subjective post. I'm sharing my perspective, taking into account years of experience building backend and frontend with user experience in mind. 

If you do not want to read this article, then watch the recording of the live stream about the same:
<YouTube id="8tFBcf31e_c" />

>  Everything we hear is an opinion, not a fact. Everything we see is a perspective, not the truth.
― [Marcus Aurelius](https://www.politifact.com/factchecks/2019/sep/26/viral-image/no-marcus-aurelius-didnt-say-about-opinions-and-fa/)

This blog post is the first of a series of blog posts about WebSocket I'm working on.

## What is WebSocket

It is a pretty old protocol used for duplex communication over TCP connection. It was standardized in 2011. Yes, ten years ago means it is old, super old. 

So why do I even mention it in 2021? 

It is very widely adopted and will not go away anytime soon because tooling support is excellent and serves its purpose well. Just remind yourself when HTTP/2 showed up and how many years it took everyone to migrate. It would not happen without the strong support and push from all the big players. 

Sure, there is [HTTP/2 multiplexing](https://developers.google.com/web/fundamentals/performance/http2/#request_and_response_multiplexing) and protocols like [Mercure](https://mercure.rocks/docs/mercure) or [GraphQL Subscription](https://spec.graphql.org/June2018/#sec-Subscription). There is also [RFC8441](https://www.rfc-editor.org/rfc/rfc8441) for WebSocket and HTTP/2 and some tools already adopted it, like [Envoy](https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/http/upgrades) or [Jetty](https://github.com/eclipse/jetty.project/issues/3537). Nevertheless, WebSocket is here to stay.

Anyway, the future of WebSocket has nothing to do with this post. This post is for the AsyncAPI community looking into the AsyncAPI spec because of WebSockets now, no matter the protocol's future.

## Websocket use case

- Do you like to see in Slack that someone is typing a response? 
- Do you like it when a user interface updates without page refresh?
- Do you like it when your client app knows there are updates available for display?

That is what WebSocket is for. You establish a long-living connection between client and server. Through such a connection, the client can send a stream of messages to the server, and this is possible the other way around at the same time.

One could say: _I don't need WebSocket to achieve that. I could just set up a data polling with REST API. Just ask the API every few seconds if there are updates._

Sadly this is not a joke. Engineers do it. Some engineers just take shortcuts, mostly because deadlines hunt them down.

HTTP polling was presented very well in Shrek's famous _Are we there yet?_ scene.

<YouTube id="basofea2UEs" />

Don't go that path. Do not perform unnecessary connections to your servers and create more and more traffic with more and more resource consumption. Wasting resources is bad and makes Shrek angry. WebSocket changes a lot there:

<Figure
  src="/img/posts/websocket-part1/websocket-shrek.webp"
  caption="Figure 1: HTTP Pull vs WebSocket vs Shrek."
/>

## Why AsyncAPI

When building a WebSocket API on a server, you might have some additional needs:
- Want to document the API for the team that writes a client app, Web UI, Desktop app, or Mobile app. 
- Want to have a way to specify the format of the messages that the server supports to validate them in the runtime.
- Want to generate a server or/and a client? If not for final production use, then for sure for prototyping and testing.

These are just a few common needs. For WebSocket, you only establish a connection over HTTP protocol, and the rest goes over WS, so OpenAPI specification won't help you much here. WebSocket is one of the patterns in event-based systems. In the end, it is all about a stream of messages and asynchronous processing. Yes, it would be best to use AsyncAPI :smiley:

## WebSocket described with AsyncAPI

When I google for some public WebSocket API to play with, I find mostly currency trading products:
- [Kraken WebSocket API](https://docs.kraken.com/websockets/)
- [Gemini WebSocket API](https://docs.gemini.com/websocket-api/)
- [CEXIO Websocket API](https://cex.io/websocket-api)

Currency trading is a topic I know nothing about :man_shrugging: but it feels interesting to explore more. Documentation of the 1st and 2nd API looks familiar from look&feel perspective. I think we can make a bet they are already using AsyncAPI, and Kraken most probably is still running on version 1. Let's release the Kraken then.

> I'm sorry if you expected me to describe Shrek's API interface using AsyncAPI. It would be fun, but only fun, and I'd also like to teach you something.

I will write an AsyncAPI document for Kraken API after playing with the API and basing it on the [current documentation](https://docs.kraken.com/websockets/).

### Playing with WebSocket API

The best way to play with a WebSocket API is through a CLI. Who didn't hear about **curl** in the REST API world? For WebSocket, I would recommend **websocat**. Kraken's API is partially public without authorization which is just great because to play with it, you do not have to set up an account to get an authorization token.

1. Install **websocat**. For other installation options, check out [this](https://github.com/vi/websocat#installation) list.
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

Boy, it is always such fun to do it. Like seriously, I always have fun playing with APIs, any APIs. Just making this API "conversation". I hope nothing is wrong with me :sweat_smile:

Now you know how to interact with the Kraken API. Now let's try to describe it using AsyncAPI.

### Describing API using AsyncAPI

I'll explain, in detail, how to describe Websocket API with AsyncAPI in another blog post that will be part of the series. Why? I don't want to make this post super lengthy and discourage others from reading it. Let us learn step by step. 

For now, I will throw here a full AsyncAPI document I created for the Kraken API. You can also open it up in the [AsyncAPI Studio](https://studio.asyncapi.com/?url=https://gist.githubusercontent.com/derberg/4e419d6ff5870c7c3f5f443e8bd30535/raw/5e9b733b80a0209ba5520e5f41ab18c2a112e0a9/asyncapi-websocket-kraken.yml) and compare with their [current documentation](https://docs.kraken.com/websockets/)

Familiarize with below before you look at the AsyncAPI document:
- AsyncAPI describes the API interface between the client and the server. In other words, the AsyncAPI document is for the user of the API. It does not describe what the server does but what the user can do with the API.
- Kraken API is quite complex. It has some beta servers, some private messages, and messages closely related to vocabulary specific for currency trading. I dropped all of those from my research not to overcomplicate things. In other words, the AsyncAPI file that you can see below is not a complete document.
- Websocket protocol is very flexible, and therefore you can implement the server in many different ways. There is no standard way of doing things, like there is no common way of doing things with AsyncAPI. We can only make some generic assumptions looking at existing implementations:
  - Your server has one entry point, just one endpoint that you communicate with to gain access to the API. It can be a [path with some dynamic values](https://ik.imagekit.io/ably/s3/xchg_products/async_api_specs/000/000/019/original/weather.yaml), as some data id. It can also be nothing, no path at all, like in the case of below Kraken API. These entry points are **channels** in AsyncAPI document. Commonly, Websocket API has just one **channel** that user can send messages to and receive messages at the same time
  - AsyncAPI publish and subscribe operations translates to **messages user can send to the API** and **messages user will receive from the API**. Depending on API complexity, sometimes you have an API that sends [only one message](https://ik.imagekit.io/ably/s3/xchg_products/async_api_specs/000/000/019/original/weather.yaml). You can also have a situation where you can send to the server multiple different messages, and also receive different messages in response. This is when you need to use **oneOf** as I did in document for Kraken API.
- Current AsyncAPI limitation is that you cannot specify that once the user sends (publish) message **ping**, the **pong** message is a reply. Look at this [thread](https://github.com/asyncapi/spec/issues/94) to participate in an ongoing discussion about request/reply pattern support in AsyncAPI. In the below document, you will notice that for such a use case, I use AsyncAPI specification extensions (**x-response**).

> **Message to Kraken API developers and technical writers** <br/>
In case you want to continue the work I started on the AsyncAPI document for Kraken API, feel free to do that. I'm happy to help, just let me know. Reach me out in our [AsyncAPI Slack workspace](https://www.asyncapi.com/slack-invite/).

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

> **Personal note** <br/>
If you can, if you are in a planning phase, new project, etc., then start designing your architecture with AsyncAPI. Don't do the mistake of coding first and then trying to figure out how to describe it with AsyncAPI :sweat_smile:

Stay tuned for the next blog post that guides you step by step through the above document :peace_symbol:

> I recommend you also read another article from the series about WebSocket: [Creating AsyncAPI for WebSocket API - Step by Step](/blog/websocket-part2).

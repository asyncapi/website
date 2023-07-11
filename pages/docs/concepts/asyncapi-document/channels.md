---
title: Adding Channels
weight: 20
---

## Purpose of Channels

Channels play a fundamental role in describing the mechanics of the messaging involved in asynchronous communication. They function as communication lines between different components of an application, acting as the paths where messages travel from one component (the 'publisher') to another (the 'subscriber').

Channels are identified by unique names which represent different topics or streams in the applications. These names can be seen as addresses that the messages use for navigation. Each channel corresponds to a specific type of message and its corresponding operations (publish, subscribe). It is kind of like mailboxes for messages, each having a unique purpose and name.

Even though AsyncAPI spec 3.0 is still in development and there isn't specific information about changes to channels, it's expected that users will continue defining their operations and message structures under their defined channels. This involves detailing the structure of the messages that are being sent or received on these channels, and the operations that can be performed, which brings clarity and predictability when building or working with APIs. It standardizes how the messaging should occur, thereby preventing any possible confusion or misunderstandings regarding the flow of data.

Here's an example of how to define channels -

```yml
channels: 
  user/signedup: 
    subscribe: 
      message: 
        $ref: '#/components/messages/UserSignedUp'
```

## Relationship between Channels and Servers

Servers represent the physical points where an application will receive or send events. Channels, on the other hand, represent the logical points for these asynchronous event-driven communications.

Here's an example on how channels and servers can be intertwined:

```yml
servers:
  production:
    url: api.company.com/v1
    protocol: https
channels:
  user/signup:
    subscribe:
      message:
        $ref: "#/components/messages/UserSignedUp"
    servers:
      - production
```

In this YAML file, there's a server called production with a specific URL and protocol. There's also one channel named user/signup, which specifies that applications can subscribe to it to receive 'UserSignedUp' messages. The servers attribute under the channel indicates that this particular channel is available only on the production server.

This way, if a channel and server is specified, it's expected that the given channel is present on all servers unless specified otherwise.

## Channel Availability on Specific Servers

In AsyncAPI, a channel's presence on specific servers is articulated within the documentation of the API. This is crucial because it provides granular control over the distribution of message routing, allowing different parts of the system to host different channels according to the system's requirements.

To specify that a channel is only present on certain servers, one can enumerate those servers under an attribute called 'servers' within that specific channel's definition in the AsyncAPI document.

Here is an example of how you might specify that a channel is available only on certain servers:

```yml
servers:
  serverA:
    url: serverA.example.com
    protocol: mqtt
  serverB:
    url: serverB.example.com
    protocol: mqtt

channels:
  user/created:
    publish:
      message:
        $ref: '#/components/messages/UserCreated'
    servers:
    - serverA 

  order/placed:
    subscribe:
      message:
        $ref: '#/components/messages/OrderPlaced'
    servers:
    - serverB
```

In this example, user/created channel is present only on serverA and order/placed channel is only present on serverB. This segregation is indicated by providing a list of servers under servers for each channel.

So, when one specify a channel and servers, it allows the AsyncAPI document to clarify where each channel can be found. This is particularly beneficial in complex systems where different servers might be responsible for different sets of operations.

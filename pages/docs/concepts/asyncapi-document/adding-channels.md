---
title: Adding Channels
weight: 60
---

Adding [channels](../channel) in AsyncAPI specification allows organizing and categorizing messages, routing messages to the appropriate consumers, decoupling producers and consumers, scaling and extending the API, and providing clear documentation and communication about API's communication patterns. Additionally, alternative names for channels can be user-defined to suit specific context and preferences.

Here is a diagram to describe adding channels:

```mermaid
graph LR
  A[AsyncAPI Specification]
  B[Channels]
  C[Organizing and Categorizing Messages]
  D[Routing Messages to Consumers]
  E[Decoupling Producers and Consumers]
  F[Scaling and Extending the API]
  G[Providing Clear Documentation and Communication]

  style B fill:#47BCEE,stroke:#47BCEE;
  
  A --> B
  B --> C
  B --> D
  B --> E
  B --> F
  B --> G

```

The diagram above represents the flow of communication between producers, channels, consumers, and messages.

Here is an example of how to define channels:

```yml
userSignedUp:
  address: 'user.signedup'
  messages:
    userSignedUp:
      $ref: '#/components/messages/userSignedUp'
```

This AsyncAPI specification sets up an interface for a `userSignedUp` channel, where the `address` field holds the actual address of the channel (`user.signedup`).

## Channel server relationship

Channels and [servers](../server) have a close relationship in asynchronous messaging systems. Channels act as message communication pathways, while servers generate and publish messages to these channels. Channels serve as logical destinations where messages are organized based on purpose or topic. Acting as producers, Servers generate messages and publish them to specific channels. Consumers, including servers, send to channels to receive messages. Channels ensure that messages are routed to the appropriate consumers based on their subscriptions. This relationship between channels and servers forms the foundation for building scalable and flexible messaging systems.

Here is a diagram to show the relationship between channels and servers:

```mermaid
graph TD
  subgraph Servers
    s1(Servers)
    s2(Servers)
  end

  subgraph Channels
    c1{Channels}
  end

  style c1 fill:#47BCEE,stroke:#47BCEE;

  s1 --> c1
  s2 --> c1
  c1 --> s1
  c1 --> s2
```

In this diagram, channels serve as communication pathways, receiving messages from servers and routing them to consumers, while servers generate and publish messages to these channels.

### Channel availability on specific servers

A channel can be designed to be available on all servers, which means that the channel is globally accessible, allowing messages published to it to reach all connected clients, regardless of their server connection.

Here is a diagram showing a channel is available on multiple servers and accessible by multiple clients:

```mermaid
graph TD
  subgraph Clients
    c1(Client 1)
    c2(Client 2)
    c3(Client 3)
  end

  subgraph Servers
    s1(Server 1)
    s2(Server 2)
    s3(Server 3)
  end

  subgraph Channel
    ch(Channel)
  end

  style ch fill:#47BCEE,stroke:#47BCEE;

  c1 --- ch
  c2 --- ch
  c3 --- ch

  s1 --- ch
  s2 --- ch
  s3 --- ch
```

In the above diagram, messages published to the channel to reach all connected clients, regardless of their server connection.

Here is an example of how you might specify that a channel is available only on specific servers:

```yml
channels:
  userSignedUp:
    address: user/signedup
    messages:
      userSignedUp:
        description: An event describing that a user just signed up.
servers:
  serverA:
    url: serverA.example.com
  serverB:
    url: serverB.example.com
```

The above code defines a channel `user/signedup` for subscribing to user signup events and two servers, `Server A` and `Server B`, with their respective URLs, enabling clients to receive user signup notifications from either server.

Specifying a channel and servers allows the AsyncAPI document to clarify where each channel can be found. This method is particularly beneficial in complex systems where different servers might be responsible for different operations.

### Multiple channels in single server

Having multiple channels in one server allows for better organization and management of different events or messages within the same server instance, providing a more modular and scalable architecture for handling various functionalities. It enables clients to send to specific channels based on their interests or requirements, ensuring efficient message delivery and reducing complexity in the overall system design.

Here is a diagram showing a single server hosting multiple channels:

```mermaid
graph TD
  subgraph Server
    s1(Server)
  end

  subgraph Channels
    c1{Channel 1}
    c2{Channel 2}
    c3{Channel 3}
  end

  style c1 fill:#47BCEE,stroke:#47BCEE;
  style c2 fill:#47BCEE,stroke:#47BCEE;
  style c3 fill:#47BCEE,stroke:#47BCEE;

  s1 --> c1
  s1 --> c2
  s1 --> c3
```

Hosting multiple channels in single server allows user to organize and manage better in case for multiple events or messages by facilitating modular and scalable system architecture.

Here is an example of multiple channels available on specific servers:

```yml
channels:
  userSignedUp:
    address: user/signedup
    messages:
      userSignedUp:
        description: An event describing that a user just signed up.
  userActivated:
    address: user/activated
    messages:
      userActivated:
        description: An event describing that user activation events.      
servers:
  serverA:
    url: serverA.example.com
```

The YAML code defines multiple channels, `user/signedup` and `user/activated`, within the `serverA` server, enabling clients to subscribe and receive user signup and activation events.

To know more details on how to add server check [add servers](add-server).

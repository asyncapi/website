
## What is a server?
A server is a representation of a messaging broker system where connections and communication between a producer and a consumer is established. Unlike traditional API servers which are dependent on request/response, message broker interactions occur back and forth over different channels.

## What is the purpose of servers?
Servers play an important role as they maintain a relationship between producers and consumers. When designing and setting up an event-driven application, servers are in charge of delivering asynchronous messages from the producer to the consumers through the use of channels. With the integration of different messaging protocols, servers can transmit and exchange messages between clients.

* Clients and Server
```mermaid
flowchart TD
    a[Client Browser] --> b[(server)]
    b --> a
    c[Client Mobile] --> b[(server)]
    b --> c 
```
The diagram above describes a bi-directional relationship between `clients` and `server`. When we create an AsyncAPI `server` file, the AsyncAPI server object holds information that includes the physical location of the `server`.


* Broker Centric
```mermaid
flowchart TD
    A[producer]
    A --> a1[channel1]
    A --> a2[channel2]
    subgraph one[broker]
    a1
    a2
    end
    a1 --> B[consumer1]
    a2 --> C[consumer2]
```
The above diagram shows the *Broker Centric Architecture*. We create 3 AsyncAPI document for `producer`, `consumer1`, and `consumer2`. The information provided for these AsyncAPI files comes directly from the `broker` which is a representation of a `server`.

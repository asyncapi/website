---
title: Adding Channels
weight: 20
---

## Purpose of Channels

- Explanation of how channels allow publishers and subscribers to communicate with each other.
- Discussion of how channels facilitate decoupling between producers and consumers.
- Explanation of how channels enable message routing in a publish-subscribe system.

## Different Names for Channels

- Overview of the various naming schemes that can be used for channels (e.g., topic, queue, stream).
- Discussion of how these different naming schemes affect message delivery semantics.

## Defining Channels

- Explanation of how users can define channels in an AsyncAPI document.
- Discussion of the various properties that can be specified for a channel (e.g., description, parameters, bindings).

## Channel Availability on Specific Servers

- Explain how a channel can be specified to be present only on certain servers using the servers field in the Channel Item Object (github.com)
- Provide an example of defining a channel that is only available on specific servers (github.com)

## Channel Parameters

- Explain the use of parameters in channel names and how to define them in the AsyncAPI document (github.com)
- Provide an example of a channel with parameters (github.com)

## Example Channel

- A simple example of a channel definition in an AsyncAPI document.
- Explanation of how the channel relates to a server, and how it is expected to be present on all servers.
- Discussion of how a channel can specify that it is only present on certain servers.

## Conclusion

- Recap of the importance of channels in AsyncAPI.
- Final thoughts on best practices for defining channels in an AsyncAPI document.
  
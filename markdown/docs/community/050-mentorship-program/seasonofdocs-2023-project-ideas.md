---
title: 2023 GSoD Accepted Projects
weight: 110
---

# 2023 GSoD Accepted Projects 

# 🙌🏾  Bridge AsyncAPI Document Knowledge Gaps & Build Interactive Learning Paths

### First project: cover AsyncAPI document sections in detail
First, the AsyncAPI documentation needs more in-depth explanations of the different sections of an AsyncAPI document to avoid difficulties in implementing EDAs. 

Here are the individual sections of an AsyncAPI document we need to cover:
- **AsyncAPI structure** - Introduce all root elements, add short explanation of info, servers, channels, components, and their purpose.
- **Adding variables to URL** - Explain how to add variables to the server URL when parts of the URL may be different per runtime. Explain how these can be reused between two servers via `components.serverVariables`.
- **Adding channel** - Explain the purpose of channels, different names for it, and what users should put here. Add a simple channel there, and explain how it relates to the server. If you specify a channel and server, it is expected that a given channel is present on all servers. Explain that the channel can also specify that it is present only on server A or server B.
- **Specifying dynamic parts of channel name** - Explain how to use and reuse parameters.
- **Adding operations** - Introduce operations, how many there can be, what kind of, and their purpose, and explain pub/sub.
- **Securing operations** - Explain that server security applies to all the operations in all channels. Still, if you have different security per operation, you can use the `security` prop at the operation level.
- **Adding messages** - Add a simple message as in previous examples, explain the most important parts, and explain there can be one or multiple (`oneOf`) under operation. Talk about `contentType` and add a note about `defaultSchema`. Also, show how to reuse components.
- **Payload schema** - More complex message example with payload added using JSON and Avro schemas, and explain how to specify them. Explain how to reuse schema from components.
- **AsyncAPI reusable parts** - Explain the `$ref` concept, introduce and explain that `$ref` can point to the same document, other documents in a local system, and external URLs.
- **Reuse with traits** - Explain how trait concepts work.
- **Organizing document with tags** - Explain different tags info in different parts of AsyncAPI and their purpose.
- **Extending AsyncAPI specification** - Explain what to do when the specification does not yet support something you need, some field is missing, and more.
- **Adding bindings** - Add a protocol-specific, additional info to AsyncAPI docs in different parts of the document, like server, or channel or message, to specify thing that are common only for given protocol.
- **Adding servers** - Add information about where to connect, to what server to interact with the app.
- **Adding servers security** - Add security details to servers.
- **Add reply info** - Add info about reply to a message; explain that one is when reply is known and hardcoded in spec and the second one is dynamic.

### Second project: Interactive Learning Paths
Second, our only educational content is static AsyncAPI documentation; the community needs more engaging and interactive ways to learn AsyncAPI concepts and architecture. To make learning AsyncAPI more accessible and enjoyable, we propose creating interactive learning paths that incorporate best practices. Our solution is to create interactive learning paths with engaging videos, gamification elements, immersive storylines with eLearning characters, badges, quizzes, points systems, etc.

By integrating these elements, we aim to make the learning experience more enjoyable and rewarding for the entire community. We can have videos that showcase AsyncAPI in action and visual animations of AsyncAPI spec terms and architecture. We'd love to create a  learning experience that is useful, fun, and interactive! The first learning paths would also be able to re-purpose content from the current AsyncAPI Docs content buckets of tutorials and concepts, which were created thanks to GSoD 2022.

In addition, we can create said interactive learning paths on the current [Killercoda AsyncAPI profile](https://killercoda.com/asyncapi/), or even host them with [Linux Foundation interactive content](https://www.edx.org/school/linuxfoundationx). 


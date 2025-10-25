---
title: Season of Docs 2023
weight: 100
---

# Status: Accepted and GSoD Program has Started

## 🙌🏾  Bridge AsyncAPI Document Knowledge Gaps & Build Interactive Learning Paths

### 🔎 Our current Docs problems
### First solution: cover AsyncAPI document sections in detail
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

### Second solution: Interactive Learning Paths
Second, our only educational content is static AsyncAPI documentation; the community needs more engaging and interactive ways to learn AsyncAPI concepts and architecture. To make learning AsyncAPI more accessible and enjoyable, we propose creating interactive learning paths that incorporate best practices. Our solution is to create interactive learning paths with engaging videos, gamification elements, immersive storylines with eLearning characters, badges, quizzes, points systems, etc.

By integrating these elements, we aim to make the learning experience more enjoyable and rewarding for the entire community. We can have videos that showcase AsyncAPI in action and visual animations of AsyncAPI spec terms and architecture. We'd love to create a  learning experience that is useful, fun, and interactive! The first learning paths would also be able to re-purpose content from the current AsyncAPI Docs content buckets of tutorials and concepts, which were created thanks to GSoD 2022. 

In addition, we can create said interactive learning paths on the current [Killercoda AsyncAPI profile](https://killercoda.com/asyncapi/), or even host them with [Linux Foundation interactive content](https://www.edx.org/school/linuxfoundationx). 


### 🎯 Our Docs project’s scope
As a result, AsyncAPI is proposing two projects for the Google Season of Docs 2023:
1. **Interactive Learning Paths:** Our proposed solution aims to make learning AsyncAPI more enjoyable and accessible, reducing the learning curve and accelerating technology adoption by building interactive learning paths. By integrating best practices such as videos, gamification elements, immersive storylines, badges, quizzes, and a points systems in our learning paths, we can make the learning experience more rewarding and help OSS communities build better event-driven architectures with confidence.
2. **Document the AsyncAPI document sections in detail:** We will document the 12 sections of an AsyncAPI document, providing examples and use cases to help users understand how to code each section. By providing this information, we aim to improve the overall usability of the AsyncAPI document and make it easier for users to implement Event-Driven Architectures.


### 📏 Measuring our Docs project’s success
We will partially measure success in the Docs project by capturing specific feedback about these changes via our [Docs feedback card](https://github.com/asyncapi/website/issues/453), how many new OSS Docs contributors we gain from this effort, and by measuring engagement via our Docs analytics. 

We will also track the number of views, likes, and shares of any new videos to measure user engagement. We'll even monitor user feedback to continue improving our videos further.


### ⌛ Timeline
The project will take approximately 4-6 months to complete, depending on the different levels of knowledge from diverse technical writers (TW) that might get involved. (At AsyncAPI, we want to work with any TW, regardless of their years of experience. We have a passion for mentorship, and we do not wish to have a bar that would prevent any TW from contributing to our OSS Initiative. We look forward to mentoring TW(s) who are completely new to tech and making them feel welcome!) 

The timeline would look as follows:
- **May:** Orientation on how to contribute to AsyncAPI Initiative, organize Docs issues, and assign good `first-time-tickets` to get each new TW contributor started. 
- **June - August:**	Each TW goes through designated issues marked for first-time contributors and work set aside for `GSoD 2023`. Each TW starts creating documentation for the issues assigned/selected. 
- **September - October:** We determine if we can complete both projects successfully and re-align priorities as needed.
- **November- early December:**	Project completion and GSoD contributors receive some swag! 


### 💸 Project budget
We'll set aside 2-3 mentors for our two proposed projects: documenting the AsyncAPI document sections in detail and creating educational videos. Should we be selected, AsyncAPI would like to request from Google a US $5000 budget for each project. For both projects, the request then totals a $10,000 budget. That said, we would also like to request an additional $350 dollars in our budget to provide cool swag for participants.

| **Budget item**                                                                                      | **Total Amount** |
|------------------------------------------------------------------------------------------------------|------------------|
| Technical writer updates, reviews, edits AsyncAPI Interactive Learning Paths.  | $5000            |
| Technical writer updates, reviews, and edits AsyncAPI documentation section details.  | $5000            |
| Award swag to selected Technical Writers  | $350            |
| **TOTAL**                 | $10,350            |

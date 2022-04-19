---
title: "AsyncAPI Tooling: update 1"
date: 2022-04-13T18:00:00+01:00
type: Communication
tags:
  - Project Status
  - Tooling Status
cover: /img/posts/tooling-update.webp
authors:
  - name: Jonas Lagoni
    photo: /img/avatars/jonaslagoni.webp
    link: https://github.com/jonaslagoni
    byline: AsyncAPI Maintainer
excerpt: 'A short update on what has happened since the last update of AsyncAPI tooling.'
featured: true
---

This is another update on what happened in our tools that help developers develop EDAs and APIs! :fire: 

The previous two updates can be found here: [January](https://gist.github.com/jonaslagoni/4a0117e1432936b89e05b6a509d94259) and [February](https://gist.github.com/jonaslagoni/185890cd7e84ed95c14b8f0556788b7b). Going forward, I will instead add new updates via blog posts. If you have any remarks or if something is missing, you can [suggest changes through the website repository](https://github.com/asyncapi/website/tree/master/pages/blog/tooling-update-1.md). 

If you want to include updates from your personal tooling, the [next blog post can be found here](https://github.com/asyncapi/website/pull/662), just leave a comment with the updates you want included.

## In focus
[In January I opened up a discussion around potential changes](https://github.com/asyncapi/community/discussions/237) to the AsyncAPI roadmap to change the focus towards the entire lifecycle of APIs instead of only tooling to create APIs. Please do have a look and let us know what you think, as I will start to drive this change soon!

This means these tooling update blogs, will focus on the roadmap and goals to push them forward.

## Improvements
This post bundles updates from the following official tools: [bundler](https://github.com/asyncapi/bundler), [chatbot](https://github.com/asyncapi/chatbot), [studio](https://github.com/asyncapi/studio), [diff](https://github.com/asyncapi/diff), [glee](https://github.com/asyncapi/glee), [create-glee-app](https://github.com/asyncapi/create-glee-app), [cli](https://github.com/asyncapi/cli), [optimizer](https://github.com/asyncapi/optimizer), [modelina](https://github.com/asyncapi/modelina), [generator](https://github.com/asyncapi/generator), [generator-react-sdk](https://github.com/asyncapi/generator-react-sdk), [java-template](https://github.com/asyncapi/java-template), [java-spring-cloud-stream-template](https://github.com/asyncapi/java-spring-cloud-stream-template), [java-spring-template](https://github.com/asyncapi/java-spring-template), [dotnet-nats-template](https://github.com/asyncapi/dotnet-nats-template), [ts-nats-template](https://github.com/asyncapi/ts-nats-template), [java-template](https://github.com/asyncapi/java-template).

### Studio
- [magicmatatjahu](https://github.com/magicmatatjahu) [added a new modal for when you are redirected from the old Playground to ease the transition for users](https://github.com/asyncapi/studio/pull/282) 

### CLI
- [ron-debajyoti](https://github.com/ron-debajyoti) [changed the way incorrect flags and commands are handled to improve user experience](https://github.com/asyncapi/cli/pull/243)
- [Souvikns](https://github.com/Souvikns) [changed the core oclif library to a fork to improve logging](https://github.com/asyncapi/cli/pull/254). 

### .NET Nats template
- [YoeriVD](https://github.com/YoeriVD) [added a missing project reference to test project](https://github.com/asyncapi/dotnet-nats-template/pull/228)
- [YoeriVD](https://github.com/YoeriVD) [switched the generated code to using .NET Standard instead of .NET Core.](https://github.com/asyncapi/dotnet-nats-template/pull/229)

### Java spring cloud stream template
- [CameronRushton](https://github.com/CameronRushton) [fixed a problem with union types in Avro schemas generating incorrect code](https://github.com/asyncapi/java-spring-cloud-stream-template/pull/250). 
- [CameronRushton](https://github.com/CameronRushton) [fixed a problem where Avro schemas with namespaces was not correctly used](https://github.com/asyncapi/java-spring-cloud-stream-template/pull/246).
- [CameronRushton](https://github.com/CameronRushton) [added a missing import](https://github.com/asyncapi/java-spring-cloud-stream-template/pull/244).
- [CameronRushton](https://github.com/CameronRushton) [fixed generation failed when payload schemas had an `$id` field](https://github.com/asyncapi/java-spring-cloud-stream-template/pull/241).

### Glee
- [sudoshreyansh](https://github.com/sudoshreyansh) [when Glee detect invalid returned data it is now logged](https://github.com/asyncapi/glee/pull/273)
- [sudoshreyansh](https://github.com/sudoshreyansh) [added a bunch of more missing tests](https://github.com/asyncapi/glee/pull/266)

### Optimizer
- [KhudaDad414](https://github.com/KhudaDad414) [refactored the parsing process to easer add new paths used for optimization](https://github.com/asyncapi/optimizer/pull/85)

### Go Watermill template
- [anandsunderraman](https://github.com/anandsunderraman) [added support for AMQP publisher](https://github.com/asyncapi/go-watermill-template/pull/137)

### Modelina
- [Samridhi-98](https://github.com/Samridhi-98) [fixed Java preset options was not added as type](https://github.com/asyncapi/modelina/pull/716)
- [Samridhi-98](https://github.com/Samridhi-98) [fixed Javascript preset options was not added as type](https://github.com/asyncapi/modelina/pull/709)
- [Samridhi-98](https://github.com/Samridhi-98) [fixed TypeScript preset options was not added as type](https://github.com/asyncapi/modelina/pull/703)
- [Samridhi-98](https://github.com/Samridhi-98) [fixed some broken links in the documentation](https://github.com/asyncapi/modelina/pull/684)
- [Samridhi-98](https://github.com/Samridhi-98) [ensured that reserved keywords cannot be rendered for Go](https://github.com/asyncapi/modelina/pull/653)
- [slowikowskiarkadiusz](https://github.com/slowikowskiarkadiusz) [added support for shorthand accessors for C# classes](https://github.com/asyncapi/modelina/pull/671)
- [slowikowskiarkadiusz](https://github.com/slowikowskiarkadiusz) [added support for different collection types for C# list properties](https://github.com/asyncapi/modelina/pull/669)
- [ibernabeudev](https://github.com/ibernabeudev) [added enum rendering to Go](https://github.com/asyncapi/modelina/pull/662)
- [jonaslagoni](https://github.com/jonaslagoni) [added new core model and started the refactoring](https://github.com/asyncapi/modelina/pull/655), see more on the [`next` branch](https://github.com/asyncapi/modelina/tree/next)

### Simulator
- [NektariosFifes](https://github.com/NektariosFifes) [added the initial setup for the electron application](https://github.com/asyncapi/simulator/pull/103), that will serve as a dashboard for simulation 

### Generator
- [magicmatatjahu](https://github.com/magicmatatjahu) [fixed ts-node would use multiple instances](https://github.com/asyncapi/generator/pull/764)


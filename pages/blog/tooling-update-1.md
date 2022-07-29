---
title: "AsyncAPI Tooling update - 1"
date: 2022-07-29T18:00:00+01:00
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
excerpt: 'An update on what has happened around AsyncAPI tooling in the past ~4 months'
featured: true
---

This is meant as an update on what happened in the AsyncAPI tooling landscape. The previous two updates can be found here: [January](https://gist.github.com/jonaslagoni/4a0117e1432936b89e05b6a509d94259) and [February](https://gist.github.com/jonaslagoni/185890cd7e84ed95c14b8f0556788b7b). Going forward, these updates will be added as community blog posts. If you have any remarks or if something is missing, you can [suggest changes through the website repository](https://github.com/asyncapi/website/tree/master/pages/blog/tooling-update-1.md). 

If you want to include updates from your personal tools, the [next blog post PR can be found here](https://github.com/asyncapi/website/pull/662), just leave a comment with the updates you want to be included.

> This post bundles updates from the following official tools, but not limited to: [bundler](https://github.com/asyncapi/bundler), [chatbot](https://github.com/asyncapi/chatbot), [studio](https://github.com/asyncapi/studio), [diff](https://github.com/asyncapi/diff), [glee](https://github.com/asyncapi/glee), [create-glee-app](https://github.com/asyncapi/create-glee-app), [cli](https://github.com/asyncapi/cli), [optimizer](https://github.com/asyncapi/optimizer), [modelina](https://github.com/asyncapi/modelina), [generator](https://github.com/asyncapi/generator), [generator-react-sdk](https://github.com/asyncapi/generator-react-sdk), [java-template](https://github.com/asyncapi/java-template), [java-spring-cloud-stream-template](https://github.com/asyncapi/java-spring-cloud-stream-template), [java-spring-template](https://github.com/asyncapi/java-spring-template), [dotnet-nats-template](https://github.com/asyncapi/dotnet-nats-template) and [ts-nats-template](https://github.com/asyncapi/ts-nats-template).

## Highlights
This is some of the highlights of changes which have happened the tools and whats to come!

### CLI
There is a lot of effort being put into the CLI to incorporate the many tools we have, so you have the power of each tools right at your fingertip. 

[peter-rr](https://github.com/peter-rr) [integrated the Converter](https://github.com/asyncapi/cli/pull/188) so you can now easily upgrade your AsyncAPI documents on new spec versions. This can be done through `asyncapi convert ./asyncapi.json 2.4.0`.

[jonaslagoni](https://github.com/jonaslagoni) [integrated Modelina](https://github.com/asyncapi/cli/pull/173) to give you the possibility of generate typed data models for your message payloads. This can be done through `asyncapi generate models typescript ./asyncapi.json --output='./output'`.

Soon you will be able to use [the generator](https://github.com/asyncapi/cli/pull/221), [optimize AsyncAPI documents](https://github.com/asyncapi/cli/pull/255), [find and show relations in multiple AsyncAPI documents](https://github.com/asyncapi/cli/pull/143) and [show difference between AsyncAPI documents](https://github.com/asyncapi/cli/pull/295). 

If you have other ideas to what the CLI tool should do, don't hesitate to [create a feature request](https://github.com/asyncapi/cli/issues/new?assignees=&labels=enhancement&template=enhancement.md)!

### Glee
Glee now [automatically generate documentation for you](https://github.com/asyncapi/glee/pull/318)! 

There is also a focus on supporting more and more protocols, currently [WebSocket Client](https://github.com/asyncapi/glee/pull/319) is in the works and more lined up such as [AMQP](https://github.com/asyncapi/glee/issues/258), [Kafka](https://github.com/asyncapi/glee/issues/256) and [HTTP client and server](https://github.com/asyncapi/glee/issues/260) just waiting to be picked up. If you want a protocol you use to be supported please reach out!

### Modelina
Some huge changes have happened over the last months, which all got triggered by [a new core model](https://github.com/asyncapi/modelina/pull/655) to fix many of the internal problems that the old model caused and immensely improves developer experience by simplifying the generators. All of these changes are happening on the [`next` branch](https://github.com/asyncapi/modelina/tree/next) and will be a pre-release until released as version 1! Currently you can test out the new changes by switching to version `1.0.0-next.1`.

It has become really easy to [customize the types](https://github.com/asyncapi/modelina/tree/next/examples/change-type-mapping) of the models:

```ts
const generator = new TypeScriptGenerator({
  typeMapping: {
    String: ({constrainedModel, options, propertyKey}) => {
      return 'my custom type for strings';
    }
  }
});
```

Also super easy to change the naming formats, for example for model names if you wanted their names to be CONSTANT CASE its as simple as changing the constraint:
```ts
const generator = new TypeScriptGenerator({
  constraints: {
    modelName: typeScriptDefaultModelNameConstraints({
      NAMING_FORMATTER: (name) => {
        return constantCase(name);
      }
    })
  }
});
```

Modelina also [now support Dart](https://github.com/asyncapi/modelina/pull/658) thanks to [rmasarovic](https://github.com/rmasarovic)! Soon there will also be support for [a Rust generator](https://github.com/asyncapi/modelina/pull/818) and [a Python generator](https://github.com/asyncapi/modelina/pull/604).

## Full changelog
Fixes and changes that was did not fit into highlights

#### CLI
- [ron-debajyoti](https://github.com/ron-debajyoti) [changed the way incorrect flags and commands are handled to improve user experience](https://github.com/asyncapi/cli/pull/243)
- [Souvikns](https://github.com/Souvikns) [changed the core oclif library to a fork to improve logging](https://github.com/asyncapi/cli/pull/254). 
- [peter-rr](https://github.com/peter-rr) [extended the error handling for `validate`](https://github.com/asyncapi/cli/pull/292)
- [pranay202](https://github.com/pranay202) [fixed incorrect help message displayed for context](https://github.com/asyncapi/cli/pull/294) 
- [jonaslagoni](https://github.com/jonaslagoni) [fixed a problem where oclif logging function throw an error when trying to generate models](https://github.com/asyncapi/cli/pull/307)
- [derberg](https://github.com/derberg) [fixed a problem where assets was uploaded to wrong release](https://github.com/asyncapi/cli/pull/300)
- [derberg](https://github.com/derberg) [removed a script that was left over and causing problems](https://github.com/asyncapi/cli/pull/298)
- [derberg](https://github.com/derberg) [made sure `.pkg` files for MacOS got released and each release automatically update brew formula](https://github.com/asyncapi/cli/pull/187)
- [magicmatatjahu](https://github.com/magicmatatjahu) [added support for AsyncAPI 2.4.0](https://github.com/asyncapi/cli/pull/276)
- [KhudaDad414](https://github.com/KhudaDad414) [removed custom CONTRIBUTING.md file to use the generic one](https://github.com/asyncapi/cli/pull/272)
- [imabp](https://github.com/imabp) [made sure unhandled rejections are thrown as error for Node < 15](https://github.com/asyncapi/cli/pull/238)
- [ritik307](https://github.com/ritik307) [made sure studio command throws correct error when invalid file path is used](https://github.com/asyncapi/cli/pull/245)
- [aayushmau5](https://github.com/aayushmau5) [added support for yaml output for the `diff` command](https://github.com/asyncapi/cli/pull/240)
- [amanbedi1](https://github.com/amanbedi1) [switched the CLI banner](https://github.com/asyncapi/cli/pull/258)

#### Simulator
- [NektariosFifes](https://github.com/NektariosFifes) [added the initial setup for the electron application](https://github.com/asyncapi/simulator/pull/103), that will serve as a dashboard for simulation 

#### Generator
- [magicmatatjahu](https://github.com/magicmatatjahu) [fixed ts-node would use multiple instances](https://github.com/asyncapi/generator/pull/764)
- [pratik2315](https://github.com/pratik2315) [started to rework the documentation by creating an initial outline](https://github.com/asyncapi/generator/pull/793)
- [lkmandy](https://github.com/lkmandy) [fixed a broken link in the documentation to semver syntax](https://github.com/asyncapi/generator/pull/782)
- [pavlikm](https://github.com/pavlikm) [fixed a depreciated import for simple-git](https://github.com/asyncapi/generator/pull/775)
- [mcturco](https://github.com/mcturco) [switched the generator banner](https://github.com/asyncapi/generator/pull/766)
- [SP-SuperPoney](https://github.com/SP-SuperPoney) [added dotnet-nats-template to the list of templates](https://github.com/asyncapi/generator/pull/760)
#### Generator React SDK
- [mcturco](https://github.com/mcturco) [switched the banner](https://github.com/asyncapi/generator-react-sdk/pull/134)

#### Java template
- [ppatierno](https://github.com/ppatierno) [changed the default Java package](https://github.com/asyncapi/java-template/pull/39)
- [dalelane](https://github.com/dalelane) [fixed support for AsyncAPI documents with only publish or subscribe](https://github.com/asyncapi/java-template/pull/33)
- [inspire99](https://github.com/inspire99) [updated the banner](https://github.com/asyncapi/bundler/pull/32)

#### Java Spring Template

- [Sihamtahi](https://github.com/Sihamtahi) [fixed the link for test documents](https://github.com/asyncapi/java-spring-template/pull/209)
- [KhudaDad414](https://github.com/KhudaDad414) [fixed all broken links in the documentation](https://github.com/asyncapi/java-spring-template/pull/219) 
- [Tenischev](https://github.com/Tenischev) [fixed an issue with generated tests not being able to run](https://github.com/asyncapi/java-spring-template/pull/194)
- [Tenischev](https://github.com/Tenischev) [added support for multiple message](https://github.com/asyncapi/java-spring-template/pull/179)
- [Tenischev](https://github.com/Tenischev) [added support for additional data types](https://github.com/asyncapi/java-spring-template/pull/210)
- [Tenischev](https://github.com/Tenischev) [added information about AnonymousSchema to avoid confusion](https://github.com/asyncapi/java-spring-template/pull/211)

#### Optimizer
- [KhudaDad414](https://github.com/KhudaDad414) [refactored the parsing process to easer add new paths used for optimization](https://github.com/asyncapi/optimizer/pull/85)
- [mcturco](https://github.com/mcturco) [switched the optimizer banner](https://github.com/asyncapi/optimizer/pull/91)

#### Bundler
- [MrYugs](https://github.com/MrYugs) [fixed the usage example to use default export](https://github.com/asyncapi/bundler/pull/53)
- [amanbedi1](https://github.com/amanbedi1) [updated the Bundler banner](https://github.com/asyncapi/bundler/pull/33)

#### Go Watermill template
- [anandsunderraman](https://github.com/anandsunderraman) [added support for AMQP publisher](https://github.com/asyncapi/go-watermill-template/pull/137)
- [KhudaDad414](https://github.com/KhudaDad414) [fixed all broken links in the documentation](https://github.com/asyncapi/go-watermill-template/pull/147)

#### Studio
- [magicmatatjahu](https://github.com/magicmatatjahu) [added a new modal for when you are redirected from the old Playground to ease the transition for users](https://github.com/asyncapi/studio/pull/282) 
- [nawed2611](https://github.com/nawed2611) [ensured the modal that asks if you want to convert the AsyncAPI document to newer versions, now defaults to the latest](https://github.com/asyncapi/studio/pull/395) 
- [magicmatatjahu](https://github.com/magicmatatjahu) [added a survey popover to ask the users for feedback](https://github.com/asyncapi/studio/pull/359) 
- [magicmatatjahu](https://github.com/magicmatatjahu) [disabled a survey popover as it ended](https://github.com/asyncapi/studio/pull/385) 
- [magicmatatjahu](https://github.com/magicmatatjahu) [updated a bunch of dependency, switched to use the new JSON Schema documents for the AsyncAPI spec, and updated monaco configuration](https://github.com/asyncapi/studio/pull/352) 
- [magicmatatjahu](https://github.com/magicmatatjahu) [added support for AsyncAPI 2.4.0](https://github.com/asyncapi/studio/pull/306) 
- [Namyalg](https://github.com/Namyalg) [updated the Studio icons and banner to the new design](https://github.com/asyncapi/studio/pull/291) 
- [eltociear](https://github.com/eltociear) [fixed a typo in the Dockerfile](https://github.com/asyncapi/studio/pull/299) 
- [magicmatatjahu](https://github.com/magicmatatjahu) [updated the Studio banner](https://github.com/asyncapi/studio/pull/296) 
- [magicmatatjahu](https://github.com/magicmatatjahu) [fixed the all-contributors section as it was not compliant](https://github.com/asyncapi/studio/pull/294) 
- [magicmatatjahu](https://github.com/magicmatatjahu) [added redirects from the old `playground.asyncapi.io` to Studio](https://github.com/asyncapi/studio/pull/287) 
- [magicmatatjahu](https://github.com/magicmatatjahu) [added a modal to show what changed from the old playground, when redirected from it](https://github.com/asyncapi/studio/pull/282) 
- [magicmatatjahu](https://github.com/magicmatatjahu) [removed github-bot from codeowners file](https://github.com/asyncapi/studio/pull/280) 

#### .NET Nats template
- [YoeriVD](https://github.com/YoeriVD) [added a missing project reference to test project](https://github.com/asyncapi/dotnet-nats-template/pull/228)
- [YoeriVD](https://github.com/YoeriVD) [switched the generated code to using .NET Standard instead of .NET Core.](https://github.com/asyncapi/dotnet-nats-template/pull/229)
- [YoeriVD](https://github.com/YoeriVD) [removed some unintended comments and code left from another template](https://github.com/asyncapi/dotnet-nats-template/pull/234)
- [jonaslagoni](https://github.com/jonaslagoni) [added a missing reference that hindered compilation](https://github.com/asyncapi/dotnet-nats-template/pull/254)
- [jonaslagoni](https://github.com/jonaslagoni) [added 3 new parameters `packageVersion`, `assemblyVersion` and `fileVersion` to control the version of the library](https://github.com/asyncapi/dotnet-nats-template/pull/268)
- [jonaslagoni](https://github.com/jonaslagoni) [fixed incorrect usage of publish and subscribe](https://github.com/asyncapi/dotnet-nats-template/pull/265)
- [jonaslagoni](https://github.com/jonaslagoni) [moved an unintended character from being generated](https://github.com/asyncapi/dotnet-nats-template/pull/266)
- [jonaslagoni](https://github.com/jonaslagoni) [added a new parameter `framework` to control the targeted framework](https://github.com/asyncapi/dotnet-nats-template/pull/260)
- [jonaslagoni](https://github.com/jonaslagoni) [added a new parameter `repositoryUrl` to control the url for the library repository](https://github.com/asyncapi/dotnet-nats-template/pull/262)
- [jonaslagoni](https://github.com/jonaslagoni) [added a new parameter `projectName` to control the name of the entire library](https://github.com/asyncapi/dotnet-nats-template/pull/261)
- [Florence-Njeri](https://github.com/jonaslagoni) [fixed an incorrect link to the generator docs](https://github.com/asyncapi/dotnet-nats-template/pull/277)

#### Java spring cloud stream template
- [CameronRushton](https://github.com/CameronRushton) [fixed a problem with union types in Avro schemas generating incorrect code](https://github.com/asyncapi/java-spring-cloud-stream-template/pull/250). 
- [CameronRushton](https://github.com/CameronRushton) [fixed a problem where Avro schemas with namespaces was not correctly used](https://github.com/asyncapi/java-spring-cloud-stream-template/pull/246).
- [CameronRushton](https://github.com/CameronRushton) [added a missing import](https://github.com/asyncapi/java-spring-cloud-stream-template/pull/244).
- [CameronRushton](https://github.com/CameronRushton) [fixed generation failed when payload schemas had an `$id` field](https://github.com/asyncapi/java-spring-cloud-stream-template/pull/241).
- [damaru-inc](https://github.com/damaru-inc) [added support for AsyncAPI 2.3.0](https://github.com/asyncapi/java-spring-cloud-stream-template/pull/272)

#### Glee

- [sudoshreyansh](https://github.com/sudoshreyansh) [when Glee detects invalid returned data it is now logged](https://github.com/asyncapi/glee/pull/273)
- [sudoshreyansh](https://github.com/sudoshreyansh) [added a bunch of missing tests](https://github.com/asyncapi/glee/pull/266)
- [sudoshreyansh](https://github.com/sudoshreyansh) [fixed glee would stop working if incorrect data was was send](https://github.com/asyncapi/glee/pull/321)
- [KhudaDad414](https://github.com/KhudaDad414) [fixed all broken links in the documentation](https://github.com/asyncapi/glee/pull/288) 
- [pratik2315](https://github.com/pratik2315) [removed unnecessary broadcast section](https://github.com/asyncapi/glee/pull/287) 
- [fmvilas](https://github.com/fmvilas) [updated the Glee banner](https://github.com/asyncapi/glee/pull/278)
- [jonaslagoni](https://github.com/jonaslagoni) [removed unused node-ipc dependency](https://github.com/asyncapi/glee/pull/274)

#### Diff
- [aayushmau5](https://github.com/aayushmau5) [updated the Diff banner](https://github.com/asyncapi/diff/pull/91)
- [aayushmau5](https://github.com/aayushmau5) [integrated all-contributors](https://github.com/asyncapi/diff/pull/104)
- [aayushmau5](https://github.com/aayushmau5) [added a new features and output section to the main readme](https://github.com/asyncapi/diff/pull/107)
- [shivensinha4](https://github.com/shivensinha4) [added support for markdown output](https://github.com/asyncapi/diff/pull/90)

#### Modelina

Modelina has now been split into two branches, `master` and `next`, where `next` is the new version, targeted as version 1.0.0. 

##### These are the changes on `master`
- [Samridhi-98](https://github.com/Samridhi-98) [fixed Java preset options was not added as type](https://github.com/asyncapi/modelina/pull/716)
- [Samridhi-98](https://github.com/Samridhi-98) [fixed Go preset options was not added as type](https://github.com/asyncapi/modelina/pull/719)
- [Samridhi-98](https://github.com/Samridhi-98) [fixed C# preset options was not added as type](https://github.com/asyncapi/modelina/pull/720)
- [Samridhi-98](https://github.com/Samridhi-98) [fixed Javascript preset options was not added as type](https://github.com/asyncapi/modelina/pull/709)
- [Samridhi-98](https://github.com/Samridhi-98) [fixed TypeScript preset options was not added as type](https://github.com/asyncapi/modelina/pull/703) 
- [Samridhi-98](https://github.com/Samridhi-98)[fixed some broken links in the documentation](https://github.com/asyncapi/modelina/pull/684) 
- [Samridhi-98](https://github.com/Samridhi-98) [ensured that reserved keywords cannot be rendered for Go](https://github.com/asyncapi/modelina/pull/653)
- [Samridhi-98](https://github.com/Samridhi-98) [fixed an issue where `_` should be excluded from being converted from the Java enum rendering](https://github.com/asyncapi/modelina/pull/737)
- [slowikowskiarkadiusz](https://github.com/slowikowskiarkadiusz) [added support for shorthand accessors for C# classes](https://github.com/asyncapi/modelina/pull/671)
- [slowikowskiarkadiusz](https://github.com/slowikowskiarkadiusz) [added support for different collection types for C# list properties](https://github.com/asyncapi/modelina/pull/669)
- [slowikowskiarkadiusz](https://github.com/slowikowskiarkadiusz) [fixed an issue where C# generated optional property types even if they where required properties](https://github.com/asyncapi/modelina/pull/747)
- [slowikowskiarkadiusz](https://github.com/slowikowskiarkadiusz) [improved a lot of the C# code formatting](https://github.com/asyncapi/modelina/pull/724)
- [ibernabeudev](https://github.com/ibernabeudev) [added enum rendering to Go](https://github.com/asyncapi/modelina/pull/662)
- [micro-jumbo](https://github.com/micro-jumbo) [fixed Jackson annotations was generated by default for Java enums](https://github.com/asyncapi/modelina/pull/813)
- [PanMan](https://github.com/PanMan) [fixed a spelling mistake that caused a broken link](https://github.com/asyncapi/modelina/pull/775)
- [jonaslagoni](https://github.com/jonaslagoni) [added an example how to use custom enum value names](https://github.com/asyncapi/modelina/pull/764)
- [jonaslagoni](https://github.com/jonaslagoni) [added an example how to use a custom generic inheritance for a class in C#](https://github.com/asyncapi/modelina/pull/772)
- [Polygens](https://github.com/Polygens) [fixed an issue where the correct extension reference was not used for C#](https://github.com/asyncapi/modelina/pull/746)
- [Polygens](https://github.com/Polygens) [ensured C# serialization functionality is supported in .NET Core 3.0.](https://github.com/asyncapi/modelina/pull/728)
- [jonaslagoni](https://github.com/jonaslagoni) [clarified more information about the champions concept](https://github.com/asyncapi/modelina/pull/745)
- [owais34](https://github.com/owais34) [added support for AsyncAPI 2.4.0](https://github.com/asyncapi/modelina/pull/733)
- [rmasarovic](https://github.com/rmasarovic) [added support for Dart](https://github.com/asyncapi/modelina/pull/658)

##### These are the changes on `next`
There are simply too many refactoring's to show, if you really want to deep dive into the rewrite, take a look in this PR: https://github.com/asyncapi/modelina/pull/674

## To that end
Thank you everyone who contribute to AsyncAPI in any way you can :purple_heart: If you also want to help out but don't know where to begin, then join the [#11_how-to-contribute](https://asyncapi.slack.com/archives/C02FK3YDPCL) channel on Slack so we can help you any way we can :muscle: 
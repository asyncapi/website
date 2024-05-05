---
title: June 2021 at AsyncAPI
date: 2021-07-09T06:00:00+01:00
type: Communication
tags:
  - Project Status
cover: /img/posts/june-2021-at-asyncapi/cover.webp
authors:
  - name: Lukasz Gornicki
    photo: /img/avatars/lpgornicki.webp
    link: https://twitter.com/derberq
    byline: AsyncAPI Maintainer and Community Guardian
excerpt: 2.1.0 spec released, GSoC started, CLI released, other tools under heavy development. June was a hell of a ride.
---

> Read [May 2021 at AsyncAPI](/blog/may-2021-at-asyncapi) for the update from May.

<iframe src="https://anchor.fm/asyncapi/embed/episodes/June-2021-at-AsyncAPI-Initiative-e144cup" height="102px" width="400px" frameborder="0" scrolling="no"></iframe>

## Specification 2.1.0 release

The eagle has landed. The new version of the AsyncAPI specification is here. For more details, read [AsyncAPI Spec 2.1.0 Release Notes](https://www.asyncapi.com/blog/release-notes-2.1.0).

For more details on security improvements introduced into the spec by [Dale Lane](https://github.com/dalelane), read [this interactive article](https://dalelane.co.uk/blog/?p=4409).

For more details on new properties in examples, check out the demo of the latest version of Microcks where [Laurent Broudoux](https://github.com/lbroudoux) shows them in action in the new release:

<YouTube id="ksYrvrqj8NI" />

A significant side effect of the release is that we automated the process of publishing the specification. Now [AsyncAPI Website](https://www.asyncapi.com/docs/specifications/v2.1.0) always reflects the latest version of specification document from [the spec repository](https://github.com/asyncapi/spec/blob/master/spec/asyncapi.md). Thank you [Aayush Kumar Sahu](https://github.com/aayushmau5) for the hard work.

The next release is scheduled for September. It is not decided if it is going to be a major or minor. It depends on the changes in the spec. Patch releases will be automatically released as 2.1.1 etc.

## Google Summer of Code (GSoC) kicked off

By courtesy of [Postman](https://www.postman.com/) that agreed to list AsyncAPI-related ideas on their list of [GSoC](https://summerofcode.withgoogle.com/) ideas, the AsyncAPI Initiative entered the event a big time.

In June, we started at GSoC with five different project!

### Diff

[Aayush Kumar Sahu](https://github.com/aayushmau5) started working on [the AsyncAPI Diff library](https://github.com/asyncapi/diff). It will show differences between two different AsyncAPI files as a list of breaking and non-breaking changes. 

Later it will be used in AsyncAPI CLI and Studio. It will be a standalone library, browser compatible, so the community can also integrate it in other use cases.

### Optimizer

[Khuda Dad Nomani](https://github.com/KhudaDad414) started working on [the AsyncAPI Optimizer library](https://github.com/asyncapi/optimizer/). It is meant to optimize your AsyncAPI documents, such as finding duplications that can be changed into references or removing unused components. Very useful, especially for use cases where the AsyncAPI document is generated from code. 

Later it will be used in AsyncAPI CLI and Studio. It will be a standalone library, browser compatible, so the community can also integrate it in other use cases.

### App Relations Discovery

[Arjun Garg](https://github.com/asyncapi/app-relations-discovery) started working on [the AsyncAPI App Relations Discovery library](https://github.com/asyncapi/app-relations-discovery). It can discover relations between different applications in the system. As input, you provide a set of AsyncAPI documents provided for multiple applications.

Except of default map of relations you will be able to also get a diagram of relations. Some ready examples based on [this flight system use case](https://github.com/amadeus4dev/amadeus-async-flight-status):

<Figure
  src="/img/posts/june-2021-at-asyncapi/mermaid.webp"
  className="text-center"
  widthClass="w-1/2"
  caption="Figure 1: Flow diagram using Mermaid syntax."
/>

<br/>

<Figure
  src="/img/posts/june-2021-at-asyncapi/plantuml.webp"
  className="text-center"
  widthClass="w-1/2"
  caption="Figure 2: Class diagram using PlantUML syntax."
/>

### Simulator aka Fluffy Robot

[Nektarios Fifes](https://github.com/NektariosFifes) started working on [the AsyncAPI Simulator](https://github.com/asyncapi/fluffy-robot). It is a library that can simulate real traffic against your system basing on provided AsyncAPI documents and initial information of the traffic that should be generated. As a result, you will get a set of statistics.

### ChatBot

[Ace](https://github.com/AceTheCreator) started research on implementing a [ChatBot](https://github.com/asyncapi/chatbot) that could help new AsyncAPI users to create first AsyncAPI documents. Throughout a conversation with a bot, you would get a generated AsyncAPI document in return.

## New CLI released

The initial version of the [AsyncAPI CLI](https://github.com/asyncapi/cli) is finally here :rocket:.

[Jorge Aguiar Martín](https://twitter.com/jotamusik) finished his hard work on initial setup of the CLI with first initial feature for AsyncAPI documents validation:

<Figure
  src="/img/posts/june-2021-at-asyncapi/cli.webp"
  className="text-center"
/>

The next features are on their way. Feel free to join and work on it together with us.

## Modelina supports Go

Our model generation library is under heavy development. I want to explicitly mention one change among all the recent changes in [Modelina](https://github.com/asyncapi/modelina/releases). [Sergio Moya](https://github.com/smoya) enabled support for model generation for Go :muscle: It is a 4th language that is supported by the library.

```js
const { GoGenerator} = require("@asyncapi/modelina")

const generator = new GoGenerator();

const doc = {
  $id: "Address",
  type: "object",
  properties: {
    street_name:    { type: "string" },
    city:           { type: "string", description: "City description" },
    house_number:   { type: "number" },
    marriage:       { type: "boolean", description: "Status if marriage live in given house" },
    pet_names:      { type: "array", items: { type: "string" } },
    state:          { type: "string", enum: ["Texas", "Alabama", "California", "other"] },
  },
  required: ["street_name", "city", "state", "house_number", "state"],
};

async function generate() {
  const models = await generator.generate(doc);
  models.forEach(function (model) {
    console.log(model.result);
  }); 
}

generate();

//outputs

/*
// Address represents a Address model.
type Address struct {
  StreetName string
  City string
  HouseNumber float64
  Marriage bool
  PetNames []string
  State *State
}
// State represents an enum of string.
type State string
*/
```

You can also try out this code on [RunKit](https://runkit.com/derberg/runkit-npm-asyncapi-modelina).

## React component vs HTML template and where are we

[React component](https://github.com/asyncapi/asyncapi-react) is still under development towards 1.0.0 release. Keep in mind that we are already using release candidates in the [HTML template](https://github.com/asyncapi/html-template), and you can give it a try too:

```
npm install --save @asyncapi/react-component@v1.0.0-next.11
```

In June, a couple of release candidates were released. Most important to notice is a new standalone bundle that makes it super easy to reuse React component in [Angular](https://github.com/asyncapi/asyncapi-react/blob/next/docs/usage/angular.md) and [Vue](https://github.com/asyncapi/asyncapi-react/blob/next/docs/usage/vue.md) projects. In addition, we now provide not only **cjs** but also **esm** and **umd** modules. As a result, it is much easier to use React component with [Next.js](https://github.com/asyncapi/asyncapi-react/blob/next/docs/usage/nextjs.md) projects. In addition, the component supports the whole specification, except **discriminator**.

Few more items left for the official 1.0.0 release:
- Custom theming that is [right behind the corner](https://github.com/asyncapi/asyncapi-react/pull/374)
- Components extensibility
- New playground aka editor that will be available as a standalone package and used by use in a new AsyncAPI Studio (new AsyncAPI Playground)

If you are interested in more details, follow the [release milestone](https://github.com/asyncapi/asyncapi-react/milestone/20) and the work done by [Maciej Urbanczyk](https://github.com/magicmatatjahu).

## Jobs

If you missed it, we have a [Jobs](/jobs) board on our website where different companies can share opportunities involving working with AsyncAPI. There are 4 open positions at the moment.

<Figure
  src="/img/posts/june-2021-at-asyncapi/jobs.webp"
  className="text-center"
/>

We also generate an [RSS feed](https://www.asyncapi.com/jobs/rss.xml), so you can subscribe for notifications on new jobs only.

## Good learning materials

June was super rich in good learning content. Below you can find a list of all the articles and videos, but I'd like to explicitly point you to this [kids book about Kafka](http://www.gentlydownthe.stream/):

- [Designing your APIs with AsyncAPI (Part 1)](https://www.asyncapi.com/blog/designing_your_apis_with_asyncapi_part_1)
- [Simulating CloudEvents with AsyncAPI and Microcks](https://developers.redhat.com/articles/2021/06/02/simulating-cloudevents-asyncapi-and-microcks)
- [AsyncAPI and Its Horizontal Working System](https://dzone.com/articles/asyncapi-and-its-horizontal-working-system)
- [The journey of documenting a Socket.IO API (Pt 1)](https://dedouss.is/posts/2021-06-24-documenting-socketio-part-1.html)

<YouTube id="PPeRnEaqBW8" />

> Photo by <a href="https://unsplash.com/@lazyartistgallery?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Rahul Pandit</a> on <a href="https://unsplash.com/s/photos/may?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

---
title: Designing a unified Intent-driven API for all AsyncAPI's parsers
date: 2021-05-07T06:00:00+01:00
type: Communication
tags:
  - api
  - parser
  - design
  - codegen
cover: /img/posts/websocket-part3/cover.webp
authors:
  - name: Sergio Moya
    photo: - # TODO
    link: https://twitter.com/smoyac
    byline: - # TODO
excerpt: - # TODO
featured: true
---

The **Free and Open-Source Software** (FOSS) model, since its inception, has brought a flurry of libraries and applications available to everyone. 

Thanks to the growth of the open source community, we can now enjoy free software and, in most cases, to generate profit from it.

In fact, I believe there is no tech company that doesn't use open source in one way or another.

FOSS has changed the way most of developers operate: from coding all features from scratch to become consumers of libraries that implement most of the basic operation of an application. Sometimes even the core logic of the application is baked with free software.

So much so that I, as a developer, can't imagine having to implement a complex application from scratch. 

If we go a step further, we won't talk only about libraries but also about APIs as services. For example, the fast adoption of the [Jamstack](https://jamstack.org) architecture, where the Backend consists on different API services (mostly third-party), are pushing SaaS companies to make public their private APIs.

In short, applications around the world depend on free libraries maintained by the community, who constantly delivers updates at a frenetic rate. New functionalities, fixes or in many other cases, drastic changes that allow us to continue growing and maintaining those libraries or APIs.

The latter is, precisely, a problem for many developers. The feared 👻  **breaking changes** 👻.

- Disclaimer: this post provides examples from the point of view of a software library API maintainer. However, the same principles apply to any other API, such command-line tools, REST, Kernel modules, peripheral drivers, etc.

## What is a breaking change?

> A change in one part of a software system that potentially causes other components to fail; occurs most often in shared libraries of code used by multiple applications.

> Source: [https://en.wiktionary.org/wiki/breaking_change](https://en.wiktionary.org/wiki/breaking_change)

Breaking changes are non-backward compatible changes in the public interface of an application, either a library, an API service or even a command-line utility.

Users of such software are forced to alter their code if they want to use the latest version, otherwise their code will be unusable.

I propose a metaphor to better understand what a **breaking change** is ****based on something that happened to me a few days ago: Imagine that your preferred supermarket, the one that you have been going to for several years, decides to completely restructure its interior. Where you could find the fruit, now you only find water and other drinks. At this point, I have three options:

1. You adapt yourself to the new layout and changes made to the surface. It will take a few days or maybe weeks to know where each product is, but in return you can continue shopping at your favourite supermarket.
2. Seek another supermarket which do not make drastic changes. In case they want to make changes, changes to be less and communicated in advance.
3. Decide that you will devote all your efforts to grow your own vegetables, raise your own cattle, ride a water purification plant and everything it takes to not rely on any supermarket or store.

I went for the first option. Today I still get lost when I do shopping, but at least pasta is still on the same shelf as it was!

In the software world, the first option would mean to update your code so you avoid breaking changes.

Therefore, the second option would be to look for another library or an API designed to avoid, as far as possible, these breaking changes. How to build an API that meets this requirement, among others, is what this post is about.

Finally, the third option would be to make zero use of FOSS. 

How can we mitigate the impact on users when releasing a new [major](https://semver.org/#summary) version of our library or service API?

## Designing APIs that are resilient to breaking changes

APIs are meant to solve user needs. 

However, we do not listen to the final users that much. Instead, we tend to expose functionalities based on our own experience, biased by our position or the knowledge we own of the platform behind. Sometimes guided by a vague research (Product-oriented) or lead with a not so clear goal in mind. At least I used to do it in that way.

### Be ready for what the user needs

Focusing on what the user really needs pulls away most of the overprint of any API: What is the user **intention** when asking for a particular action to happen?

An Intent represents a user intention of performing an action that solves a clear use case.

Continuing with the metaphor presented in the previous paragraph, my only intention by then was to **buy groceries** **for the dinner**. In particular, I needed some avocados, tomatoes and a baguette.

The supermarket should provide a mechanism that let me buy those items. How to get those, it's just the implementation detail and can be up to each supermarket to decide how to do it. 

For example, my supermarket had shelfs where fruits can be picked up from, offers bags, a balance to know the weight of those and a checkout place. However, after the last changes, fruits are weighted at checkout and baguettes are no longer in the shelf. You need to ask the baker. 

As you can see, the interface didn't change: I still can buy the groceries. However, the implementation changed completely.

Building APIs based on the implementation detail will nothing less than lead your users to suffer the (bad) design choices made in the past. Each change you do, will penalize completely the user experience and force to upgrade their code.

Let's pick up another example, this time a more practical one. 

Let's use our [AsyncAPI Parser](https://github.com/asyncapi/parser-js). Built in Javascript, it parsers an AsyncAPI spec doc and provides a set of functions to work with the document and access the different objects and their values.

Here is a mod version of the [Streetlights tutorial](https://www.asyncapi.com/docs/tutorials/streetlights) document made for demo purposes:

```yaml
asyncapi: '2.0.0'
info:
  title: Streetlights mod API
  version: '1.0.0-alpha'
servers:
  mosquitto:
    url: mqtt://test.mosquitto.org
    protocol: mqtt
channels:
  light/measured:
    publish:
      summary: Inform about environmental lighting conditions for a particular streetlight.
      operationId: onLightMeasured
      message: 
        $ref: "#/components/messages/lightMessage"
      
  light/measured/changed:
    subscribe:
      summary: Receive an update every time a lighting condition changed.
      operationId: onLightMeasureChanged
      message: 
        $ref: "#/components/messages/lightMessage"
components:
  messages:
    lightMessage:
      payload:
        type: object
        properties:
          id:
            type: integer
            minimum: 0
            description: Id of the streetlight.
          lumens:
            type: integer
            minimum: 0
            description: Light intensity measured in lumens.
```

In the hypothetical case a user wants to parse this document and *get all the messages a consumer of the application can consume*, this is needed: 

```jsx
doc.channels().filter(c => c.hasSubscribe()).map(c => c.subscribe().messages()).flat();
```

We can observe that the [Parser-js](https://github.com/asyncapi/parser-js) API (`v1.x`) is completely coupled with the structure of the AsyncAPI spec (by the date of this post, `v2.0.0`) document. In fact, the API is just a layer on top of the Json Schema parsed document with some helpers and extras, meaning you should know how the document is structured in order to get info from it.

Let's emulate a possible breaking change. 

Imagine **messages** are now independent of channels and **Operations** get moved from where they used to be (under the channel) to the root of the document. For instance:

```yaml
asyncapi: '99.99.99'
# ...
operations:
  onLightMeasured:
    operationType: publish
    summary: Inform about environmental lighting conditions for a particular streetlight.
    message: 
      $ref: "#/messages/lightMessage"
    channel: 
      $ref: "#/channels/light/measured"
  onLightMeasureChanged:
    operationType: subscribe
    summary: Receive an update every time a lighting condition changed.
    message: 
      $ref: "#/messages/lightMessage"
    channel:
      $ref: "#/channels/light/measured"
channels:
  light/measured:
    description: Channel for updates on lightning conditions.
messages:
  lightMessage:
    # ...
```

Now the users of the [Parser-js](https://github.com/asyncapi/parser-js) that wanted to *get all the messages a consumer of the application can consume* will need to change their code so their app keeps working after the **breaking change** got introduced. For instance:

```jsx
doc.operations().filter(o => o.isSubscribe()).map(o => o.message()).flat();
```

### Intent-driven design to the rescue

What if I tell you that you could avoid most of the breaking changes on your APIs by following an Intent-driven design approach?

Let's give a twist to the API by adding some user intents. In this particular case, a method that represents the intent:

```jsx
clientSubscribableMessages() : Message[]
```

Some naming clarification:

- **client** since the user wants to get messages from the point of view of a client/consumer of the application.
- **subscribable** since the user want messages they can consume.

Looks simple, right? We have just written down our first intent! 🎉

From now on, users won't need to know in detail how the spec document is structured. Any change on the underlaying document will be reflected inside the Parser function instead. Therefore, `doc.clientPublishableMessages();` will **always** be available as method: it makes completely sense from a business model point of view for the AsyncAPI project. 

New versions of your library will be out, but those will mostly 

This approach sets also the foundations for creating backward-compatibility APIs, among other features. For example, you can support several versions just by executing one or another logic inside your intent functions.

# Designing a unified Intent-driven API for all AsyncAPI's parsers

The idea behind the Intent-driven design approach is to first focus on getting what the user intents are. Try to get feedback from final users as much as possible. Sometimes users are nothing else than other libraries, so then go and check how they use your API.

Our goal was to design an API that could be implemented in any language, meaning others could create their own parser but always following this API. For example, the [Parser-go](https://github.com/asyncapi/parser-go).

Here is a summary of the steps we followed:

## 1. Identify how users use the library

We first focused on identifying the intents behind our [generator templates](https://github.com/asyncapi/generator#list-of-official-generator-templates). Doing some manual code analysis, we came out with [a list](https://github.com/asyncapi/shape-up-process/issues/84) of *potential* intents that became the foundation of our API.

Furthermore, we tried to think on potential users of the parsers. For example, [Slack](https://github.com/slackapi/slack-api-specs/blob/master/events-api/slack_events_api_async_v1.json) developers could use the parser for adding documentation to their UI, validating messages, etc. 

That gave us another list of *potential* intents, most of them already covered by the list we got from the templates.

## 2. Transform potential intents to actual intents

This is one important step, if not the most. Also one of the hardest.

For this step, we tried to abstract our mind and forget most of what we knew about the structure of an AsyncAPI document. We instead focused on the models and their **logical** (from a human point of view) relationship:

- Messages flow through Channels
- Messages can exist without channels.
- Messages can be (or not) related with Operations
- Etc

We then wrote down a draft of our first list of intents.

## 3. Build a mock API

After getting a list of intents to implement, we built a simple mock API in Javascript with that list. 

Methods were returning hardcoded data, but were enough for getting an idea of how difficult would be to create such API from the point of view of a maintainer.

At this point, we faced up some API design decisions, such as: 

- Shall we add getters for all properties?
- Are we gonna use singular and plural methods? Both? Only plural?
- Are methods gonna have any argument at all?
- Etc

## 4. Validate the intents and their UX

With the new API mock built in Javascript, we chose some of the most used [generator templates](https://github.com/asyncapi/generator#list-of-official-generator-templates) and replaced all the calls made to the old [Parser-js](https://github.com/asyncapi/parser-js) API with the new ones.

This step made us realize that some of the intents we mocked up were working like a charm: We were pretty happy seeing how the code got simplified.

However, we found some inconsistencies such as missing intents that were needed for consistency, but also some other kinda helpers that were needed.

This step included writing down all our documentation around the new API. We decided to create a new repository for it, where developers of AsyncAPI parsers will refer. Also as it holds the spec for the new API, it will be versioned. 

That repository can be found [here](https://github.com/asyncapi/parser-api).

## TODO

- Next steps?

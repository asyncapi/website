---
title: Designing a unified Intent-driven API for all AsyncAPI's parsers
date: 2021-05-07T06:00:00+01:00
type: Engineering
tags:
  - API Design
cover: /img/posts/intent-driven-api/cover.webp
authors:
  - name: Sergio Moya
    photo: /img/avatars/smoya.webp
    link: https://twitter.com/smoyac
    byline: Pilot at AsyncAPI Airlines
excerpt: Afraid because of breaking changes? Learn how do we plan to reduce breaking changes in our tooling APIs by introducing a new design approach called Intent-driven. 
---

The **Free and Open-Source Software** (FOSS) model, since its inception, has brought a flurry of libraries and applications available to everyone. 

Thanks to the growth of the open-source community, we can now enjoy free software and, in most cases, generate profit from it.

I believe there is no tech company that doesn't use open source in one way or another.

FOSS has changed the way most developers operate: from coding all features from scratch to become consumers of libraries that implement most of the basic operation of an application. Sometimes even the core logic of the application is baked with free software.

So much so that I, as a developer, can't imagine having to implement a complex application from scratch. 

If we go a step further, we won't talk only about libraries but also about APIs as services. For example, the fast adoption of the [Jamstack](https://jamstack.org) architecture, where the backend consists of different API services (primarily third-party), is pushing SaaS companies to make their private APIs public.

In short, applications worldwide depend on free libraries maintained by the community, which constantly deliver updates at a frenetic rate: new functionalities, fixes, or in many other cases, drastic changes that allow us to continue growing and maintaining those libraries or APIs.

The latter is, precisely, a problem for many developers. The feared 👻  **breaking changes** 👻.

> Disclaimer: This post provides examples from the point of view of a software library API maintainer. However, the same principles apply to any other API, such as command-line tools, REST, Kernel modules, or peripheral drivers.

# What is a breaking change?

> A change in one part of a software system that potentially causes other components to fail; occurs most often in shared libraries of code used by multiple applications.
>
> Source: [https://en.wiktionary.org/wiki/breaking_change](https://en.wiktionary.org/wiki/breaking_change)

Breaking changes are non-backward compatible changes in the public interface of an application, either a library, an API service, or even a command-line utility.

Users of such software are forced to alter their code if they want to use the latest version; otherwise, their code will be unusable.

I propose a metaphor to better understand what a **breaking change** is. By the way, based on something that happened to me a few days ago. 
Imagine that your preferred supermarket, the one you have been going to for several years, decides to restructure its interior completely. Where you could find the fruit, now you only find water and other drinks. At this point, I have three options:

1. You adapt yourself to the new layout and changes made to the surface. It will take a few days or maybe weeks to know where each product is, but in return, you can continue shopping at your favorite supermarket.
2. Seek another supermarket that does not make drastic changes. In case they want to make changes, changes to be less and communicated in advance.
3. Decide that you will devote all your efforts to grow your vegetables, raise your cattle, ride a water purification plant, and everything it takes to not rely on any supermarket or store.

I went for the first option. Today I still get lost when I go shopping, but at least pasta is still on the same shelf as it was!

In the software world, the first option would mean to update your code, so you avoid breaking changes.

Therefore, the second option would be to look for another library or an API designed to avoid, as far as possible, these breaking changes. Building an API that meets this requirement is the primary purpose of this post.

Finally, the third option would be to make zero use of FOSS. 

How can we mitigate the impact on users when releasing a new [major](https://semver.org/#summary) version of our library or service API?

# Designing APIs that are resilient to breaking changes

APIs solve user needs. 

However, I believe we do not listen to the final users that much. Instead, we tend to expose functionalities based on our own experience, biased by our position or the knowledge we own of the platform behind. Sometimes guided by preliminary research (Product-oriented) or lead with a not-so-clear goal in mind. At least I used to do it in that way.

Not an easy journey, but I can promise you it is worth it.
As *Mark Dalgleish* once tweeted:

<TwitterTweetEmbed
  tweetId='1384127726861258756'
  options={{
    cards: 'hidden',
    width: 500,
    align: 'center'
  }}
/>

## Be ready for what the user needs

Focusing on what the user needs pulls away most of the overprint of any API: What is the user **intention** when asking for a particular action to happen?

An Intent represents a user intention of performing an action that solves a clear use case.

Continuing with the metaphor presented in the previous paragraph, notice that my only intention was to **buy groceries for dinner**. In particular, I needed some avocados, tomatoes and a baguette.

The supermarket should provide a mechanism that lets me buy those items. How to get those, it's just the implementation detail and can be up to each supermarket to decide how to do it. 

For example, my supermarket had shelves where customers can pick up fruits from, offers bags, a balance to know the weight of those, and a checkout place. However, after the last changes, fruits are weighted at checkout, and baguettes are no longer on the shelf. So you need to ask the baker. 

As you can see, the interface didn't change: I still can buy the groceries. However, the implementation completely changed.

Building APIs based on the implementation detail will nothing less than lead your users to suffer the (not-so-good) design choices made in the past. Furthermore, each change you make will penalize the user experience and force them to upgrade their code.

Let's pick up another example, this time a more practical one. 

Here is a modified version of the [Streetlights tutorial](https://www.asyncapi.com/docs/tutorials/streetlights) document made for demo purposes:

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

By the time of this post, there is only one implementation of the parser, which is written in JavaScript. 
[Parser-js][parser-js] parses AsyncAPI spec documents and provides functions to work with them and access the different objects and their values.

In the hypothetical case a user wants to parse this document and *get all the messages a consumer of the application can consume*, this is needed: 

```jsx
doc.channels().filter(c => c.hasSubscribe()).map(c => c.subscribe().messages()).flat();
```

We can observe that the [Parser-js][parser-js] API (`v1.x`) is completely coupled with the structure of the AsyncAPI spec (by the date of this post, `v2.0.0`) document. The API is just a layer on top of the JSON Schema parsed document with some helpers and extras, meaning you should know the document's structure to access any information.

Let's emulate a possible breaking change. 

Imagine **messages** are now independent of channels and **Operations** get moved from where they used to be (under the channel) to the root of the document. For instance:

```yaml
asyncapi: '99.99.99'
# ...
operations:
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

Now the users of the [Parser-js][parser-js] that wanted to *get all the messages a consumer of the application can consume* will need to change their code so their app keeps working after the **breaking change** got introduced. For instance:

```jsx
doc.operations().filter(o => o.isSubscribe()).map(o => o.message()).flat();
```

## Intent-driven design to the rescue

What if I tell you that you could avoid most of the breaking changes on your APIs by following an Intent-driven design approach?

Let's give a twist to the API by adding some user intents. In this particular case, a method that represents the intent:

```jsx
clientSubscribableMessages() : Message[]
```

Some naming clarification:

- **client**: user wants to get messages from the point of view of a client/consumer of the application.
- **subscribable**: user wants to get the messages they can consume.

It looks simple, right? We have just written down our first intent! 🎉

From now on, users won't need to know in detail how the spec document is structured. The parser will reflect any change on the underlying document inside each function instead. Therefore, `doc.clientPublishableMessages();` will **always** be available as a method: it makes complete sense from a business model point of view for the AsyncAPI project. 

New versions of the library will be out, but those will mostly be minor or patch versions, adding new features, or fixing bugs. Meaning the users will follow a fearless and simple upgrade process.

This approach also sets the foundations for creating backward compatibility APIs, among other features. For example, you can support several versions by executing one or another logic inside your intent functions.

# Designing a unified Intent-driven API for all AsyncAPI's parsers

The idea behind the Intent-driven design approach is to first focus on getting what the user intents are by getting feedback from final users as much as possible. Sometimes users are nothing else than other libraries, so go and check how they use your API.

Our goal was to design an API that could be implemented in any language, meaning others could create their parser but always following this API. For example, the [Parser-go](https://github.com/asyncapi/parser-go).

Here is a summary of the steps we followed:

## 1. Identify how users use the library

We first focused on identifying the intents behind our [generator templates][templates]. By doing some code analysis, we came out with [a list][issue-2] of *potential* intents that became the foundation of our API.

Furthermore, we tried to think about potential users of the parsers. For example, [Slack](https://github.com/slackapi/slack-api-specs/blob/master/events-api/slack_events_api_async_v1.json) developers could use the parser for adding documentation to their UI, validating messages, among others. 

That gave us another list of *potential* intents, most of them already covered by the list we got from the templates.

## 2. Transform potential intents to actual intents

It is an important step, if not the most. It is one of the hardest as well.

For this step, we tried to abstract our minds and forget most of what we knew about the structure of an AsyncAPI document. We instead focused on the models and their **logical** (from a human point of view) relationship:

- Messages flow through Channels
- Messages can exist without channels.
- Messages can be (or not) related to Operations
- Etc

We then wrote down a draft of our first list of intents.

## 3. Build a mock API

After getting a list of intents to implement, we built a simple mock API in JavaScript with that list. 

Methods were returning hardcoded data but were enough for getting an idea of how difficult it would be to create such API from the point of view of a maintainer.

At this point, we faced up some API design decisions, such as: 

- Shall we add getters for all properties?
- Are we going to use singular or plural methods?
- Are methods going to have any argument at all?
- Etc

## 4. Validate the intents and their UX

With the new API mock built-in JavaScript, we chose some of the most used [generator templates][templates] and replaced all the calls made to the old [Parser-js][parser-js] API with the new ones.

This step made us realize that some of the intents we mocked up worked like a charm: We were pretty happy seeing how the code got simplified.

However, we found some inconsistencies, such as missing intents and helpers required for simplicity purposes.

## 5. Wrap up documentation

This step included writing down all our documentation around the new API in a new repository, where developers of AsyncAPI parsers will refer and follow the specification of the API. 

Even though each parser will now maintain an individual release cycle, changes to this API will force the individual parsers to update.

It follows [Semver](https://semver.org/) (as we do for all projects), so each parser will therefore maintain its compatibility matrix, making visible what version of the API specification they support. 

You can find the new repository holding the new Parsers API specification [here][api], which at the moment of writing this post, it's still `v1.0.0-alpha`, as we are waiting for more feedback from the community.

# What's next?

Even though we do now have an alpha version of the new parser API, work is pending around implementation.
We are actively asking for feedback. Please submit yours via GitHub Discussions [here][api-discussions].

Our next steps are going to be:

1. To release a new version (alpha) of the [Parser-js][parser-js] that implements the new API specification.
2. To use that new [Parser-js][parser-js] version in some of the [generator templates][templates]. That will help us to:
    1. Validate that the [Parser-js][parser-js] behaves as expected.
    2. Set an example of what kind of changes users will need to do on their codes to adopt the new API (We expect code will require no significant changes).
3. To ask for feedback from the community, especially to maintainers and users of the [Parser-js][parser-js]. Reviewing the new API now becomes easier as there will be the specification, a new version of the [Parser-js][parser-js] and also examples to follow.
4. Review feedback, apply suggestions, and do release a release-candidate or final version.

# Related issues and links

Please find the outstanding issues related to the design process we went through here:

- [Main issue for the API design process][issue-1]
- [Collecting potential intents][issue-2]
- [Emulating few breaking changes][issue-3]
- [Figuring out how to do API versioning][issue-4]

The new Parser(s) API specification can be found [here][api]. Discussions take place [here][api-discussions].

[issue-1]: https://github.com/asyncapi/shape-up-process/issues/90
[issue-2]: https://github.com/asyncapi/shape-up-process/issues/84
[issue-3]: https://github.com/asyncapi/shape-up-process/issues/93
[issue-4]: https://github.com/asyncapi/shape-up-process/issues/95
[parser-js]: https://github.com/asyncapi/parser-js
[templates]: https://github.com/asyncapi/generator#list-of-official-generator-templates
[api]: https://github.com/asyncapi/parser-api
[api-discussions]: https://github.com/asyncapi/parser-api/discussions

# Conclusion

Intent-driven design helps to better understand your users by focusing on their intentions rather than technical details.

It is not an easy path in the short term; however, the benefits can be visible early, making the process a grateful experience.

I firmly believe making a great user experience should always be a top priority, especially for publicly available projects. If we don't care about users then, who is going to use our software?

I want to take this opportunity to express my gratitude to [Jonas Lagoni](https://github.com/jonaslagoni), who has been my partner along this journey. 
Hours of figuring out small details, long backs and forths, and discussions around user experience were easy-going, thanks to this one.

I hope you enjoyed reading this post as much as I did writing it 😃 

> Cover photo by <a href="https://kaboompics.com/photo/20669/sharpened-colorful-pencils">Karolina Grabowska</a> on <a href="https://kaboompics.com">Kaboompics</a>

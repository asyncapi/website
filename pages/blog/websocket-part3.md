---
title: From API-First to Code Generation - A WebSocket Use Case
date: 2021-05-05T06:00:00+01:00
type: Communication
tags:
  - websocket
cover: /img/posts/websocket-part3/cover.webp
authors:
  - name: Lukasz Gornicki
    photo: /img/avatars/lpgornicki.webp
    link: https://twitter.com/derberq
    byline: AsyncAPI Maintainer and Community Guardian
excerpt: Learn how to go from API design to code generation. Create a WebSocket API for ChatBot. All supported by AsyncAPI
featured: true
---

>  This is the last article of WebSocket series. I recommend you read [WebSocket, Shrek, and AsyncAPI - An Opinionated Intro](/blog/websocket-part1) and [Creating AsyncAPI for WebSocket API - Step by Step](/blog/websocket-part2) first.

In my previous articles, from the WebSocket series, I introduced you to WebSocket topic and explained how would you describe your WebSocket API using AsyncAPI specification.

What was the point of doing it anyway? Why learning the specification?

<Figure
  src="/img/posts/websocket-part3/meme-newspec.webp"
  widthClass="w-1/4"
/>

Just to document your API? Nah, that would be a huge waste of time. Like seriously, would you learn a new specification only to describe the API for documentation purposes? Please don't. You could do so much more with it.

Look at [the list](https://www.asyncapi.com/docs/community/tooling) of all the tools built for AsyncAPI. There are many ahead of us, but current list already gives an idea what can be done with AsyncAPI. You can validate your messages real-time in your application with [asyncapi-validator](https://github.com/WaleedAshraf/asyncapi-validator) or mock and test your application with [Microcks](https://microcks.io/). You can also generate code by picking one of [the official templates](https://github.com/asyncapi/generator#list-of-official-generator-templates). In this article I will focus on the aspect of code generation.

## API-First vs Code-First

Designing API first and then coding later is not an easy shift. For a coder, it is easier to just code and focus on code aspects. And this is just fine. This is how humans work. We do what we learned and focus to make things good and maintainable. Different tasks require different skills, and it is ok that not everybody has them. Designing API requires a different look on the subject, being more flexible and abstract. You need a wider perspective, forget about implementation details, and think about user first.

Do you need specification to design API?

No, but specification makes design process and feedback loop easier to handle and faster. If backed by good tools, of course.

What is wrong with generating AsyncAPI from code?

Even though I'm an author of many memes like the one below, I'm actually far from judging. It all depends on your project and architecture and even work environment. 

<Figure
  src="/img/posts/websocket-part3/meme-blame.webp"
  widthClass="w-1/4"
/>

In the end, I think there is a wrong assumption that if you generate spec from code it means you did not think about API design and your users. Even AsyncAPI [tooling list](https://www.asyncapi.com/docs/community/tooling) stigmatize tools that allow you to generate spec from the code as code-first tools. Who said you can't do both things in pararell. 

I just realized this topic could continue and evolve into a dedicated article, so let me do a full stop here. 

My goal is to educate you on:
- Designing a WebSocket API with multichannel, with one message each. In other words I want to show you something oposite to my previous articles where you could see a WebSocket API that has one channel but with multiple different messages.
- Performing code generation that enables you to focus on business logic only.

I'll try to come back into **API-First vs Code-First** topic in the summary of the article.

## ShrekApp

I know that in the article [WebSocket, Shrek, and AsyncAPI - An Opinionated Intro](/blog/websocket-part1) I said I will not try to model a Shrek application. Since the moment I wrote I will not do it, I was thinking about doing it all the time :smiley:. So here I am, showing to you a usage of AsyncAPI with WebSocket protocol basing on Shrek as an example. I shamefully admit I do it mainly to make sure my head moves on and thinks about something else than Shrek :smiley:.

## Start with AsyncAPI document

> You can see entire AsyncAPI document [here](https://github.com/derberg/shrekapp-asyncapi-designed/blob/main/asyncapi.yml)

There are several questions you need to ask yourself when designing API:
- What is the name of the API?
- What is the purpose of the API?
- What is the version of the API?
- How user can connect with the API and over what protocol?
- What messages can your user receive from and send to your API?
- On what channels are these messages available?
- What is the structure of these messages? What is the schema?

These are basic questions that can be reflected in the AsyncAPI document.

In case you didn't notice, these questions are user oriented. Your AsyncAPI document must describe what user can do with it, and not what it does. There is a difference.

### Info

I'm designing a **ShrekApp**, release under 1.0.0 version. Its purpose is to enable chat with a chatbot trained to behave like Shrek. I want to use [Wit.ai](https://wit.ai) as a platorm for training the bot that gives me a REST API to talk to the bot.

```yml
info:
  title: Shrek App
  version: '1.0.0'
  description: |
    Purpose of this app is to some fun with AsyncAPI and WebSocket and define an interface for ... Shrek.

    ![](https://media.giphy.com/media/10Ug6rDDuG3YoU/giphy-downsized.gif)

    You can use this API to chat with Shrek bot or to get updates about artifical travels to different locations.
```

### Servers

The communication with the application goes over the WebSocket protocol. For now it is not publicly hosted. You can run it locally and therefore connect through **localhost** only.

```yml
servers:
  swamp:
    url: localhost
    protocol: ws
```

### Channels

There are two separate entrypoints for the user to interact with the API:
- `chat` where bi-directional communication is possible to enable real-time conversation with the bot
- `travel/status` where user can subscribe for a stream of updates on different travels, like for example:
    ```yml
      destination: Far far away
      distance: Beyond the seven mountains and seven forests
      arrival: Pretty soon
    ```

Except of basic information like purpose of messages, pub/sub operations and messages schema it is good to specify **operationId** that is unique across entire AsyncAPI document and helps to generate human-readable functions' names.

> In below example you can see a usage of **components** section and schema definitions. I don't want to explain those sections in details here as I did it already in the [Creating AsyncAPI for WebSocket API - Step by Step](/blog/websocket-part2) article.

```yml
#
# Details about all the channels that user can listen to or send to messages
#
channels:
  /chat:
    subscribe:
      summary: Client can receive chat messages.
      operationId: subChatMessage
      message:
        $ref: '#/components/messages/chatMessage'
    publish:
      summary: Client can send chat messages.
      operationId: pubChatMessage
      message:
        $ref: '#/components/messages/chatMessage'
  /travel/status:
    subscribe:
      summary: Client can receive travel info status.
      operationId: subTravelInfo
      message:
        $ref: '#/components/messages/travelInfo'

#
# All reusable parts for readability and staying DRY
#
components:
  messages:
    chatMessage:
      summary: Message that you send or receive from chat
      payload:
        type: string
    travelInfo:
      summary: Message that contains information about travel status.
      examples:
        - payload:
            destination: Far far away
            distance: Beyond the seven mountains and seven forests
            arrival: Pretty soon
      payload:
        type: object
        properties:
          destination:
            description: Name of travel destination.
            type: string
          distance:
            description: How much distance left to the target.
            type: string
          arrival:
            description: Time left to get there.
            type: string
```

### Final document

You can see entire AsyncAPI document for ShrekApp always up to date [here](https://github.com/derberg/shrekapp-asyncapi-designed/blob/main/asyncapi.yml)

Created AsyncAPI document is not very complicated as this way it will be easier to understand the generated code. Most important is for you to notice that all information about your application can be expressed in the AsyncAPI document, and once you do it, options are just endless.

## Code Generation

docs generation


### AsyncAPI Generator

### Generate Server and Client

### Walkthrough the Code

### Add Business Logic

## Summary

<Figure
  src="/img/posts/websocket-part3/meme-redbuttons.webp"
  widthClass="w-1/4"
/>

https://docs.sandbox.gemini.com/websocket-api/#market-data  could not use as our generator doesn't support it yet.
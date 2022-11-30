---
type: Engineering
cover: /img/posts/openapi-vs-asyncapi-burning-questions/asyncapi-openapi-post_pic-15.webp
title: "AsyncAPI vs OpenAPI: Answers to Your Burning Questions About Two Leading API Specs"
date: 2021-09-08T06:00:00+01:00
tags:
   - Specification
   - OpenAPI
authors:
   - name: Jesse Menning
     photo: /img/avatars/jmenning.webp
     link: https://www.linkedin.com/in/jmenning
     byline: CTO Architect at Solace
---

AsyncAPI and OpenAPI are different ways of defining application programming interfaces (APIs), also commonly known as API specs. Both API specs serve a crucial role in defining and governing distributed computing systems, but AsyncAPI and OpenAPI are used for different styles of integration, as seen here:

![Figure 1: How API specs AsyncAPI and OpenAPI map to different interaction patterns](/img/posts/openapi-vs-asyncapi-burning-questions/asyncapi-openapi-post_pic-01.webp)

> This post [AsyncAPI vs OpenAPI: Answers to Your Burning Questions About the Two Most Popular API Specs](https://solace.com/blog/asyncapi-vs-openapi/) appeared first on [Solace](https://solace.com).

This post answers the following common questions about AsyncAPI vs OpenAPI and APIs in general…

# What are Application Programming Interfaces (APIs)?
Application programming interfaces, or simply “APIs”, are a key part of modern programming that make it easier to exchange information between applications. APIs tell you what information an application expects to receive, and what information an application sends, without needing to know what the internal details of an application.

![Figure 2: APIs provide the gateway into an application, but hide the messy details](/img/posts/openapi-vs-asyncapi-burning-questions/asyncapi-openapi-post_pic-02.webp)

As long as the API doesn’t change, different teams can invoke the application’s functionality without worrying about the messy details underneath. Because of this, separate teams can work independently on implementations.

![Figure 3: APIs give developer teams more independence](/img/posts/openapi-vs-asyncapi-burning-questions/asyncapi-openapi-post_pic-03.webp)

# When did APIs start?
APIs have been around for a while. For instance, the painful Simple Object Access Protocol (SOAP) used APIs in the early 2000s, but they really started getting interesting when representational state transfer (REST) came along. REST, which used the ubiquitous HTTP protocol, was lightweight and fun to work with.

Did REST solve all the problems of SOAP by being lightweight, fun, and easy? Not quite, because it was a little too lightweight in some cases.

# What is Swagger and how does it relate to REST APIs?
There was no great way to tell people in your company or a partner what needed to be in REST requests, and what they could expect as a reply. Whether the request needed a PUT or a POST was a constant source of confusion, and without a standard way of describing REST APIs, you had to resort to emailing.

![Figure 4: Lack of a standard spec made REST APIs difficult to use](/img/posts/openapi-vs-asyncapi-burning-questions/asyncapi-openapi-post_pic-04.webp)

Something needed to happen. Swagger and WADL to the rescue! The goal of these competing standards was to standardize a way of documenting what a REST API looked like that was both readable by humans (somewhat, anyway) and could programmatically validate incoming requests and generate code.

![Figure 5: Swagger provided a standard way to describe REST APIs](/img/posts/openapi-vs-asyncapi-burning-questions/asyncapi-openapi-post_pic-05.webp)

# What happened to Swagger? And what is OpenAPI?
The Swagger specification was renamed OpenAPI in 2016 when the Linux Foundation acquired it from the fine folks at SmartBear. Somewhat confusingly, Swagger lives on as a toolset for creating and manipulating OpenAPI specs.

![Figure 6: Swagger becomes OpenAPI](/img/posts/openapi-vs-asyncapi-burning-questions/asyncapi-openapi-post_pic-06.webp)

Implementing OpenTelemetry typically means instrumenting code so that it can emit monitoring information. This information is then aggregated in a backend system, either on-premises or through monitoring as a service provider.

# Are REST API and OpenAPI the same thing?
They are related but different. OpenAPI describes and documents how a REST API operates in a standard way so that it can be shared widely.

![Figure 7: OpenAPI describes a REST API](/img/posts/openapi-vs-asyncapi-burning-questions/asyncapi-openapi-post_pic-07.webp)

# Why do Microservices Architecture and IoT benefit from  Asynchronous Communications?
Microservices architecture is the new, cool kid on the street. Its purpose is to split up huge globs of code into tiny, manageable pieces, so different teams can work on them simultaneously.

Typically, if a company wants to create something new, it glues different combinations of microservices together using REST calls. This method for microservices architecture worked… to an extent. People eventually realized that REST wasn’t always the best glue, and recognized the need for a new kind of glue that facilitated asynchronous communication.

![Figure 8: Microservice architecture decomposes huge applications into tiny services](/img/posts/openapi-vs-asyncapi-burning-questions/asyncapi-openapi-post_pic-08.webp)

Establishing asynchronous communication between microservices makes them more reliable, faster, easier to scale, and more agile to adopt.  [Here’s a great video explaining why.](https://solace.com/resources/solace-microservices-resources/enhancing-microservices-with-events-video)

The internet of things also changed things up. My [coffee cup](http://www.ember.com/) is connected to the Internet now. Which is fantastic. But internet connected gadgets like cars and stoves and refrigerators don’t always have solid internet connections. Again, asynchronous communication seemed like a better way to connect.

![Figure 9: The Internet of Things connects devices to Internet](/img/posts/openapi-vs-asyncapi-burning-questions/asyncapi-openapi-post_pic-09.webp)

With asynchronous communication, if a device is inaccessible, the information can be stored until it comes back online. Asynchronous communication can also help handle the surge of data than can come from connected devices. For example, think about all the coffee mugs firing up at 7am in the morning…

# Why do Microservices Architecture and IoT benefit from  Asynchronous Communications?
You may be wondering why OpenAPI struggles with asynchronous APIs. Well, prior to version 3.1*, OpenAPI assumed two things:

1. There is a single client connecting to a single server or application.
2. The client requests something from the other server or application.

*_(OpenAPI 3.1 introduces some async capablities through the ability to define webhooks)_

As you can see here, that only covers about 25% of the ways that APIs can be implemented.

![Figure 10: OpenAPI doesn’t address several use cases- modified from Microservice Patterns by Chris Richardson](/img/posts/openapi-vs-asyncapi-burning-questions/asyncapi-openapi-post_pic-10.webp)

Asynchronous communications do not satisfy those assumptions in numerous ways, but two stand out:

- Information is frequently shared with many consumers at the same time.
- In the case of one-way notifications, there may not be a request at all. With event-driven architecture, applications proactively send notifications about things that have occurred without being asked for that information.

# How does AsyncAPI describe asynchronous APIs?
Without diving too deep, AsyncAPI adapts many of the core structures of OpenAPI to the asynchronous world. Rather than assuming that information flows in a request-reply style between a single client and server pair, messages are assigned to “channels” that many applications can send messages to, or receive messages from. If you want to learn more, check out the [primer on the AsyncAPI website](https://www.asyncapi.com/docs/getting-started).

![Figure 11: AsyncAPI describes asynchronous APIs](/img/posts/openapi-vs-asyncapi-burning-questions/asyncapi-openapi-post_pic-11.webp)

With the combination of OpenAPI and AsyncAPI, many more API possibilities are covered, as you can see in this diagram:

![Figure 12- The combination of OpenAPI and AsyncAPI covers modern use cases](/img/posts/openapi-vs-asyncapi-burning-questions/asyncapi-openapi-post_pic-12.webp)


# Can an API gateway be asynchronous?
There’s no reason it can’t be, which is one of the reasons many companies are focusing more on evented API products, along the lines of more traditional API products. Companies like Slack are already letting outsiders use evented APIs.

# If REST is all about HTTP, what protocols does AsyncAPI use?
One of the cool things about AsyncAPI is that you can use a variety of different protocols that are defined by “bindings”. Right now, there are AsyncAPI bindings for over a dozen protocols including Apache Kafka, AMQP, IBM MQ, MQTT, SNS, WebSockets, and JMS.

![Figure 13: AsyncAPI covers a wide array of asynchronous protocols](/img/posts/openapi-vs-asyncapi-burning-questions/asyncapi-openapi-post_pic-13.webp)

# How can I create an Asynchronous API with AsyncAPI?
If you want to see examples of how AsyncAPI can help you create an asynchronous API, there’s a great series with [WebSockets examples](https://www.asyncapi.com/blog/websocket-part1), and you can check out this [code generation example from Solace](https://solace.com/blog/asyncapi-codegen-microservices-using-spring-cloud-stream/). If you’re looking for how to create an AsyncAPI API from scratch, the easiest way is with the [AsyncAPI playground](https://playground.asyncapi.io/?load=https://raw.githubusercontent.com/asyncapi/asyncapi/master/examples/2.0.0/simple.yml).

# What's next for API specs?
AsyncAPI and OpenAPI are now both part of the Linux Foundation, which means:

- Both are well supported and have a stable future
- Both will be open standards with community governance
- Both should continue to be integrated with open-source tooling and commercial products

![Figure 14: OpenAPI and AsyncAPI are now roommates at Linux Foundation](/img/posts/openapi-vs-asyncapi-burning-questions/asyncapi-openapi-post_pic-14.webp)

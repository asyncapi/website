---
title: "Event-Streaming: An Additional Architectural Style to Supplement API Design"
date: 2020-07-07T09:00:00+01:00
type: Engineering
tags:
  - REST APIs
  - Streaming
  - EDA
cover: /img/posts/event-streaming-an-additional-architectural-style-to-suplement-api-design/cover.webp
authors:
  - name: James Higginbotham
    photo: /img/avatars/jhigginbotham.webp
    link: https://twitter.com/launchany
    byline: AsyncAPI Contributor
---

> This post originally appeared on [Capital One Tech](https://medium.com/capital-one-tech/event-streaming-an-additional-architectural-style-to-supplement-api-design-703c4f801722)

The growth and adoption of web-based APIs is key to the transformational technology journey of any enterprise. Those APIs, whether they are RESTful or not, remain synchronous. They, like the web, utilize the pattern of HTTP to implement a request-response interaction approach.

To illustrate, assume we have a project management API with the following interactions:

1. Create a project (e.g. POST /projects)
1. Create a new task (e.g. POST /projects/\{projectId\}/tasks)
1. Assign the task to someone on our team (e.g. POST /tasks/\{taskId\}/assignees)
1. The assignee marks the task as complete (e.g. PUT /tasks/\{taskId\})

An API following this design works if design of the user interface closely mirrors those endpoints. But suppose an additional application requirement is to ‘automatically’ update a task’s status when marked complete by another user. With a request/response web-API, an option is to incessantly poll a status API on the chance a status might have changed. This is both cumbersome and error-prone.
Instead of polling, we can introduce an __event-driven architecture__.

## Introduction to Event-Driven Architecture

In an event-driven architecture (or EDA), an application is composed of independent components that react to events published by other components. EDA is popular for distributed applications, as new components may be introduced into a solution to solve emerging problems — without the knowledge of previously developed components. Message brokers are used as an intermediary for communication, producing a loosely coupled design by preventing components from directly communicating with one another.

If you are familiar with service-oriented architecture (SOA), you have experienced EDA. Most service-oriented architectures used an enterprise service bus (ESB) for service communication rather than a message broker. Events were published to the ESB, where they were then routed to other services to integrate two or more software systems. However, ESBs proved problematic as they were used as “integration glue”, causing integration code to become scattered across services, apps, and the ESB; fragile systems were created. This fragility produced a greater need for coordination between teams, slowing software delivery.

## The Emergence of a Microservice and Event-Driven Architecture

To overcome this increased coordination, the microservice architecture was introduced as a replacement for traditional SOA. This newer distributed architecture, built on APIs and microservices, encourages “dumb pipes, smart endpoints.” Integration logic is pushed to the consumers and producers. Message brokers, rather than ESBs, are used for message routing, not integration logic. Services and APIs talk to one another while hiding implementation details. This loose coupling makes software more resilient to evolution as new requirements emerge.

As enterprises shift to APIs backed by a microservice architecture, the number of published events has grown considerably. Message brokers are typically transactional in nature, ensuring once-and-only-once delivery of messages. While useful for traditional software development, the transactional nature of message brokers limits the scalability of service communication.

Distributed streaming data platforms, such as Apache Kafka, now offer enterprises higher throughput than traditional message brokers. Kafka removes the need for transactional messaging found in message brokers, opting instead for turning events into message streams. These streams are accessible by any authorized subscriber and may be accessed real-time or processed sequentially from a predetermined location or at the start of the stream.

## API Design with Event Streaming

Event streams help software extend beyond the request-response approach common to web API styles such as REST, GraphQL, and gRPC. Software can communicate bi-directionally, removing the need for API consumers to continually poll for state changes. Instead, APIs publish events to an event stream for notification of data changes or important business events to any number of subscribed services for further processing.

Let’s revisit our previous example. We needed to solve two separate requirements:

1. Notification when a task is marked as completed. Our only option without a message-driven architecture is to require interested parties to constantly make API calls to see if the task has been completed (aka polling)
1. Alerting a project owner when a task has been modified or marked as completed. Our only option is to mix our user interface concerns with our API by making the API send an email. The API is no longer responsible for managing projects and tasks — it is now responsible for the content and look-and-feel for email alerts

If we introduce a message-driven architecture to our solution, we can develop an API that delivers project and task resources that offer the necessary capabilities (create, read, update, delete, and mark as complete). Our API doesn’t need to know about how the task completion event notification will be used, including that an email will be sent. All it needs to do is publish event messages when those events occur and allow other services to take action as appropriate. Events this API may publish include:

![Example of API events](/img/posts/event-streaming-an-additional-architectural-style-to-suplement-api-design/event-examples.webp "Example of API events")

Interested parties can then subscribe to the event(s) they are interested in and safely ignore the rest. In our example, we may end up with three components:

1. __Projects API__ — Manages the Projects and Project Tasks resources via a REST-based API. The API may be comprised of one or more microservices that implement the capabilities offered by the REST API. When any event, from the list in the table above, occurs then the API publishes an event into the appropriate message stream for consumption by event subscribers
1. __Task Completed Email Microservice__ — Subscribes to the Task.Completed event, notifying project manager(s) via email when any task has been marked as completed
1. __Task Modified Email Microservice__ — Subscribes to the Task.Updated event, notifying all team members via email when any task has been edited

The API has no awareness of the two microservices subscribed to the specific events; it just publishes the events to the appropriate message stream. The solution is considered loosely coupled and therefore capable of evolving over time as new requirements emerge, perhaps with new types of notifications (e.g. SMS, web dashboard alerts) or integrations (e.g. synching to JIRA).

## Conclusion

The demand for more robust methods of software communication is pushing the limits of today’s interface solutions. Request/response-based APIs are essential. However, today’s technical problems are now demanding event-driven support — in addition to request/response — to improve an API’s capability offerings.

As API designers, we must strive to use all available tools to offer a better developer experience. As you enhance your existing APIs and new APIs emerge, ask yourself:

1. How can my solution architecture be improved by moving beyond standard REST APIs and into a loosely-coupled event-driven architecture?
1. What events should my API publish that would benefit API consumers?
1. How will my API consumers benefit from the addition of these events and how do they take advantage of them?

Let’s shift our approach from strictly request-response to thinking in terms of how our APIs can not only offer endpoints for requests, but events that enable the API to push to other services. The result will be increased innovation and more transformative APIs both within and across our LOBs.

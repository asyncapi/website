---
title: How TransferGo adopted AsyncAPI
date: 2025-09-25T7:26:58+02:00
type: Marketing
canonical: transfergo-asyncapi
tags: ['transfergo', 'fintech', 'asyncapi', 'modelina', 'event-catalog', 'microcks']
cover: /img/posts/may-2021-at-asyncapi/cover.webp
authors:
  - name: Zbigniew Malcherczyk
    photo: https://avatars.githubusercontent.com/u/17534504?v=4
    link: https://www.linkedin.com/in/zbigniew-malcherczyk/
    byline: TransferGo Staff Engineer at Developer Experience Team
excerpt: |
  TransferGo, founded in 2012, serves over 8 million customers in 160+ countries by providing fast and affordable
  international money transfers. In 2021, its Backend Guild faced challenges with inconsistent API documentation and
  schema maintenance across dozens of services and hundreds of channels. To solve this, TransferGo adopted a code-first
  AsyncAPI approach with internal PHP/.NET libraries, integrated validation and optimization pipelines, and automated
  publishing of schemas to a centralized Port.io Developer Portal. With tools like Event Catalog, Microcks, and their
  internal API Guardian CLI, TransferGo ensures reliable, scalable, and well-documented asynchronous communication
  across its event-driven architecture.
---

# Case Study TransferGo AsyncAPI

## Introduction

Founded in 2012, TransferGo serves over 8 million customers in more than 160 countries worldwide.
We aim to provide more accessible financial services to migrants, making international money transfers cheaper, simpler,
and faster.

> You can read TransferGo's full story on [transfergo.com](https://www.transfergo.com/story)

## TransferGo Architecture

Just like any other fintech, time is crucial to its operation. The customers expect their money to travel instantly.
Therefore, the majority of the systems rely on Event Driven Architecture.
That is asynchronous communication which is sorely built on Amazon Web Services (AWS) and its flag products, Simple Notification
Service (SNS) and Simple Queue Service (SQS), with a pinch of Kafka.

![Async Communication flow](/img/posts/transfergo/light/0.png#gh-light-mode-only)

## How it Started?

### AsyncAPI Standard Introduction

In 2021, the Backend guild in TransferGo defined a problem. There were too many approaches to documenting REST and async
APIs within the guild. That was when the story of TransferGo and AsyncAPI Initiative began. Let me tell you how we
leveraged the possibilities of the AsyncAPI specification to improve and drive our engineers' experience.

### Code-first Documentation

Because of quite a big codebase, the threat of API schema being out of date was quite there. Therefore, the organisation
didn't advocate for an API-first approach, as the code is a source of truth for a long-living product. To ease the pain of
repeating the same information over and over, the backend guild rolled out a unique internal library that based on
Reflection builds message payload from its Data Transfer Object (DTO).

This combination enables your engineer to:

* Ease the introduction for an engineer
* Fewer repetitions in the code
* Ensures standard across company
* Enables seamless upgrades between AsyncAPI versions

The only minus is that the library must be maintained

```php
#[Message(name: 'PaymentExecuted')]
#[Channel(name: 'payment_executed')]
final readonly class PaymentExecuted
{
    public function __construct(
        public float $amount,
        public string $createdAt,
    ) {
    }
}
```

Our internal library, with just these two attributes, generates an async api schema like this:

```yaml
asyncapi: 3.0.0
info:
  title: 'Service Example API'
  version: 1.2.3
channels:
  payment_executed:
    messages:
      PaymentExecuted:
        $ref: '#/components/messages/PaymentExecuted'
components:
  messages:
    PaymentExecuted:
      payload:
        type: object
        properties:
          amount:
            type: number
          createdAt:
            type: string
        required:
          - amount
          - createdAt
```

### Continuous API Validation

The schema catalog grew quite fast; with over 50 services, we started to notice inconsistencies and sometimes even invalid
schemas. With teams growing, we had to support more events, more operations and more approaches. For example, some teams preferred
writing/generating Async API yaml schema with the help of AI. Growing technical stacks, validated our
ideas in 2021, and we had to take some actions.

Let's not reinvent the wheel. [AsyncAPI CLI](https://www.asyncapi.com/tools/cli) has a built-in validation command, which comes in handy. It's easy to use
and quite fast. This way, with simple `asyncapi validate schema.yaml`, we managed to ensure our services expose ONLY valid
schemas. But some docs were quite heavy. 1 MB. Yes, 100 channels and twice that contracts can bring your schema to that size,
thanks to `asyncapi optimise schema.yaml` command, we cut the size by about 50%. That's a small win for us, our resources and the planet.

We also noticed that there are teams that like to pimp-up their schema, and teams that fall behind. We were looking for
a system that could reward some teams and encourage others. At that time, we also invested time in the Service
Catalog - That's why we raised a [proposal of adapting an ability to score the schema](https://github.com/asyncapi/cli/issues/1131)
You can enjoy this feature since [2.2.0 version](https://github.com/asyncapi/cli/releases/tag/v2.2.0)

### Documentation Showcase

We’ve spent time making sure our services are well-documented and validated - but let’s be honest, reading YAML isn’t exactly fun for (unless you're an AI).
So we started looking for tools that could present our schemas in a more visual, developer-friendly way.
At first, we used the official [React Component](https://github.com/asyncapi/asyncapi-react) to render the documentation. Thanks to our internal tooling,
each service could host its own visual docs. While this worked in principle, it wasn't the best experience: _engineers had to remember where each service's docs lived or manually navigate to a central document listing them all._
To solve this, we decided to adopt a more modern and scalable approach: a **Service Catalog and Developer Portal**.
After weighing our options, we chose [Port.io](https://port.io). It offered a lot of functionality, but the key
win for us was the ability to generate a UI for our AsyncAPI definitions and provide a unified interface where all service documentation is just a click away.
To keep everything up to date, we automated the publishing process using a **GitHub Actions workflow**. This workflow pulls the latest AsyncAPI specs from S3 bucket and pushes them into Port.io, so the documentation is always current without any manual effort.

Now, instead of chasing URLs or digging through repos, developers can browse all available services, see their contracts visually, and quickly understand how to integrate with them — all in one place.


## How's it Going?

### Event Catalog

With over 300 channels, learning what's published and where and when is quite a challenge. Gladly, there are solutions for this pain.
The [Event Catalog](https://www.eventcatalog.dev/) project, done by [David](https://github.com/boyney123) helped us
show the big picture and significantly showcased scenarios that required our attention. Below, you can find our process
of gathering schemas and building an event catalog from AsyncAPI files.

![Service documentation generation pipeline](/img/posts/transfergo/light/1.png#gh-light-mode-only)

![Event Catalog Building pipeline](/img/posts/transfergo/light/2.png#gh-light-mode-only)

### Contract Testing

Recently, our attention has been focused on contract testing. It would be ideal to build such an extra layer of tests based
on well-known specs like OpenAPI and AsyncAPI. Multiple solutions were tested, but the [Microcks](https://microcks.io/)
project seemed to suite us the best.

We’ve recently been focusing more on contract testing as a way to ensure our services interact reliably as they grow and change.
By validating service communication against defined contracts, we catch issues early and avoid surprises when integrating new features.

To do this, we rely on well-known specifications like OpenAPI for REST and AsyncAPI for asynchronous messaging.
These specs define the expected request/response structure or message formats, and serve as the source of truth
for what services send and receive.

After trying out several tools, we found Microcks to be the best fit for our needs. It supports both OpenAPI and
AsyncAPI, making it easy to import our specs, simulate endpoints, and run conformance checks automatically.

Our message-driven architecture includes Symfony-based workers that consume real messages — often from AWS SQS.
To test these components properly without relying on cloud infrastructure, we use LocalStack to emulate AWS services locally.
This lets us run realistic, end-to-end contract tests as part of our pipeline.

We’ve integrated this setup into our [Jenkins](https://www.jenkins.io/) CI pipeline. During test runs, we bootstrap Microcks with our AsyncAPI definitions,
which describe the expected message structure and communication channels. Once the services and workers are up, Microcks
sends test messages through LocalStack, and we validate that our Symfony workers process them as expected.

This approach has helped us detect contract issues early, maintain clear communication boundaries between services,
and keep our integration tests fast and reliable.

![Chart presenting how TransferGo adopts Microcks](/img/posts/transfergo/light/microcks.png#gh-light-mode-only)

### API Coverage

One of the problems within distributed systems and organisations is ensuring trust.
Engineers must trust your Event Catalog and your API. To do so, you need to ensure it's up to date.
Many systems provide Schema Registry, but not all of them. When dealing with mature systems, it's not so easy to migrate
to new and fancy systems.

That's how the concept of API Guardian came up. This is our internal tool that checks and compares. Service cloudformation
file and async api schema. Looking for forgotten channels. It's nothing more than a simple CLI app based on Oclif
Framework that compares two or multiple of files. It's a more complicated topic as you need to understand which parts
of the infrastructure are the contracts. Some elements must be ignored, like Dead Letter Queues or Internal Queues. Because of that,
We can develop a nice config file that lets you ignore specific SQS, SNS, and channels as necessary.

```
node asyncapi-coverage
    --async-api-schema async-api-docs.yaml
    --cloudformation sns-sqs.yaml
    --service service-name
    --environment production
    --coverage 100
```

```json
{
  "ignore": {
    "sqs": [
      "${AppEnvironment}-${Service}-commands.fifo",
      "${AppEnvironment}-${Service}-events"
    ],
    "sns": [],
    "channels": []
  }
}
```

## The Big Picture

![TransferGo Big Picture Architecture](/img/posts/transfergo/light/big-picture.png#gh-light-mode-only)

## Summary

At TransferGo, reliable communication between services is critical - especially in a fast-paced, event-driven fintech environment.
To support this, we adopted the AsyncAPI specification to bring clarity, consistency, and automation to how we document, validate, and test asynchronous APIs.
Starting with a code-first approach, we built internal tooling that automatically generates AsyncAPI schemas from DTOs, ensuring that documentation stays in sync with actual behavior.
As the number of services and channels grew, we introduced validation pipelines, schema scoring, and optimization practices to maintain quality at scale.
We then tackled accessibility by moving from isolated, YAML-based docs to a centralized Developer Portal powered by Port.io.
For testing, we use Microcks with LocalStack in Jenkins CI to run end-to-end contract tests against real message consumers.
To further increase trust and visibility, we integrated our schemas into an Event Catalog and built a custom CLI tool, API Guardian, to measure schema coverage against deployed infrastructure.
AsyncAPI has become a foundational part of how we scale service development at TransferGo - helping us move fast, stay aligned, and keep our system reliable and well-documented from day one.

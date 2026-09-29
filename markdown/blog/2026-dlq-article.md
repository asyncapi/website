---
title: "Your Event-Driven System Isn't Fault-Tolerant Until You've Tested It"
date: 2026-09-22T06:00:00+01:00
type: Community Education
tags:
  - Webinar
  - Blog article
cover: /img/posts/marketing-images/dlq-article-image.webp
authors:
  - name: Atinuke Oluwabamikemi Kayode
    photo: /img/avatars/bami.webp
    link: https://www.linkedin.com/in/atinuke-oluwabamikemi-kayode-5b838b1b7/
    byline: AsyncAPI Community Marketing Specialist
excerpt: "A message broker can give your event-driven system decoupling and durability, but that doesn’t automatically make it fault-tolerant. What happens when a message fails, retries are exhausted, or the payload itself is invalid? This article explores how to make retry and dead-letter behavior explicit with AsyncAPI and Specmatic—and, more importantly, how to test that your system actually behaves as expected."
---


#### **Why a message broker doesn't automatically make your system resilient, and how to verify failure handling with AsyncAPI and Specmatic**

Adding a message broker to your architecture doesn't automatically make your system fault-tolerant.

The producer publishes an event. The broker holds it. The consumer processes it when ready. This gives you decoupling and durability, but it doesn't answer an important question:

**What happens when processing fails?**

Should the consumer retry? How many times? What happens after those retries fail? And what if the message itself is invalid?

Retry logic and dead-letter queues (DLQs) can handle these scenarios. But implementing them isn't enough. You need to define the expected behavior and test that your system follows it.

Let's look at how you can do that with AsyncAPI and Specmatic.

## **Three failures your consumer needs to handle**

Consider a simple system:

An Order App publishes an order to a Kafka topic. A consumer processes the message and, on success, forwards the order to an SQS queue.

Even this simple flow has three failure scenarios.

### **1\. Transient failure**

An SQS request times out. A database connection drops. A downstream service temporarily becomes unavailable.

The order isn't necessarily bad. The downstream system might just need time to recover.

The consumer should retry, but with a backoff strategy and a maximum number of attempts. Otherwise, it can overwhelm an already struggling service or retry indefinitely.

### **2\. Retries are exhausted**

Suppose the consumer retries three times and the operation still fails.

The message shouldn't disappear. It should move to a dead-letter queue, where operators can inspect the failure and potentially replay the message later.

### **3\. The message is invalid**

Some failures won't disappear with another attempt.

If the payload is invalid, retrying it three, ten, or one hundred times won't fix it. The message should skip the retry cycle and go directly to the DLQ.

Together, those behaviors look roughly like this:

Order App ──▶ place-order-topic ──▶ Consumer ──▶ place-order-queue  
                                      │  
                               transient failure  
                                      ▼  
                           place-order-retry-topic  
                                      │  
                               Retry Consumer  
                                      │  
                         retries exhausted  
                                      ▼  
                           place-order-dlq-topic

Invalid messages ────────────────────▶ DLQ

Most teams can build something like this.

The harder question is: **How do you know it still works?**

Retry paths only run when something has already gone wrong. That makes them easy to overlook and easy to break without affecting the system's normal behavior.

Your application can look healthy while its failure-handling path is broken.

## **Put the reliability contract in your AsyncAPI document**

AsyncAPI already describes channels, operations, messages, and payload schemas.

Specmatic extends that contract with two properties for describing retry and dead-letter behavior:

* `x-specmatic-retry`  
* `x-specmatic-dlq`

For example:

operations:  
  sendOrder:  
    \# ... channel, action, messages ...

    x-specmatic-retry:  
      channel:  
        $ref: '\#/channels/retryTopic'  
      messages:  
        \- $ref: '\#/channels/retryTopic/messages/retryMessage'  
      maxAttempts: 3  
      strategy:  
        type: exponential  
        initialDelaySeconds: 1  
        multiplier: 2

    x-specmatic-dlq:  
      channel:  
        $ref: '\#/channels/dlqTopic'  
      messages:  
        \- $ref: '\#/channels/dlqTopic/messages/placeOrderDlqMessage'  
      waitTimeInSeconds: 15

Now the expected behavior is explicit.

The specification tells us where failed messages should go, how many attempts are allowed, which backoff strategy to use, and which message should arrive on the DLQ.

A developer doesn't need to inspect the consumer implementation to discover these requirements.

More importantly, a testing tool can read the same contract.

That's where this becomes useful.

## **Test the contract against the broker**

Writing the behavior down isn't enough. You still need to prove that the implementation follows it.

For this example, you can run Kafka, an SQS-compatible endpoint, and the consumer locally, then use Specmatic to test the system against the AsyncAPI document.

A complete test should cover four scenarios:

* **Valid order:** The message reaches the SQS queue.  
* **Invalid order:** The message goes directly to the DLQ.  
* **Transient failure:** The message reaches the retry topic.  
* **Repeated failure:** The message is retried and eventually reaches the DLQ.

The important part is that you're testing **observable behavior**, not implementation details.

The test doesn't need to know whether your consumer uses Spring Kafka, NestJS, or a custom implementation.

It asks a simpler question:

**Did the right message reach the right place?**

You can see the value by deliberately breaking the system.

Disable the retry consumer and run the tests again. Your normal message flow might continue working, but the scenarios that depend on retries should fail.

Without those tests, the broken retry path could remain unnoticed until a real downstream failure occurs in production.

This is also why testing only the retry count isn't enough.

A unit test might confirm that a function retries three times. It doesn't prove that a message that exhausts those retries actually reaches the DLQ with the expected payload.

For reliability testing, the final outcome matters.

## **From vendor extension to standard behavior**

Today, `x-specmatic-retry` and `x-specmatic-dlq` are vendor extensions. Tools need to understand Specmatic's extensions to use them.

There is ongoing work to explore bringing retry and dead-letter-queue behavior into the AsyncAPI Specification itself. [Checkout the GitHub discussion](https://github.com/asyncapi/spec/pull/1236)

If that happens, AsyncAPI tooling could reason about reliability in the same way it already reasons about channels, messages, and schemas.

A documentation renderer could display retry behavior. A code generator could use it when generating consumers. A testing framework could verify it.

But the larger idea doesn't depend on whether these particular extensions become standard:

**Reliability behavior should be explicit and machine-readable.**

That's also increasingly useful when AI agents generate code.

“Retry failed messages” is ambiguous.

How many times? Which failures are retryable? What's the delay? Where does the message go when retries are exhausted?

A machine-readable contract answers those questions before an agent writes the implementation, and a test suite can verify the result afterward.

## **Conclusion**

A message broker doesn't automatically make an event-driven system fault-tolerant. You still need to define what happens when messages fail.

More importantly, you need to test that behavior.

By describing retry and DLQ behavior in your AsyncAPI document, you can turn those reliability requirements into a contract that tools such as Specmatic can verify against your running system.

**Fault tolerance isn't just something you implement. It's something you test.**

If this way of thinking about event-driven reliability is useful to you, the best next step is to see it applied live. 
[Join us at the next webinar](https://www.youtube.com/watch?v=KuuKTUfMiV0) to watch these techniques in action, ask questions in real time, and hear what's coming next for AsyncAPI and Specmatic.
You can also watch the original walkthrough this article is based on, [link to livestream](https://www.youtube.com/watch?v=I6z1WC6Qo2o&t=38s).

Want to keep the conversation going in between sessions? Jump into the [AsyncAPI community Slack](https://join.slack.com/t/asyncapi/shared_invite/zt-4ao9kleza-fL7lTw~LSjpIR2Jhth1dug) to talk with maintainers and other practitioners, and check out [asyncapi.com](https://www.asyncapi.com/en) for the full specification, tooling, and documentation.


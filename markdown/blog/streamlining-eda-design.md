---
title: Streamlining EDA Design with AsyncAPI Code Generation and PubSub+ Event Portal
date: 2024-12-24T08:14:40.065Z
type: Engineering
canonical: https://solace.com/blog/streamlining-eda-design-asyncapi-code-gen-event-portal
tags: 
  - Event Portal
  - EDA
  - Spring Cloud Streams
  - Event-Driven APIs
cover: /img/posts/streamlining-eda-design/streamlining-eda-design-banner.webp
authors:
  - name: Giri Venkatesan
    photo: /img/avatars/gvensan.webp
    link: https://linkedin.com/in/girivenkatesan
    byline: AsyncAPI Ambassador
excerpt: The combination of AsyncAPI, PubSub+ Event Portal, and Spring Cloud Stream provides a streamlined yet powerful approach to designing, developing, and managing event-driven systems.
---

As developers strive for ‘<b><i>designed with precision and tested to perfection</i></b>’ to ensure reliability, efficiency, and improved user experience, it’s important to recognize the complexities and challenges of real-world applications. This ongoing effort for improvement is particularly true and complex in the context of event-driven systems.

Building event-driven systems presents several unique challenges compared to traditional request-response systems, with code generation being the first step.

![Common challenges in designing Event-driven Systems](/img/posts/streamlining-eda-design/common-challenges-designing-event-driven-systems.webp)


The first three challenges are inherent to the system’s nature and behavior. [Solace PubSub+ Event Broker](https://solace.com/products/event-broker/) provides robust capabilities to address these challenges.

* **Complexity of Asynchronous Interactions:** Issues related to concurrent processing, error handling and the unpredictability around ordered processing.
* **Event Handling:** In decoupled, asynchronous systems, event loss or duplication is a risk. Without a robust event broker in the mix, managing this is hard. Evolving schemas and versions add complexity. Rigorous testing is key to ensuring consistent event-driven interactions.
* **Observable Outcomes:** Asynchronous interactions can lead to non-deterministic outcomes, making verifications challenging. Unlike synchronous systems, event-driven interactions lack immediate feedback, complicating real-time verification of correctness. Additionally, managing state becomes more complex, as the system’s state change unpredictably based on the sequence and timing of events further complicating the verification process.

This is only half the battle, however. The other half involves having systems that support designing the EDA that can be tested. [Solace PubSub+ Event Portal](https://solace.com/products/portal/) helps you design the building blocks of your event-driven system, aligned with the capabilities of Event Broker. By fully embracing the AsyncAPI standards, Event Portal offers a comprehensive way to design, document and discover event-driven services.

* **Standardization:** Standardization is crucial for documenting and testing system-wide interactions in event-driven systems. Without it, testing can become significantly more complex and resource intensive.
* **Integration and Performance Testing:** Testing integration, scalability, and performance in event-driven systems is challenging due to loose coupling, asynchronous communications, and variable latency. Comprehensive testing scenarios, supported by standardized tools and frameworks, are essential for reliable end-to-end testing.

This synergy between Event Portal and AsyncAPI not only helps address the initial challenges, but facilitates code generation and testing, significantly enhancing design, development, documentation, and testing processes aligned with your SDLC.

## The Emergence of Event Portals
An event portal lets IT organizations more effectively create, share, and manage event streams and event-driven APIs and applications as part of event-driven architecture.

> An event portal, like an API user portal, provides a place for event publishers and event consumers (aka sinks) to connect and collaborate on event usage policy and subscription to event streams.
<sub><i>David Mooter, Forrester Research, “Use EDA In Your Quest for Modern Applications”, Apr 9, 2021</i></sub>

In context of EDA, event portals serve three primary audiences within enterprise IT organizations:

* **Architects** use event portals to define, discuss and review events, data definitions and application relationships.
* **Developers** use event portals to discover, understand and reuse events across applications, lines of business and between external organizations more easily.
* **Data scientists** use event portals to better understand event-driven data and discover new insights by combining events.

Solace pioneered the event portal space with the introduction of PubSub+ Event Portal, which lets you design and organize the building blocks of your event-driven system as manageable design artifacts.

PubSub+ Event Portal lets you give developers [self-service](https://solace.com/products/portal/self-service-access/) access to event streams and easily configure event brokers within guardrails set by your middleware/integration teams offering faster development, strong governance and better efficiency.

![Visualizing your Event-Driven Design](/img/posts/streamlining-eda-design/app-domain-app-event-schema-circle-diagram.webp)


An **Application** represents a client interacting with an event broker by consuming, producing, or processing events. It encapsulates the contract details through event, schema, and topic definitions. The Application is a real-world service or task that must be converted into a runnable component for asynchronous interactions within the enterprise.

![Designing Event Flow](/img/posts/streamlining-eda-design/event-portal-asyncapi-post_pic-02-1536x994.webp)

Designing your event flows using Event Portal is the important first step on your journey, but once you have the application’s interface “contract ready,” code generation is the next step towards implementing EDA for real-world use cases.

## AsyncAPI Specification
AsyncAPI defines and documents event-driven APIs, much like how OpenAPI serves RESTful APIs. AsyncAPI provides a standard way to define the contract between the producer and consumer of an event-driven system. This contract can be used to generate code, documentation, and tests, ensuring that the system behaves as expected.

With AsyncAPI specification, you have a well-structured document defining the asynchronous communication patterns, message formats, and EDA for your system. However, it doesn’t inherently offer tools for managing, deploying, or maintaining those APIs over time. To operationalize your AsyncAPI definitions. Enables efficient event discovery and governance, handles version management, mapping the specification to runtime environments and facilitates a better CI/CD pipeline ensuring your EDA can scale, evolve and perform reliably in production.

The first step is to obtain an AsyncAPI document that defines the application you want to develop. You can generate the AsyncAPI document from an application directly from Event Portal.

![Generate AsyncAPI document](/img/posts/streamlining-eda-design/event-portal-asyncapi-post_pic-03-1600x811.webp)

To bridge the gap between AsyncAPI specifications and practical implementation, it is essential to understand how AsyncAPI elements map to application components in PubSub+ Event Portal. Here’s how various AsyncAPI elements—such as channels, messages, and schemas—equate to counterparts in Event Portal.


<p align="center"><img src="/img/posts/streamlining-eda-design/ep-asyncapi-table.webp" alt="Event Portal to AsyncAPI mapping table" /></p>

## AsyncAPI Code Generation
The AsyncAPI Generator tool is your best friend for generating code or frameworks, with rich sets of binders for all popular programming languages. You can find the full list of official generator templates in the [asyncapi/generator](https://github.com/asyncapi/generator) repository.

## Java Spring Cloud Stream
The Java Spring Cloud Stream generator template, contributed by Solace, can generate scaffolding code from an AsyncAPI specification that can be built upon to get the asynchronous, publish-subscribe interaction with your brokers including Solace, Kafka and RabbitMQ.

Java Spring Cloud Stream is well suited for EDA and a popular choice for implementing event-driven microservices, and works effectively with AsyncAPI for several reasons:

* **Abstraction Over Messaging Middleware:** Spring Cloud Stream abstracts messaging systems like Kafka and RabbitMQ, enabling developers to focus on business logic rather than middleware complexities, which is especially useful in event-driven systems with multiple messaging systems.
* **Binder Abstraction:** The binder abstraction in Spring Cloud Stream simplifies the integration with different messaging systems. Developers can switch between messaging platforms with minimal code changes by using binders.
* **Integration with Spring Ecosystem:** Spring Cloud Stream integrates seamlessly with Spring Boot, Spring Integration, and Spring Security, leveraging configuration management, dependency injection, and security features across the Spring ecosystem.
* **Event-Driven Programming Model:** Spring Cloud Stream promotes an event-driven programming model with annotations that make it easy to develop, test, and maintain event-driven applications.
* **Configuration and Dependency Management:** Spring Boot’s auto-configuration and dependency management minimize boilerplate code and configuration overhead, simplifying event-driven microservice setup and aligning with AsyncAPI’s structured approach.
* **Community and Ecosystem:** Spring Cloud Stream benefits from the extensive Spring community and ecosystem, providing access to a wealth of resources, tutorials, and support.
* **Alignment with AsyncAPI:** Spring Cloud Stream’s configuration-oriented approach aligns well with AsyncAPI’s contract-first design, allowing direct mapping of AsyncAPI specifications to ensure adherence to defined event-driven contracts.

<p align="center"><img src="/img/posts/streamlining-eda-design/asyncapi-scst-table.webp" alt="AsyncAPI to Spring Cloud Stream mapping table" /></p>


## An Example: Coffee Shop
I’ll give an example of the Coffee Shop domain shown in this diagram, focusing on two applications:

* **Order Management System:** The heart of Coffee Shop domain that serves received requests with an orderId, and continuously updates the order progress as updated by other applications such as Kitchen Floor, Inventory, and others.
* **Barista Station:** The Barista station that monitors the order progress and updates order progress status including ready for pickup status.

<p align="center"><img src="/img/posts/streamlining-eda-design/event-portal-asyncapi-post_coffee-shop-example.webp" alt="Coffee Shop Example" /></p>

I’ll walk through the process of building these applications and demonstrate the design-to-code using AsyncAPI document and spring-cloud-stream binder for code generation.

1. Download AsyncAPI document of the Order Management application and generate spring-cloud-stream application using asyncapi-generator utility

<p align="center"><img src="/img/posts/streamlining-eda-design/event-portal-asyncapi-post_pic-03-1600x811.webp" alt="Download AsyncAPI document" /></p>

```bash
asyncapi-generator
  -p binder=solace
  -p artifactId=CoffeeShop
  -p groupId=com.coffeeshop
  -p javaPackage=com.coffeeshop.ordermanagement
  -p actuator=true "Order Management-0.1.0.json"
  @asyncapi/java-spring-cloud-stream-template
  -o "Order Management"
```

2. Download AsyncAPI document of the Barista Station application and generate spring-cloud-stream application using asyncapi-generator utility

<p align="center"><img src="/img/posts/streamlining-eda-design/event-portal-asyncapi-post_pic-08.webp" alt="Download AsyncAPI document" /></p>


```bash
asyncapi-generator
  -p binder=solace
  -p artifactId=CoffeeShop
  -p groupId=com.coffeeshop
  -p javaPackage=com.coffeeshop.baristastation
  -p actuator=true "Barista Station-0.1.0.json"
  @asyncapi/java-spring-cloud-stream-template
  -o "Barista Station"
```

The Spring Cloud Stream microservice generated using this template will be a ready to run Spring Boot app. By default, the microservice will contain a java class, ```Application.java```, which includes methods to publish or subscribe events as defined in the AsyncAPI document. These generated methods include *Supplier*, *Consumer* and *Function* functional interfaces from the [```java.util.function```](https://docs.oracle.com/javase/8/docs/api/java/util/function/package-summary.html) package. These methods will be pre-configured to publish to and consume from the channels as defined in the AsyncAPI. This configuration is in the ```spring.cloud.stream``` section of the generated ```application.yml``` file.

With the addition of appropriate business logic on these Spring applications, we should see a new order placed by the Order Management System receives Order Completed event asynchronously when it is completed.

A completed code of the referred sample applications is at [https://github.com/gvensan/ep-coffeeshop-design-to-code](https://github.com/gvensan/ep-coffeeshop-design-to-code)

## Conclusion
The combination of AsyncAPI, PubSub+ Event Portal, and Spring Cloud Stream offers a simple yet powerful means for designing, developing, and managing event-driven systems.

I’d like to wrap things up with a few recommendations:

1. **Adopt AsyncAPI:** Embrace AsyncAPI for its robust specifications and structured approach to defining event-driven services. This ensures clarity and consistency across the development lifecycle.
2. **Utilize PubSub+ Event Portal:** Leverage the design and management capabilities of Event Portal to create, document, and export your EDA applications as AsyncAPI documents. This facilitates a seamless transition from design to implementation.
3. **Employ Code Generators:** Use AsyncAPI code generators to automate the creation of boilerplate code for frameworks like Spring Cloud Stream. This approach not only accelerates development and ensures alignment with the defined specifications but also significantly boosts developer productivity by reducing manual coding effort. Additionally, it minimizes errors in transcription by generating accurate, consistent code based on the specifications, leading to fewer bugs and a smoother development process.
4. **Integrate with Spring Cloud Stream:** Implement your event-driven services using Spring Cloud Stream to benefit from its abstraction over messaging systems, ease of configuration, and integration with the Spring ecosystem.

By following these recommendations, you can harness the full potential of AsyncAPI, PubSub+ Event Portal, and Spring Cloud Stream, leading to more efficient, reliable, and scalable event-driven architectures.

---

Originally published at [https://solace.com/blog/streamlining-eda-design-asyncapi-code-gen-event-portal](https://solace.com/blog/streamlining-eda-design-asyncapi-code-gen-event-portal)

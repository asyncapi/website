---
title: "Replicating the Success of REST in Event-Driven Architecture"
date: 2019-04-04T13:56:52+01:00
type: blog
featured: true
tags:
  - REST
  - Event-Driven Architectures
  - EDA
cover: /images/posts/replicating-success-of-rest.png
weight: 100
authors:
    - name: Jonathan Schabowsky
      photo: /images/avatars/jschabowsky.jpg
      link: https://twitter.com/jschabowsky
      byline: Sr. Architect at Solace
    - name: Fran Méndez
      photo: /images/avatars/fmvilas.jpg
      link: https://twitter.com/fmvilas
      byline: AsyncAPI founder
---

_This post is a collaboration between {{% link "https://solace.com/blog/author/franmendez/" %}}Fran Méndez{{%/link%}} of AsyncAPI and Solace’s {{%link "https://solace.com/blog/author/jonathan-schabowsky/"%}}Jonathan Schabowsky{{%/link%}}. It was originally published at {{%link "https://solace.com/blog/rest-event-driven-architecture/"%}}Solace’s blog{{%/link%}}._

Jonathan explained in his {{%link "https://solace.com/blog/downside-event-driven-architecture/"%}}last blog post{{%/link%}} how the loose coupling of applications associated with event-driven architecture and publish/subscribe messaging is both a strength and a weakness. As part of that, he touched on the fact that request/reply interactions using RESTful APIs are still the dominant application integration paradigm, even in hybrid cloud, machine learning and IoT use cases that benefit from event-driven interactions. There’s still tons of use cases for which RESTful request/reply interactions are perfect, but it’s important to be able to mix and match the right exchange pattern (Command, Query and Event) for the job especially where event-driven would be best suited.

In many cases, exploring why one thing has established or maintained popularity can help you understand why something else isn’t quite as hot, even though it seems like it should be. With this post I’ll investigate why the use of RESTful APIs is still so prevalent, and see if the reasons for its persistent popularity might act as a blueprint for making event-driven popular and mainstream. So, how did REST come to be the most popular way to connect applications? And why does everyone think it’s so easy?

## How did REST get to be so hot?
REST’s popularity arose out of the need for data exchange and interactions between the web browser and backend services. In that context it became a de facto standard because it integrated so well with JavaScript and was so much easier than SOAP (a decent protocol that became bloated and complicated over time). From there, developers started using REST to connect internal enterprise applications, IoT devices and even microservices. It might not have been the best fit for all those use cases, but it got the job done.

As {{%link "https://twitter.com/MattMcLartyBC"%}}Matt McLarty{{%/link%}} mentions in his blog post {{%link "https://www.infoq.com/articles/overcoming-restlessness?utm_source=sumome&utm_medium=twitter&utm_campaign=sumome_share"%}}Overcoming RESTlessness{{%/link%}}, a complete examination about why REST started to be used in places that it’s not ideal for “would ignore the power that comes from REST’s universality.” He’s referring to the fact that REST has become universal because developers “get it” and it’s surrounded by a thriving ecosystem of complementary technology and tools. Without this ecosystem that REST inherited from the web world, that universal adoption simply would not have happened.

## The Building Blocks of REST’s Success
If you look closely at this ecosystem (foreshadowing) you can see that it’s composed of some foundational components upon which the open source and vendor community have built what I’ll call “enablement tooling.” Here’s what I mean:

## Foundational Components
* **Web servers** were the workhorse of the web for years before REST came into existence. They were much simpler than the application servers of the time and optimized to deal with large numbers of lightweight request/reply communications interactions like serving up a web page that somebody requests.
* **Development frameworks** like Spring, JAX-RS, Restlet and Node.js reflect the fact that people invested time and energy to make the developer experience easy, i.e. keeping them from having to write boilerplate connection code so they could focus on the hard part of developing and refining business logic.
* **Security frameworks** like OAUTH for authentication and authorization, and TLS for encryption, established the means by which interactions and information can be made secure.

## Enablement Tooling
* **API Management**: Companies like Apigee and MuleSoft built platforms that provide an API portal so developers can describe and discover APIs in design-time, API gateways to ensure security, management and API mediation, and finally usage analytics which inform which APIs are most and least used. These API management solutions are used increasingly for sophisticated API creation and design, and to act as API marketplaces.
* **Runtime API Discovery**: As APIs and applications have become increasingly dynamic and distributed due to continuous delivery, containerization, cloud-bursting, discovery tooling such as Netflix Eureka and Istio/Envoy (service mesh) have been created to reduce the complexity of API clients and enable them to connect to services anywhere.
* **Specification for API Description**: OpenAPI was created as a machine-readable metadata specification in order to document, design and consume APIs. This is incredibly valuable for use by testing tools, clients and document generation.
* **Code Generation Tools**: Swagger and its associated code generation tooling lets developers easily take an OpenAPI definition and generate either client or server code, drastically reducing the amount of work it takes development teams to use APIs.

Without the foundational components, not only would the enablement tooling not have been possible, there wouldn’t have been any need or demand for it. This ecosystem of tools has facilitated REST’s ascension to its position as the de facto standard for application interactions today. While I lament the fact that event-driven hasn’t achieved this same level of adoption and devotion, I understand why, and know that without similar tooling it never will.

## How Event-Driven is Following in REST’s Footsteps
There is no reason why the event-driven world can’t learn from the RESTful API world by leveraging and developing similar foundational components and enablement tools. In fact, some very exciting initiatives are underway and picking up steam in the industry and within Solace:

## Foundational Components
* **Event Brokers**: This one is easy as many simple (RabbitMQ, ActiveMQ) and advanced event brokers (Solace PubSub+, Kafka) exist today. Many of them are battle-tested and used widely in organizations that are event-driven.
* **Development Frameworks**: Spring Cloud Stream makes writing event-driven microservices easy, and Paho for MQTT makes it easy to create event-driven IoT sensors in many programming languages.
* **Security**: Frameworks like OAuth enable authentication and authorization in the event-driven world along with TLS for encryption for confidentiality/integrity.

## Enablement Tooling
* **Event Management**: While {{%link "https://solace.com/what-is-an-event-broker/"%}}advanced event brokers{{%/link%}} perform many functions similar to those of an API Gateway, no vendor offers a platform that does everything for events that API management platforms do for RESTful API interactions. There are no “event portals” for developers to use, for example, in order to design, document and discover events.
* **Runtime Event Discovery**: In the Eventing world, the ability to deliver events to consumers is even more complicated than with APIs because of the combination of 1-many event distribution, guaranteed and in-order quality of services along with event producers and consumers being just as dynamic and distributed as what is found with APIs. This has challenged infrastructure and operations teams for years all while client applications should not be burdened with these complexities. The {{%link "https://solace.com/what-is-an-event-mesh/"%}}event mesh{{%/link%}} is an emerging architectural concept that provides similar functionality to the {{%link "https://www.nginx.com/blog/what-is-a-service-mesh/"%}}service mesh{{%/link%}} but is targeted towards asynchronous interaction patterns. This removes the complexities previously described by enabling producers and consumers to exchange events regardless of where they are physically deployed all while maintaining event delivery qualities of service.
* **API Description Specification**: [AsyncAPI](https://www.asyncapi.com/) is on a mission to standardize event-driven API interactions and support the wide variety of messaging systems available. This is a corollary to {{%link "https://swagger.io/docs/specification/about/"%}}OpenAPI{{%/link%}} — a universal language for all the different messaging protocols and event schema formats. The purpose of AsyncAPI is to enable architects and developers to specify the event payload definition, channel name, application/transport headers and protocol– thus fully specifying the application’s event-driven interface. This was previously not available but, thanks to Fran Méndez and the AsyncAPI Initiative, event-driven applications will receive the same love as RESTful APIs.
* **Code Generation Tools**: AsyncAPI is also working in this direction. For instance, the ability to take an AsyncAPI definition and generate event-driven applications is underway for Spring Cloud Stream. This will drastically reduce the effort to create new applications!

## Conclusion
EDA’s popularity has started to drastically increase as many companies are realizing they MUST react in real-time to their customers, decouple their systems and transform into event-driven organizations. However, for event-driven interactions to achieve the same level of adoption as REST, the build-out of tooling for eventing must continue. Now is the time to transform and support all the patterns modern applications need for interaction, i.e. commands, queries… and events!

Solace is committed to helping organizations realize the advantages of being event-driven. We’re active on all these fronts by continuing to advance the state of the art with our PubSub+ event broker and {{%link "https://solace.com/blog/event-mesh/"%}}event mesh{{%/link%}}, enthusiastically supporting {{%link "https://solace.com/blog/unlock-potential-spring-cloud-stream/"%}}Spring Cloud Streams{{%/link%}}, and actively contributing expertise and financial support to [AsyncAPI](https://www.asyncapi.com/). Stay tuned for more information around how event management and API management are similar, how it is a key capability that organizations need, and what Solace is doing about it!
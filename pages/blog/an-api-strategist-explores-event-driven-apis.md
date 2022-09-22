---
title: "An API Strategist Explores Event-Driven APIs"
date: 2019-05-14T16:56:52+01:00
type: Strategy
tags:
  - APIs
  - EDA
  - Interview
cover: /img/posts/an-api-strategist-explores-event-driven-apis.webp
authors:
  - name: Emmelyn Wang
    photo: /img/avatars/ewang.webp
    link: https://twitter.com/lifewingmate
    byline: API Strategy Catalyst
excerpt: If you’re like me and have experience with web services and the paradigm of RESTful, web services, and SOAP APIs, but curious about event-driven, message based, or streaming APIs, this article is for you.
---

# An API Strategist Explores Event-Driven APIs

If you’re like me and have experience with web services and the paradigm of RESTful, web services, and SOAP APIs, but curious about event-driven, message based, or streaming APIs, this article is for you.

I virtually sat down with these experts:

* [Fran Mendez](https://twitter.com/fmvilas), Founder of [AsyncAPI](https://twitter.com/AsyncAPISpec)

* [Jonathan Schabowsky](https://twitter.com/JSchabowsky), Chief Architect, [Solace](https://twitter.com/solacedotcom)

* [David McKenna](https://www.linkedin.com/in/david-mckenna-05726b1), SVP, Research & Development, [Axway](https://twitter.com/Axway)

* [Eric Horesnyi](https://twitter.com/EricHoresnyi), General Manager, APIs & Integration, Axway (CEO of [Streamdata.io acquired by Axway](https://twitter.com/StreamdataIO))

Question 1: **What do you think is the most important value proposition of event-driven architecture and event-driven/messaging APIs?**

Question 2: **What is the consumption experience of messaging APIs and how much does it differ from RESTful APIs?**

For example, at the time of writing can’t just mock up the API and run it in a Postman collection and transform it (convert the technical specification to the version I want such as YAML to RAML or JSON, for example) and consume it.

Try [http://editor.asyncapi.org](http://editor.asyncapi.org/) to understand the sister spec to OpenAPI (OAS).

Question 3: **Today, how can I test drive event-driven APIs out in the wild?**

My frame of reference with REST APIs: I can inspect HTTP calls in a browser and mock up the API. I can run the API calls in API Builder or Stoplight or Postman and get an InVision conceptual app to consume the API, for example. I can use Stoplight to lint or APIMatic to create starter SDKs to test drive.

Question 4: **How do you measure event-driven APIs?**

I was thinking about how you measure the *effects* of event-driven APIs. For example, how can various types of calls live within dashboards for the sake of analytics and measurement? Future Trend: Is there a way to get wholistic data from webhooks, RESTful/JSON, SOAP/WSDL/WADL/XML, GraphQL, gRPC, etc.?
> POV: The future of APIs is the unified catalog having a matching data-driven view. [lifewingmate](https://twitter.com/lifewingmate)

## For the greater API Community

Recommendations are the most important piece of the event-driven architecture value proposition. Business leaders only care about event-driven architecture as much as the end result produces the business-driving experience that specifically this type of architecture can produce.

> Technology and consulting organizations need to know when and how to recommend event-driven architecture, APIs and microservices, and corresponding methods of implementation.
> How they impact my current product engine? What business results justify the spend? — [lifewingmate](https://twitter.com/lifewingmate)

Here we go!

## Question 1: What do you think is the most important value proposition of event-driven architecture?

Fran: I’d say most interesting for me are:

* loose coupling between services (if a downstream service breaks the others just work fine),

* they’re fault-tolerant since events are queued or stored somewhere, and processed once the service is up and running again, and

* they allow you to build real-time products easily.

Jonathan: 1) **Loose Coupling**— As Fran states, apps do not have to know how many different apps they are consuming data from. Rather they just care about what data they are consuming. This [scenario] is extremely powerful.

Also, data today is RARELY consumed only once, rather, it goes into big data and analytics platforms. The loose coupling described allows you to have this for free.

2) **Reactive to Change** — Instead of polling, consumers can register their their interest (subscribe) and react to changes in real-time. The producer just sends events, and does not care if anyone is interested… fire and forget… Meanwhile clients that are subscribed get the data in realtime and can react. This is useful where you want to service customers in real-time.

3) **Scale**— Want to be able to consume events, in order, across millions of devices? How about do 500k messages per second guaranteed of capital market trades?

> Asynchronous interactions enable enterprises to do things which are nearly impossible to do synchronously.
> — [JSchabowsky](https://twitter.com/JSchabowsky)

David, Eric: Event-driven architecture brings comfort to end users and efficiency to the web at individual component level and at system level:

* UX in Frontends

* Network

* APIs

* Backends

* Behind the API: Application languages, data plane, and DevOps

* Entire System

**UX in Frontends** The [most popular](https://hackr.io/blog/10-best-javascript-frameworks-2019) reactive frameworks (AngularJS, ReactJS, VueJS) react to streams of events presented to their [observables](https://streamdata.io/blog/realtime-event-driven-app-with-riot-xignite-and-streamdata-io/), a data plane presenting events to the UI.

Why is that? Because, we -mobile and desktop human users- want to be presented data in real-time:

* Where is my cab? 
What is the price of my favorite share, now?

* At what time will my train arrive at destination ?

Yes, our life is real-time: we do not want to waste any time and we do not want to miss anything that happens in the world ([FOMO](https://en.wikipedia.org/wiki/Fear_of_missing_out) — Fear Of Missing Out).

Good news: Events improve latency of the UI by factor x20 according to our [benchmark](https://streamdata.io/blog/ui-latency-json-patch/), and avoids for users to have to refresh their UI to get the latest from their newsfeed, stocks or favorite transportation, as our [reptilian brain](https://streamdata.io/blog/animated-data/) is naturally used to [understanding].

**Network** Since 2011, with the advent of social networks and to support reactive UI, the web has RFCed protocols for low-volume bidirectional/peer-to-peer traffic (**Websockets**) and server to client push over HTTP ([SSE](https://streamdata.io/blog/push-sse-vs-websockets/)). For lower volume of events, typically for alerts, **webhooks** have become popular.

**APIs** Most API calls are useless: up to 98.5% according to [Zapier](https://news.ycombinator.com/item?id=6360474) who created the concept of Polling Madness. That is because the API client does not know when data will change, so would keep polling an API to make sure it does not miss any update. Event-Driven Architecture in APIs reverses the paradigm: why don’t we have the component who know when data change to take charge, instead of answering to useless calls?

This [situation] leads to the API server pushing streams of events to the API client who have subscribed to a topic. Traffic hence goes north-south only when necessary, rather than south-north-south to hit updates randomly. Augmenting a REST API with a streaming API typically brings [90% efficiency](https://streamdata.io/blog/benchmark-server-sent-events-versus-polling/) in CPU and network use for most demanding traffic.

**Backends** In some industries, backends have been using evented architecture for a while.

**Behind the API: Application Languages, data plane, and DevOps** 
Backend architectures have relied on events for a while, before REST was created. In my Flashboy days in [High Frequency Trading](https://www.infoq.com/podcasts/eric-horesnyi-ai-hft), we were pushing events from exchanges to hedge funds to allow them to stay in front of the market (making big money at low risk, I’m repentant), using IP-based tweaks (IP multicast and their famous storms), and proprietary middleware.

Since then, message buses have evolved to open standards adopted outside finance (thanks Linkedin for **Kafka**), and -as already noted- the web has made it possible to transport events over HTTP. Additionally, and almost at the same time, people -like [myself](https://streamdata.io/blog/network-based-architecture-fielding-fowler-and-haussmann/)- having advocated microservices for years without seeing convergence of best practices are now contented: **Kubernetes** is here, and has instantly been adopted by all architects and DevOps to prepare their ideal microservices architecture.

And when you dig into Kubernetes and associated frameworks Istio and Envoy, what do you find? REST APIs of course, but that was expected by definition of microservices. What you also find is Async APIs for each microservice. Kaboom! Backends now have a blueprint for quite a few years: Kafka and Kubernetes to orchestrate data flows, control and scale them. And this blueprint is entirely event-driven.

To top it all and not surprisingly, languages traditionally used to create application layers linked to databases have also gone through their event revolution with reactive extensions such as **RxJava** widely adopted by the Java community. Now the entire backend dev, DevOps, and IT community can focus on what will make them able to compete with agility over the web.

**Entire System** If we take a helicopter view to look at the entire system, what does the event-driven revolution?

The entire chain from data plane, app, API, network down to the frontends are event-driven: Event flow between IoT devices (eg GPS), mobile apps, and ML without any barrier, people can all align thinking in terms of data streams of events rather than databases, considering intensity and relevance of feeds rather than states and calls.

As all components have embraced the EDA revolution (I prefer evolution -revolution is always violent- as this is happening with live clients to be supported at the same time, hence slowly, but based on a Darwinian selection of design). This new **end-to-end chain of events** brings simplicity and efficiency to components individually and collectively.

## Question 2: What is the consumption experience of event-driven APIs? How much does it differ from RESTful APIs?

Fran: You usually connect to a broker to start sending and/or receiving messages. Examples of brokers are RabbitMQ, Kafka, Solace, etc. The difference with synchronous patterns like REST, gRPC, and GraphQL is that you don’t ask for information. You don’t make requests.

Just connect to the broker and subscribe to a channel of your interest. Eventually (no pun intended), you’ll get this information, such as when the events occur. Similarly, you’ll send events to the broker whenever they occur to you. (replace you with your service)

Jonathan: Today, the consumption experience generally sucks! This is a gap in the market AsyncAPI is solving and Solace [and several other companies, organizations, and individuals] is looking to help solve too… help make the experience as pleasant as with RESTful APIs.

David, Eric: There are many different technologies for providing event driven APIs

* Server-Sent Events (SSE) for pushing data to the client to provide reactive user experience

* Webhooks for making HTTP callbacks on state change

* HTML5 Websockets providing full-duplex communication channels over a single TCP connection between client and server.

* MQTT and AMQP for IoT use cases

## Question 3: Today, how can I test drive event-driven APIs out in the wild?

Fran: You can’t or is not easy. Part of the reason for the existence of AsyncAPI is precisely to enable that.

Jonathan: Check out [cloud.solace.com](https://cloud.solace.com) … Sign up for an account (free) and play around. Create an event broker (think of that like an API gateway) and look at our runnable code pen examples. This is all more infrastructure based…. Now imagine AsyncAPI and you layer that on top, it becomes more like API management. Also, check out this blog [https://solace.com/blog/api-management-event-management/](https://solace.com/blog/api-management-event-management/)

*(Emmelyn) I can inspect HTTP calls in a browser and mock up the API and run it in Postman and get an InVision conceptual app to consume the API, for example.*
 
You can kind of do this at [cloud.solace.com](https://cloud.solace.com)… Again its more how do you send/receive messages… with no app context, but its a start and the most useful I have ever found.

*(Emmelyn) I can use Stoplight to lint or APIMatic to create starter SDKs to “try it”*

See previous comment and try it out and give me feedback!

David, Eric: Many of the traditional testing tools do not natively support event- driven protocols and are built for standard HTTP request/response found in REST based services. In order to help support the testing of SSE a client SDK is provided to help build automated clients to test both functional and non-functional aspects of SSE services.

## Question 4: How do you measure event-driven APIs?

Fran: You don’t have “calls” because you don’t ask for anything. You just show your interest in certain types of events and wait for them to happen. That’s a subscriber/consumer. If you’re building a publisher/producer then you’ll send events to the broker when certain events occur. The consumers interested in your type of event will receive them.

Jonathan: I think effectiveness is a direct correlation between consumption. An event that is consumed 0 times was actually worth 0… an event consumed 100 times is valuable. Yes, you do this via dashboards. Today, nobody deals with BOTH events and synchronous apis in one platform.

David, Eric: The enhanced user experience in the client can be tracked by NPS of the service.

Traditional monitoring tools are optimized for request-response scenario, asynchronous scenarios bring in additional complexity where by a single request could result in N number of responses been relayed to the client. Adoption of OpenTracing can help to see the spans of distributed transactions.

## Value Proposition of Event-Driven Architecture

**Business leaders only care about event-driven architecture as much as the end result produces the business-driving experience that specifically this type of architecture can produce. What would you explain to this type of audience?**

Fran’s take

* Real-time experiences are built with event-driven architectures. You can’t build something real-time with REST APIs or any of the aforementioned styles.

* Solace has an interesting concept called “event mesh” and [Jonathan](http://twitter.com/Jonathan) Schabowsky can explain better and point to existing documentation.

* And then you have the cool thing about event-driven microservices, which allows you to build products faster. It allows you to spend less time worrying about the systems and more about your business logic.

Eric’s take

As a CEO myself, I do not invest in any feature of any technology until I can see proven track records and numbers. Well, EDA actually brings sizeable benefits in terms of topline, customer satisfaction, cost base, competitive differentiation and even HR attractiveness and retention:

* Topline

* Customer Satisfaction

* Outsmart your Competitors with Machine Learning ML

* IT Cost Base Reduction

* HR

**Topline** The main benefits of the EDA mindset is to optimize the time it takes between the occurrence of an event in the universe, and the reaction by the company to that event. Each industry has its own metrics for assessing such benefit. In capital markets, 1 millisecond is worth **[$8m](https://research.tabbgroup.com/report/v06-007-value-millisecond-finding-optimal-speed-trading-infrastructure)** (!)

In marketplace/ecommerce/retail/logistics business where players make as much money as they can reduce the time between an order is placed to them, and such order is shipped to the end user, each second count. I did a quick calculation of how much a second is worth for Amazon, by dividing revenue by the number of seconds in a year: **$50m** (!)

**Customer Satisfaction** As already noted, reactive interfaces are not only the coolest but also the most natural for our human brain. Well, we can put a number on this: [100 ms is worth 1%](https://perspectives.mvdirona.com/2009/10/the-cost-of-latency/) additional revenue on any mobile or desktop app, from mobile banking to eCommerce.

For developers using your API, when you can provide your most important customer the ability to consume your API without limit, they are happy to pay a premium for it as it means they have more data to make decision upon, and it helps streamlining their data ingestion chain.

**Outsmart your Competitors with ML** A major way for technology to bring value to customer interactions (chatbots), optimize processes and make best-possible decisions in an ever-changing world is Machine Learning. And Machine Learning thrives on data. In the past, data architectures were based on tables and data lakes. Well, for practitioners, data lakes actually became data swamps.

With some experience, the key is to master data ingestion so that data sources are consumed upstream, as close as possible to the source, and turned into value as soon as possible by Machine Learning. Machine Learning consumes streams of data conveyed by Kafka from third party streaming APIs, such as [Xignite Cloudstreaming](https://www.xignite.com/product/CloudStreaming), learn from them as they come and learns from its errors against what it had predicted.

And the closer you are from data sources (acting as senses for the ML brain), the smarter your ML brain will be, faster than your competition. There is even a family of ML updating their model for each, called [Massive Online Analysis](https://moa.cms.waikato.ac.nz/) or Streaming Algorithms. EDA has even invaded ML.

**IT Cost Base Reduction** With the 90%+ gains in efficiency that we have mentioned earlier, an API vendor servicing clients with events can not only make them happier, but also reduce its cloud bill on CPU and network by 90% on these use cases. As cloud bills have become so high and critical to become visible to executive desks, they should understand the impact.

**HR** I believe we would agree that developers and DevOps like new and efficient [tools]. And events are fun while bringing efficiency. Working with events makes your organization more attractive to new developers, and help keeping them happy while working on cutting-edge technology. As developers cannot meet the demand while “software is eating the world” this [circumstance] alone could be a driver for considering and EDA and API and Microservices first approach in your organization.

## Question: How and when should companies actively choose event-driven architecture?

*For example, how is discovery performed? Which APIM catalogs can showcase event-driven APIs so that companies can decide to consume rather than build it themselves? What kind of guidance and best practices can we provide?*

David and Eric advise

**IoT** — Many companies are looking to leverage IoT in their offering such as car insurance (pay as you drive), healthcare (health monitoring).

A vast variety of low-price devices (sensors, thermostats, robots, etc.) with internet connectivity is flooding the market. Their value does not lie in the hardware but in the services that are/will be attached to it. The infrastructure that support these services must have a real-time processing capability to provide real value back to the consumer.

**MQTT** is becoming the de-facto standard to exchange data with IoT devices because it is simple and efficient on low memory devices. It is also based on a Publish/Subscribe model that will force the companies to adopt an EDA in order to process all the generated events.

**Cloud** — Adaption of cloud-based services in Enterprise adds more integration patterns (Cloud-to-cloud, Cloud-to-ground, Ground-to-Cloud, ..) thus more complexity. The different systems needs to exchange data to keep a coherent state across the applications. Using a point-to-point integration strategy can quickly become a trap because of the exponential complexity and tight coupling between the different systems.

EDA enables a loose coupling between the components/apps in order regain agility, increases innovation pace and reduces time-to-market for new features/services.
> # In general, I’m studying API Design Patterns and how various kinds of APIs expedite R&D adoption. What business results are accelerated from these kinds of patterns?
> Thanks for suggesting topics and connecting with feedback. You can also reach me via Twitter @lifewingmate DM or via the AsyncAPI community via our [GitHub](https://github.com/asyncapi) or [Slack channel](http://asyncapi.slack.com).

Disclaimer: The professional opinions of those interviewed do not necessarily reflect the organizations they represent. These interviewees volunteered their time and contributions to support the AsyncAPI initiative and community.

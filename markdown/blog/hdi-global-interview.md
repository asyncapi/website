---
title: "Interview with Manuel Ottlik, Product Owner at HDI Global SE: Leveraging AsyncAPI for Integration Transparency!"
date: 2025-01-20T06:00:00+01:00
type: Communication
tags:
  - Interview
  - Case Study
  - Community
cover: /img/posts/marketing-images/hdi-interview.webp
authors:
  - name: Atinuke Oluwabamikemi Kayode
    photo: /img/avatars/bami.webp
    link: https://www.linkedin.com/in/atinuke-oluwabamikemi-kayode-5b838b1b7/
    byline: AsyncAPI Community Marketing Specialist
excerpt: 'Learn how HDI Global SE, our first end-user and silver sponsor, leverages AsyncAPI for integration transparency. Manuel Ottlik shares insights on merging enterprise service buses with modern API management and event-driven architectures.'
---


HDI Global SE, a leading player in the insurance industry, has become our first end-user, a non-software vendor company that not only openly admits it uses AsyncAPI and shares its use case, but also became an official sponsor and a valuable partner of the AsyncAPI Initiative.
Their commitment to open source is evident through financial support, active contributions, and adoption of AsyncAPI to enhance transparency in their integration platform. We are ecstatic to have [Manuel Ottlik](https://www.linkedin.com/in/manuelottlik/), Product Owner of the Global Integration Platform at HDI Global SE, as one of our dedicated AsyncAPI ambassadors. Manuel has played a key role in driving the adoption of AsyncAPI at HDI, transforming our partnership into a meaningful use case.

We recently had the opportunity to speak with Manuel, who shared insights into HDI's evolving integration strategies, the role of open source in their journey, and how AsyncAPI fits into their future plans. Here’s a glimpse of our conversation:


## About the Company and Your Role
We began by exploring how HDI Global SE, with its long history in the insurance industry, has evolved its approach to integration and API management.

**Bami: HDI Global SE has a strong background in the insurance industry. How has the company’s approach to integration and API management evolved over the years?**

***Manuel:** When we were discussing the integration layer, it's not just the insurance industry but most enterprises, particularly in financial services, that initially relied on enterprise service buses. Over time, many of them, including HDI, introduced API management to leverage REST APIs. We did the same here—implementing API management alongside our enterprise service bus. Now, we're focusing our development efforts exclusively on API management.*

*However, we realized that to fully phase out the enterprise service bus, we’d need both synchronous and asynchronous communication capabilities. This led us to incorporate asynchronous services through an event broker, ensuring comprehensive integration support.*


## Key Challenges in Merging Technologies

We delved deeper into the complexities of integrating various technologies.

**Bami: As Product Owner of the Global Integration Platform, what key challenges have you faced in merging technologies like a service bus, API management, and an event broker into a unified platform?**

***Manuel:** One of the key challenges is that these technologies are often introduced at different times. For example, most companies start with API management and later realize the need for asynchronous capabilities. As a result, you end up with distinct interfaces for asynchronous and synchronous communication, even though they represent the same business entities.*

*The challenge is merging these technologies and their interfaces cohesively. At HDI, we manage the platform, not the interfaces, but we issue guidance on building interfaces. We aim to have a consistent view of business objects, regardless of the integration product being used. The schemas of these business objects should align, whether they’re using OpenAPI or AsyncAPI.*

## Goals for HDI Global SE’s Integration Platform

**Bami: What are the main goals HDI Global SE hopes to achieve with its integration platform, especially regarding cloud adoption?**


***Manuel:** Our primary goal isn’t tied to cloud adoption, but rather to achieving transparency for the interfaces created. We want a central point of observability, ensuring that security and architecture are aligned. It’s about reducing complexity and establishing standards.*

## Open Source at HDI Global SE

We shifted focus to the role of open source in HDI’s strategy.

**Bami: Open source has transformed many industries. How has it impacted HDI Global SE’s approach to software development and integration?**

***Manuel:** One major benefit of open source over the past decade has been the standards that come with it, providing vendor independence when those standards are adhered to. We rely heavily on open source, including AsyncAPI, and many projects from the Cloud Native Computing Foundation (CNCF), which has been particularly influential.*

## HDI’s Contributions to Open Source

**Bami: How does HDI Global SE contribute to the open-source community, and what benefits has the company seen from these contributions?**

***Manuel:** We contribute in various ways. I participate in the CNCF Serverless Working Group that is building CloudEvents and xRegistry, attend meetings, and we have created a case study for AsyncAPI. We’ve also sponsored your project and actively participate in open source projects through code contributions when needed.*


## HDI Global SE’s Interest in AsyncAPI

We then discussed HDI’s interest in AsyncAPI.

**Bami: What sparked HDI Global SE’s interest in AsyncAPI?**

***Manuel:** Our interest in AsyncAPI stems from our goal of transparency. We maintain an API catalog for synchronous and asynchronous communication, with OpenAPI covering the former. AsyncAPI fills the gap for the asynchronous world, providing the same transparency for service-based topics and messages.*

**Bami: How do you see AsyncAPI playing a role in HDI Global SE’s integration strategy, especially as the company continues its cloud adoption?**


***Manuel:** It's the same reason; it will be the part that enables transparency over asynchronous interfaces, service bus topics and messages in them, event brokers and events that are transmitted through these channels.*

Wrapping up, we explored Manuel’s thoughts on broader industry trends.

**Bami: What emerging trends in API management and cloud integration are you most excited about?**

***Manuel:** Asynchronous communication is still developing but will eventually be on par with synchronous communication in enterprise integration. I’m particularly excited about xRegistry, which will bridge the gap between synchronous and asynchronous communication by providing a standard for schema registries that can then host all business objects and their schemas, as well as the interface descriptions that are built upon those schemas.*


Through our conversation, it’s clear that HDI Global SE is not only adopting AsyncAPI but also actively contributing to its development. Manuel has been a driving force behind this partnership, and we’re excited to continue building towards a future of open, transparent, and efficient integration practices.


We’re thrilled to welcome HDI Global SE as not only a Silver Sponsor but also our first end-user! :tada: We’re excited about this collaboration and the shared journey to advance the AsyncAPI ecosystem together.

[Read more about HDI Global SE's AsyncAPI implementation case study]( https://www.asyncapi.com/casestudies/hdiglobal)

Have questions about [HDI Global SE's](https://www.hdi.global/de-de/) journey with AsyncAPI or want to share your own experience? Join our vibrant community on [Slack](https://www.asyncapi.com/slack-invite) and let's continue the conversation!


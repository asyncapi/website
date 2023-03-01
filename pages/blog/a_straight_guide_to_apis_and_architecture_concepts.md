---
title: "A straight guide to APIs and architecture concepts"
subtitle: From a newcomer experience
date: 2023-01-19T06:00:00+01:00
type: Communication
tags:
  - APIs
  - Architectures
cover: /img/posts/a_straight_guide_to_apis_and_architecture_concepts/cover.webp
authors:
  - name: Barbaño González
    photo: /img/avatars/barbano.webp
    link: https://www.linkedin.com/in/barbano-gonzalez-moreno
excerpt: Basic concepts about APIs and architectures for beginners and non-developers.
featured: true
---

It has not been such a long journey into the technology realm for me. Then I started to work at AsyncAPI, and suddenly, I needed to understand a complex world. New terms, code, and ways of seeing things were waiting for me. Coming from other fields of knowledge, the challenge was huge. How to begin? How to have a clue?

I decided to start with the basics: trying to find a way to catch the meaning of some key ideas related to APIs. I read and reread over and over again definitions and more definitions. They were full of technical terms that distanced me from them rather than bringing me closer to understanding the concepts. I found myself diving into a deep and dark ocean. And I was too squared to flow in those turbulent currents. The alphabetical order is not a natural one. A dictionary is not a good tool for starting to know a language.
 
Then, I decided to change direction, looking for data. I thought that checking some visual and intelligible sources might clarify my head. So I could understand where to put the information, helping me start weaving a tapestry. Nevertheless, not knowing the code made it difficult for me, if not impossible, to interpret rough data. 

Third attempt… I just remembered that someone said that practice makes perfect. So, the next try was in that direction. Playing an instrument is a better way to understand it than reading definitions or pentagrams. See it and touch it; feel the shape directly, the stage, the environment. It was time to take action: a colleague volunteered to guide me, practicing somehow with these concepts without prior knowledge. Just making fun, as a child, looking for references, playing, and understanding the technique while finding similarities and comparisons with real situations that anyone could understand pretty well. 
 
So, let’s talk some basic concepts:
 
## APIS

### What is an API?

APIs are program connectors. Synchronous or asynchronous, they act as glue between different applications or programs. 

<Figure
  src="/img/posts/a_straight_guide_to_apis_and_architecture_concepts/guide-pic._01.webp"
  widthClass="w-1/2"
  float="left"
  altOnly="This image shows a pipeline system"
/>

As cables or pipes connecting different locations to facilitate information exchange or optimize resources.
 
### How does an API work?
 
APIs act as an intercommunicator, linking one or more programs. Let's say they could be seen as a bridge between different places connecting them and transferring the required information through them. It’s a way to exchange data or give commands to each other.
 
### Types of APIs

We can classify them into two main groups, depending on their use or their type of architecture.

#### Types of APIs according to their use
 
- **Internal APIs** are those used at a local level. They focus on communicating with each other within the same system or the same computer. An excellent example of them might be the pipes contained in a house. They connect the sink to the bathroom and the washing machine to the dryer, for example.
 
- **External APIs**, or web APIs, are those used to communicate two or more applications over the Internet. We could exemplify it with the pipes that connect different houses in the same block of apartments or neighborhoods.

- **Partner APIs** are a middle ground between internal and external APIs. This is because they are accessible to people outside the organization but only to those with exclusive permissions. Typically, this special access is granted to certain third parties to facilitate collaboration. 

A good example might be when we invite friends over, and they bring their controllers to play the game console. Or when a friend comes over and connects to our wifi network.

#### According to its architectural style 

It is essential to choose the architecture style or pattern that best fits the desired use case for the API if specific functional capabilities are required. There are several architecture styles for APIs, as well as different data formats. The following are the most common: 

- **REST** (representational transfer state), this architecture style separates the needs of the API user from those of the provider, thanks to commands embedded in the underlying network protocol. For example, Twitter provides a REST API that you can query for the latest tweets.

- **RPCs** (remote procedure calls), are styles that usually demand developers to perform specific code blocks on another system or different systems. RPCs are protocol-independent, making them potentially compatible with many protocols, although they do not include the benefits of using native protocol features. 
 
For example, the Network File System (NFS) plays an essential role in Unix and Linux. This system uses RPC between client and server to mount the set of files from a remote computer on a local computer, that is, to make them partially or entirely available on the latter, allowing the user to manage the files located on a remote device as if they had them on their computer.

- **Event-driven**, real-time, asynchronous, doesn't wait for the API user to make the call before sending a response. The response is issued as soon as an event occurs.  

A simple example might be LinkedIn notifying us that someone wants to connect with us.
 
## Architectures 

Now that we have seen the classification of APIs, let's focus on the most representative types of architecture. 

In my opinion, this is the most interesting part. Understanding different construction models bring us closer to the skeleton of the system. By understanding this part, we can better sustain the concepts of APIs, supporting them on fundamental pillars.

-  **Monolithic architecture**

<Figure
  src="/img/posts/a_straight_guide_to_apis_and_architecture_concepts/guide-pic._02.webp"
  widthClass="w-1/2"
  float="right"
  altOnly="This image shows menhirs"
/>

Monolithic architecture describes a kind of construction made from a single piece of material, historically from a rock, a standing stone. Indivisible. As a menhir, the simplest megalithic monument.

The same goes for the traditional structure of software applications. Monolithic is an end-to-end architecture in which all aspects of the software function as a single unit. 

-  **Microservices architecture**

Microservices architecture is a method for developing software applications that consist of small, autonomous services. Each microservice's code can be written in a different language and perform specific functions. Microservices communicate with each other through APIs and have their own storage systems, which avoid overloading and crashing the application.

<Figure
  src="/img/posts/a_straight_guide_to_apis_and_architecture_concepts/guide-pic._03.webp"
  widthClass="w-1/2"
  float="left"
  altOnly="This image shows a honeycomb with bees"
/>

An example of the use of this kind of architecture could be Netflix. This platform has a generalized microservices architecture. Every day it receives an average of one billion calls to its different services and can adapt to more than 800 types of devices through its video streaming API, which offers a more stable service. For each request we ask, it makes five requests to different servers to never lose the continuity of the transmission.

We can do a simile with the work of bees. Among other things, they extract the nectar from the flowers that each hole in the comb needs, supplying every micro need of the beehive.

- **Serverless architecture**

It is a computing model that uses the cloud as the environment for executing applications and processes, dispensing with traditional servers. In this way, the Serverless architecture facilitates the work of developers. 

<Figure
  src="/img/posts/a_straight_guide_to_apis_and_architecture_concepts/guide-pic._04.webp"
  widthClass="w-1/2"
  float="right"
  altOnly="This image shows a cloud"
/>

They can dispense with tasks such as allocating server resources, and focusing solely on application development. With Serverless, the code runs directly in containers. 
 
Any task requiring executing several functions simultaneously is a good use for serverless technology. These can be applied whenever concurrent computing is required. 

There isn't a better graphic example than a cloud.

-  **Event-driven architecture**

Event-driven architecture, also known as EDA, is a software model and architecture used to design applications. Unlike other architectures, this one is characterized by asynchronous communication, which does not occur simultaneously. 

<Figure
  src="/img/posts/a_straight_guide_to_apis_and_architecture_concepts/guide-pic._05.webp"
  widthClass="w-1/2"
  float="left"
  altOnly="This image shows a message in a bottle"
/>

That is to say, the receiver will attend to the sender's message later after receiving it, so the sender can perform other tasks without waiting for the request to be answered. For example, sending an email that might be received 5, 50 minutes, or 5 hours later just because the server was attending to other deliveries.

This is the kind of architecture that AsyncAPI works with. Its main goal is to make working with EDA as easy as working with REST APIs, from documentation to code generation, from discovery to event management.

A good simile could be to send a message in a bottle. The information takes more or less to reach its destination depending on the currents of the sea.

## So, what is an API, ultimately…

It's funny to notice that we live surrounded by things that sometimes we cannot even name. After all, I have started to know what an API is after noticing that I live and share space with them. There are many events for which this API model works well. A lot of examples to understand it. These are just a few: from online translators, such as Google Translate, to the moment when the temperature of a remote thermometer changes.

Every concept, even the hardest to get, might always be communicated to everyone, not minding if we talk to children or people who don’t know anything about it. Just with different layers of meaning. It is always possible to make any parallel to real life, everyday objects, or situations. It doesn’t matter if we talk about kicking a ball or ordering a pizza. Every day we are surrounded by maths, physics, technology, code, and APIs… things that we are not able to see but that make things comprehensible and our life easier, sometimes. There are always codes and structures that give them shape. 

Following the path I walked before, it was my turn to explain the essential concepts of the API world without technicalities, creating simple comparisons that place us in the function of each thing. Just to make us understand the place of each piece in the puzzle. In case my experience is helpful to anyone. That’s the way I get it. And once you get it, it is forever.

_* Cover photo by [Shane Rounce](https://unsplash.com/es/@shanerounce) on Unsplash_;
_* Photo 1 by [Azka Rayhansyah](https://unsplash.com/es/@azka_ryhns) on Unsplash_;
_* Photo 2 by [Eric Muhr](https://unsplash.com/es/@ericmuhr) on Unsplash_;
_* Photo 3 by [Sophie N.](https://unsplash.com/es/@storiesbysoph) on Unsplash_;
_* Photo 4 by [Sendi Gibran](https://unsplash.com/es/s/usuarios/sendi-gibran) on Unsplash_;
_* Photo 5 by [Snapwire](https://www.pexels.com/es-es/@snapwire/) on Pexels_.

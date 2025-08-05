---
title: Google Summer of Code 2021
weight: 150
---

# Status: Completed

## Timeline

- January 19 - Organization applications open
- March 9 - Accepted GSoC Organizations announced
- March 29-April 13 - Students submit their proposals
- May 17 - Accepted students are announced
- May 17-June 7 - Community bonding period with orgs
- June 7-Aug 23 - Students code the summer away
- August 31 - Successful student projects are announced

## Accepted Project Ideas


## 1) AsyncAPI Diff

A library that as the input gets two AsyncAPI documents and shows changes between them. As an output, you get json pointers to sections that are different. The main purpose of such a tool is a changelog where you can present to the user what has changed between v1 and v2 of the document. Some ideas can be picked up from [OpenAPITools](https://github.com/OpenAPITools/openapi-diff)
We basically need a library that can be later used to build such a UI
Use case:
The result of diff is a part of changelog/release notes, so users can easily spot what parts of the document changed so they can understand how affected they are by the change
Diff is needed in a review process, so the reviewer gets an overview of specification changes
Required knowledge:
There is not much knowledge about the spec itself needed. It is about pointing out differences in 2 different files, but not as pointing what lines changed but in general what objects changed. So if there was an update in payload, the library must specify what channel in what message got updated (with json pointers most probably). You can familiarize with other tools that do it already for other specifications.
We already started work on the [CLI](https://github.com/asyncapi/cli) so before summer there will be enough to plug in this functionality 

## 2) AsyncAPI Applications Relations Finder

A library that as the input gets a list of AsyncAPI documents and analyzes them to get information about Applications described by those files:
If they subscribe or publish to the same channels
If one subscribes to a channel that the other one publishes to
If there are apps that are subscribed to channels that no one publishes to
As an output, we should get a format that can be used to generate a diagram of relations between applications with additional metadata information about them (message, schemas).


**Use case**:
Visualization of the architecture and understanding what happens with the system if one of the puzzles is removed.
Later on, we could use this library in AsyncAPI CLI and also the AsyncAPI Studio.
Required knowledge:
There is no need to have any experience in event-driven architecture. You do not even need to know AsyncAPI spec too much. It is a pure coding task where you will need to find matching patterns between different documents and return this information. You will have the full support of the mentor on the subject. Mentors will define requirements, etc.
There is no decision yet if this is a library that will have to live in a separate repository or be a part of an existing CLI or UI project.
We already started work on the CLI so before summer there will be enough to plug in this functionality
[asyncapi/cli](https://github.com/asyncapi/cli)

## 3) AsyncAPI Extensions registry

Provide an implementation of the extensions registry for AsyncAPI. This task includes action points:
- improve the shape/definition of the single extension (describe it by JSON Schema) - reference
asyncapi/extensions-catalog
- like for schema registry: implement an extensions registry API
- add support in parser-js -
asyncapi/parser-js  - for validation of extension against provided extension schema


Required knowledge:
The main contribution will go into the parser. So you will have to first onboard on the project with few basic tasks handed over by the mentor. The rest will be explained by the mentor. 

## 4) Chatbot for AsyncAPI creators

Explore how we could help people to write the spec document without knowing the specification. Prepare a kind of prototype. Instead of learning the spec, users talk to a chatbot, and as a result of the conversation, they get an AsyncAPI document generated. The chatbot should learn from the specification what are the possible solutions and options.
Use case:
Learning the [AsyncAPI](https://github.com/asyncapi/asyncapi/blob/master/versions/2.0.0/asyncapi.md) spec can be a time-consuming process. This is what causes learning of every new specification hard. Let’s explore if we can have a machine that can consume the spec, its JSON schema and serve the users as an expert. Based on a set of questions and answers it should generate an AsyncAPI document for the user.
Example conversation: (real-time we show a preview of the AsyncAPI document that will be generated)
Bot: what do you want to describe?
User: app that connects with kafka?
Bot: can you provide some more details about the kafka server? Like the url?
User: no
Bot: no problem, let us skip the server details for now. What topics does your app subscribe to?

Visible challenges:
Vocabulary: bot needs to know that AsyncAPI channels mean topic in Kafka
Real-time object generation
Vocabulary: understand that bot needs to ask questions “subscribe to” but in document write it as “publish” operation
 
Required knowledge:
This project requires you to have a basic knowledge about the location of spec related materials that could be used to feed the bot. This is a research task that only requires a prototype to see if this is even possible or what is missing to make it possible. As prerequisite you of course need to read about current technologies that are available for building a chatbot

## 5) AsyncAPI application simulation

A simulation library that can trigger events in your applications based on AsyncAPI definition(s). The main purpose is to stimulate your application(s) in a development environment (staging?). Use it for stress testing, hunting down concurrency problems, stimulating visual applications, finding scalability issues in your application and more.
You provide one or more AsyncAPI files
You decide which channel(s) and applications should be stimulated and with which parameters.
The library simulates messages to the application(s) based on the parameters, in the given protocol described in the AsyncAPI file. 
Inspect the application(s) and their state to figure out if errors occurred etc
 
Extra thoughts: 
Can it be used directly in a system test so you can decide on the expected outcome?
Required knowledge:
You need to learn the spec basics (what channels are). It will be useful to learn first how to set up environments with Docker compose and mocks and a proper testing environment will have to be created first to work on the implementation and load generation.


---
title: How to validate Messages/Events in runtime
description: In this tutorial, you'll learn how to validate messages/events in AsyncAPI in runtime.
---

# Introduction

In this tutorial, you will learn how to validate the messages in your AsyncAPI document after creating your application in runtime.
You will create an application using Node.js.
- Your application will connect to the message broker and receive a stream of events/ messages.
- Message validator will check the message name, payload, channel and operation (publish/subscribe)
- Message validator reads the AsyncAPI document if it is valid or not and returns an error if it is invalid.
You will learn about application run time, messages and creating an AsyncAPI file to describe your API and generate code from it.


# Background Context

Runtime is the phase of the program lifecycle that executes and keeps a program running; other phases include edit time, compile time, link time, distribution time, installation time, and load time. Developers can manipulate and send instructions to a program while testing their program in a runtime. 
A [message](https://www.asyncapi.com/docs/reference/specification/v2.4.0#definitionsMessage) is the mechanism by which information is exchanged via a channel between servers and applications. A message MUST contain a payload and MAY also contain headers. 

# Installation Guide

You'll use Node.js to code the API. The selected technology is irrelevant here, since everything explained in this tutorial is applicable to any other programming language and message brokers.

Before you proceed to the next stage, you'll need to download a few things:

1. Install [Node.js](https://nodejs.org/en/download/) (v15 or newer).

2. Install Git based on your Operating System:
    - [Install Git on MacOs](https://git-scm.com/download/mac)
    - [Install Git on Windows](https://git-scm.com/download/win)
    - [Install Git on Linux](https://git-scm.com/download/linux)

# # Generating code

In this step, we will generate your code, you'll use the [AsyncAPI Generator](https://github.com/asyncapi/generator) Node.js template.

# Summary
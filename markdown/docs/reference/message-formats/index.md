---
title: 'Overview' 
weight: 10
---

## What's a message format?

Message formats are broadly used formats, mostly [envelopes](https://www.enterpriseintegrationpatterns.com/patterns/messaging/EnvelopeWrapper.html) to send standardized messages through a channel.

## Usage in an AsyncAPI document

AsyncAPI allows adding message formats and other extensions to an AsyncAPI by including a trait for headers or referring to an include (`$ref`) for envelopes.

## Adding additional message formats to the catalog

If you'd like to add your message format to the catalog of message formats, please submit the docs [here](https://github.com/asyncapi/website/tree/master/markdown/docs/reference/message-formats).
If an AsyncAPI specific trait is needed, a pull request to the [Components Catalog](https://github.com/asyncapi/spec/tree/master/components) can be made to include it.

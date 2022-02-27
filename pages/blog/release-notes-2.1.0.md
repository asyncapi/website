---
title: AsyncAPI Spec 2.1.0 Release Notes
date: 2021-06-29T06:00:00+01:00
type: Communication
tags:
  - Release Notes
  - Specification
cover: /img/posts/release-notes-2.1.0/cover.webp
authors:
  - name: Lukasz Gornicki
    photo: /img/avatars/lpgornicki.webp
    link: https://twitter.com/derberq
    byline: AsyncAPI Maintainer and Community Guardian
excerpt: 'The eagle has landed! Check out all the changes the AsyncAPI specification introduces in the new v2.1.0 release'
---

The last AsyncAPI release (2.0.0) took place on the 11th of September, 2019. In 2020 the focus went into growing community and adoption and stabilization of basic tooling for specification. This year was a year of "formalizm" 😃 aka getting into the foundation, setting up governance model and contribution guide to enable work on next spec release. We are good to go forward. The 2.1.0 release is out in the wild 🎉

## Message examples object extended with additional fields

Thanks to work done by [Laurent Broudoux](https://github.com/lbroudoux), you can now clearly describe message examples. New properties **name** and **summary** are optional. These properties help not only to properly describe the example in documentation but make it easier to work with mocking and testing tools (like [microcks](https://microcks.io/)), so you can better identify what example to use for mocking and what it does.

Example of new properties added to existing [WebSocket example for Gemini API](https://github.com/asyncapi/spec/blob/v2.1.0/examples/websocket-gemini.yml):

<CodeBlock highlightedLines={[10,11,25,26]}>
{`components:
  messages:
    marketData:
      summary: Message with marked data information.
      description: |
        The initial response message will show the existing state of the order book. Subsequent messages will show all executed trades, as well as all other changes to the order book from orders placed or canceled.
      payload:
        $ref: '#/components/schemas/market'
      examples:
        - name: updateMessage
          summary: Example of an update message that contains a change in price information.
          payload:
            type: update
            eventId: 36902233362
            timestamp: 1619769673
            timestampms: 1619769673527
            socket_sequence: 661
            events:
              - type: change
                side: bid
                price: '54350.40'
                remaining: '0.002'
                delta: '0.002'
                reason: place
        - name: heartbeatMessage
          summary: Example of additional heartbeat message when you enable them. 
          payload:
            type: heartbeat
            socket_sequence: 1656`}
</CodeBlock>

Rendering of new example properties in React component and HTML template:

<Figure
  src="/img/posts/release-notes-2.1.0/ui.webp"
/>

For more details, check out [this pull request](https://github.com/asyncapi/spec/pull/534).

## New protocol bindings

The specification is now extended to support the following custom protocols through the bindings feature:
- **Mercure**, thanks to [Kévin Dunglas](https://github.com/dunglas). At the moment, no specific bindings are necessary for this protocol. For more details, check out [this pull request](https://github.com/asyncapi/spec/pull/278) and [binding definition](https://github.com/asyncapi/bindings/tree/master/mercure).
- **IBM MQ**, thanks to [Dale Lane](https://github.com/dalelane) and [Richard Coppen](https://github.com/rcoppen). For more details check out [this pull request](https://github.com/asyncapi/spec/pull/537) and [binding definition](https://github.com/asyncapi/bindings/tree/master/ibmmq).

## Custom schema formats mandatory vs recommended

Support for Avro and OpenAPI schemas changed from mandatory to recommended through contribution from [Fran Mendez](https://github.com/fmvilas). For more details, check out [this pull request](https://github.com/asyncapi/spec/pull/289)

## New security schemes

Thanks to [Dale Lane](https://github.com/dalelane), you can now describe secured Kafka clusters with SASL security schemes (**scramSha256**, **scramSha512**, **gssapi**). For more details, check out [this pull request](https://github.com/asyncapi/spec/pull/502).

## Old new defaultContentType property in root object

We used and supported **defaultContentType** property to specify the default content type when encoding/decoding a message's payload. [Lucas Block](https://github.com/BlockLucas) spotted that we do not have it defined in the specification. For more details, check out [this pull request](https://github.com/asyncapi/spec/pull/419).

## Tooling support

The following official AsyncAPI tools are already updated to support 2.1.0 version of the specification:
- JSON Schema that supports validation of AsyncAPI documents is updated in [this](https://github.com/asyncapi/asyncapi-node) repository. Also **@asyncapi/specs** package has been updated on NPM to version 2.8.0, and it contains the 2.1.0 JSON Schema.
- [JavaScript Parser](https://github.com/asyncapi/parser-js/) uses latest **@asyncapi/specs** package and can be used to parse and validate 2.1.0 documents. Upgrade to 1.7.0 version.
- [AsyncAPI Generator](https://github.com/asyncapi/generator/) uses the latest **@asyncapi/parser** package, so while generating output, it can validate 2.1.0 documents. Upgrade to 1.8.0 version
- [Generator filters](https://github.com/asyncapi/generator-filters) functions **getPayloadExamples** and **getHeadersExamples** support new message example properties. Upgrade to 2.0.0 version.
- [React component](https://github.com/asyncapi/asyncapi-react/) supports rendering of new message example properties. Upgrade to v1.0.0-next.10 version.
- [Markdown template](https://github.com/asyncapi/markdown-template) supports rendering of new message example properties. Upgrade to 0.14.0 version.
- [HTML template](https://github.com/asyncapi/html-template) uses the latest **@asyncapi/react-component** package. Upgrade to 0.23.0 version.
- [JavaScript Converter](https://github.com/asyncapi/converter-js/) enables conversion from any AsyncAPI version into the 2.1.0 version of the spec. Upgrade to 0.5.0 version.
- [Modelina](https://github.com/asyncapi/modelina) now also accepts AsyncAPI documents valid against the 2.1.0 version of the spec. Upgrade to 0.16.0 version.


Last but not least is the AsyncAPI Playground. Check new playground that uses latest HTML template and Markdown template with [this example](https://playground.asyncapi.io/?url=https://raw.githubusercontent.com/asyncapi/spec/v2.1.0/examples/websocket-gemini.yml).

Big thanks to [Maciej Urbanczyk](https://github.com/magicmatatjahu) and [Jonas Lagoni](https://github.com/jonaslagoni/) for updating most relevant tooling.

This is not all! Not only official AsyncAPI tools are updated. Thanks to [Laurent Broudoux](https://github.com/lbroudoux) also [Microcks](https://microcks.io/) now supports version 2.1.0 and its new example's properties. Upgrade to 1.3.0 version.

## Thank you

I want to send a special thank you to [Aayush Kumar Sahu](https://github.com/aayushmau5), who helped us to automate the part of the release responsible for updating the specification Markdown document on the AsyncAPI website, right after triggering the release, even the release candidate. Thank you :bow:.

> Photo by <a href="https://unsplash.com/@dougswinson?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Doug Swinson</a> on <a href="https://unsplash.com/s/photos/landing-eagle?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
---
title: AsyncAPI Spec 2.1.0 Release Notes
date: 2021-06-25T06:00:00+01:00
type: Communication
tags:
  - specification
  - release
cover: /img/posts/release-notes-2.1.0/cover.webp
authors:
  - name: Lukasz Gornicki
    photo: /img/avatars/lpgornicki.webp
    link: https://twitter.com/derberq
    byline: AsyncAPI Maintainer and Community Guardian
excerpt: 'The eagle has landed! Check out all the changes in the AsyncAPI specification introduces in the new v2.1.0 release'
featured: true
---

The last, 2.0.0 AsyncAPI release took place on 11th of September, 2019. In 2020 the focus went into the direction of growing community and adoption and stabilizing basing tooling supporting specification. This year it was a year of "formalizm" 😃 aka getting into foundation, setting up governance model and contrubition guide to enable work on next spec release. We are good to go forward. The 2.1.0 release is out in the wild 🎉

## Message examples object extended with additional fields

Thanks to support from [Laurent Broudoux](https://github.com/lbroudoux), you can now clearly describe message examples. New properties `name` and `summary` are optional but you should definitely use them. These properties help not only to properly describe the example in documentation. These properties make it easier to work with mocking and testing tools (like [microcks](https://microcks.io/)) so you can better identify what example should be used for mocking and what it does.

For more details check out [this pull request](https://github.com/asyncapi/spec/pull/534).

## New protocol bindings

The specification is now extended to support the following custom protocols through the bindings feature:
- `Mercure`, thanks to [Kévin Dunglas](https://github.com/dunglas). At the moment no specific bindings are necessary for this protocol For more details check out [this pull request](https://github.com/asyncapi/spec/pull/278) and [binding definition](https://github.com/asyncapi/bindings/tree/master/mercure).
- `IBM MQ`, thanks to [Dale Lane](https://github.com/dalelane) and [Richard Coppen](https://github.com/rcoppen). For more details check out [this pull request](https://github.com/asyncapi/spec/pull/537) and [binding definition](https://github.com/asyncapi/bindings/tree/master/ibmmq).

## Custom schema formats mandatory vs recommended

Support for Avro and OpenAPI schemas was changed from mandatory to recommended through contribution from [Fran Mendez](https://github.com/fmvilas). For more details check out [this pull request](https://github.com/asyncapi/spec/pull/289)

## New security schemes

Thanks to [Dale Lane](https://github.com/dalelane) you can now describe secured Kafka clusters with SASL security schemes (`scramSha256`, `scramSha512`, `gssapi`). For more details check out [this pull request](https://github.com/asyncapi/spec/pull/502).

## Old new defaultContentType property in root object

We used and supported `defaultContentType` property to specify default content type to use when encoding/decoding a message's payload. [Lucas Block](https://github.com/BlockLucas) spotted that we do not have it defined in the specification. For more details check out [this pull request](https://github.com/asyncapi/spec/pull/419).

## Tooling support

The following tools are already updated to support 2.1.0 version of the specification:
- JSON Schema that supports validation of AsyncAPI documents is updated in [this](https://github.com/asyncapi/asyncapi-node) repository. Also `@asyncapi/specs` package has been updated on NPM to version 2.8.0 and it contains the 2.1.0 JSON Schema.
- [JavaScript Parser](https://github.com/asyncapi/parser-js/) uses latest `@asyncapi/specs` package and can be used to parse and validate `2.1.0` documents. Upgrade to 1.6.0 version.
- [AsyncAPI Generator](https://github.com/asyncapi/generator/) uses latest `@asyncapi/parser` package so while generating output, it is able to validate `2.1.0` documents. Upgrade to 1.8.0 version

> Photo by <a href="https://unsplash.com/@dougswinson?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Doug Swinson</a> on <a href="https://unsplash.com/s/photos/landing-eagle?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

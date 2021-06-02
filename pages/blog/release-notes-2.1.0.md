---
title: AsyncAPI Spec 2.1.0 Release Notes
date: 2021-06-30T06:00:00+01:00
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

(TODO: not yet approved and merged) ## Examples object extended with additional fields

## New protocol bindings

The specification is now extended to support the following custom protocols through the bindings feature:
- `Mercure`, thanks to [Kévin Dunglas](https://github.com/dunglas). At the moment no specific bindings are necessary for this protocol For more details check out [this pull request](https://github.com/asyncapi/spec/pull/278) and [binding definition](https://github.com/asyncapi/bindings/tree/master/mercure).
- (TODO: not yet approved and merged)`IBM MQ`, thanks to [Dale Lane](https://github.com/dalelane) and [Richard Coppen](https://github.com/rcoppen). For more details check out [this pull request](https://github.com/asyncapi/spec/pull/537) and [binding definition](https://github.com/asyncapi/bindings/tree/master/ibmmq).
Add ibmmq once merged
- (TODO: not yet approved and merged) `AnypointMQ` 

## Custom schema formats mandatory vs recommended

Support for Avro and OpenAPI schemas was changed from mandatory to recommended through contribution from [Fran Mendez](https://github.com/fmvilas). For more details check out [this pull request](https://github.com/asyncapi/spec/pull/289)

## New security schemes

Thanks to [Dale Lane](https://github.com/dalelane) you can now describe secured Kafka clusters with SASL security schemes (`scramSha256`, `scramSha512`, `gssapi`). For more details check out [this pull request](https://github.com/asyncapi/spec/pull/502).

## Old new defaultContentType property in root object

We used and supported `defaultContentType` property to specify default content type to use when encoding/decoding a message's payload. [Lucas Block](https://github.com/BlockLucas) spotted that we do not have it defined in the specification. For more details check out [this pull request](https://github.com/asyncapi/spec/pull/419).

> Photo by <a href="https://unsplash.com/@dougswinson?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Doug Swinson</a> on <a href="https://unsplash.com/s/photos/landing-eagle?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

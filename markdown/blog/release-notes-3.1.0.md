---
title: AsyncAPI Spec 3.1.0 Release Notes
date: 2026-01-31T19:00:00+01:00
type: Communication
tags:
  - Specification
  - Release Notes
cover: /img/posts/release-notes-3.1.0/cover.webp
authors:
  - name: Lukasz Gornicki
    photo: /img/avatars/lpgornicki.webp
    link: https://www.linkedin.com/in/lukasz-gornicki-a621914/
excerpt: 'AsyncAPI 3.1 is now released with new ROS 2 binding.'
featured: true
---

The new version of the AsyncAPI specification - 3.1.0 - is now available. It looks like we are out of the long break after v3 release.

> This is a minor release, and it doesn't bring any breaking changes. You can switch to it by modifying the following value in your AsyncAPI file `asyncapi: '3.0.0'` into `asyncapi: '3.1.0'` without any issues.


## New protocol bindings

The specification is now extended to support another custom protocol through the bindings feature:

ROS 2 ([official docs](https://docs.ros.org/en/jazzy/)), thanks to [@gramss](https://github.com/gramss) and [@amparosancho](https://github.com/amparosancho).

For more details, check out [ROS 2 binding definition](https://github.com/asyncapi/bindings/tree/master/ros2).

## Tooling support

The following official AsyncAPI tools are already updated to support 3.1.0 version of the specification:
- JSON Schema that supports validation of AsyncAPI documents with ROS 2 binding is updated in [this](https://github.com/asyncapi/spec-json-schemas/releases/tag/v6.11.1) repository. Also **@asyncapi/specs** package has been updated on NPM to version 6.11.1.
- [JavaScript Parser](https://github.com/asyncapi/parser-js/releases/tag/%40asyncapi%2Fparser%403.6.0) uses latest **@asyncapi/specs** package and can be used to parse and validate 3.1.0 documents. Upgrade to latest version.
- [JavaScript Converter](https://github.com/asyncapi/converter-js/releases/tag/v1.7.0) uses latest **@asyncapi/parser** package and can be used to convert to 3.1.0 documents. Upgrade to latest version. This conversion is just the version change in `asyncapi` field.
- [AsyncAPI Studio](https://github.com/asyncapi/studio) is also updated so just go to https://studio.asyncapi.com/ and see you can already write 3.1.0 documents.

## Thank you

Huge thanks to contributors of new addition to the spec: [Amparo Sancho Arellano](https://github.com/amparosancho) and [Florian Gramß](https://github.com/gramss).

Huge thanks to specification maintainers that supported the process: [Fran Méndez](https://github.com/fmvilas), [Dale Lane](https://github.com/dalelane), [Vladimír Gorej](https://github.com/char0n) and [Lukasz Gornicki](https://github.com/derberg).

Huge thanks to maintainers that helped with smooth updates of core tooling: [Maciej Urbańczyk](https://github.com/magicmatatjahu), [Ashish Padhy](https://github.com/Shurtu-gal), [Pavel Bodiachevskii](https://github.com/Pakisan), [Fran Méndez](https://github.com/fmvilas).

And I ([Lukasz Gornicki](https://github.com/derberg)) was your release coordinator and I just gave myself a round of applause.

## Look ahead

We are now regularly meeting to work on the AsyncAPI specification, and anyone is invited to join. Meetings are coordinated through [this GitHub issue](https://github.com/asyncapi/spec/issues/1131).

Next topics on agenda:
- [Documenting channels with late or out-of-sequence events](https://github.com/asyncapi/spec/issues/1143):
    For folks with experience in streaming, frameworks like Apache Flink or Apache Spark, please look into this proposal to add the possibility of specifying expected event delivery latency to AsyncAPI contracts.
- [Support AND logic for multiple security schemes](https://github.com/asyncapi/spec/issues/1129): Currently, AsyncAPI allows you to specify a list of security mechanisms where only one must be satisfied. The idea is to also allow users to specify that multiple mechanisms must be satisfied.
- [Discriminator support to be aligned with OAS3](https://github.com/asyncapi/spec/issues/1073): Right now, the discriminator field in AsyncAPI is just a string, which is too limited. People end up using it in combination with const as a workaround. We should consider aligning with the OpenAPI Discriminator Object, but we also need to address the fact that discriminator is and would be limited to AsyncAPI Schema. We need a solution that works for people using other schema formats, like for example Avro or Protobuf as well.

> Photo by <a href="https://unsplash.com/@88pae?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Chinapat Saegang</a> on <a href="https://unsplash.com/photos/a-black-and-white-photo-of-a-large-city-gZJT5_k4LYY?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

---
title: AsyncAPI Spec 2.4.0 Release Notes
date: 2022-04-25T19:00:00+01:00
type: Communication
tags:
  - Specification
  - Release Notes
cover: /img/posts/release-notes-2.4.0/cover.webp
authors:
  - name: Sergio Moya
    photo: /img/avatars/smoya.webp
    link: https://twitter.com/smoyac
    byline: Pilot at AsyncAPI Airlines
excerpt: 'AsyncAPI 2.4 is now released. This brings ... TBD ...'
featured: true
---

The new version of the AsyncAPI specification - 2.4.0 - is now available.

> This is a minor release, and it doesn't bring any breaking changes. You can switch to it by modifying the following value in your AsyncAPI file `asyncapi: '2.3.0'` into `asyncapi: '2.4.0'`


## Server Variable Object within the Component Object

TBD


## Tooling support

The following official AsyncAPI tools are already updated to support 2.4.0 version of the specification:
- JSON Schema that supports validation of AsyncAPI documents is updated in [this](https://github.com/asyncapi/spec-json-schemas) repository. Also **@asyncapi/specs** package has been updated on NPM to version <TBD>, and it contains the 2.4.0 JSON Schema.
- [JavaScript Parser](https://github.com/asyncapi/parser-js/) uses latest **@asyncapi/specs** package and can be used to parse and validate 2.4.0 documents. Upgrade to <TBD> version.
- [HTML template](https://github.com/asyncapi/html-template) uses the latest **@asyncapi/react-component** package. Upgrade to <TBD> version.
- [JavaScript Converter](https://github.com/asyncapi/converter-js/) enables conversion from any AsyncAPI version into the 2.4.0 version of the spec. Upgrade to <TBD> version.
- [Modelina](https://github.com/asyncapi/modelina/) now also accepts AsyncAPI documents valid against the 2.4.0 version of the spec. Upgrade to <TBD> version.
 - [Generator](https://github.com/asyncapi/generator/) uses the latest @asyncapi/parser package, so while generating output, it can validate 2.4.0 documents. Upgrade to <TBD> version.
Last but not least is the AsyncAPI Studio. Check new studio with [this example](https://studio.asyncapi.com/?url=https://raw.githubusercontent.com/asyncapi/spec/v2.4.0/examples/websocket-gemini.yml).


## Look ahead

We aim to have a regular cadence of releases of the AsyncAPI specification, four times a year. For more information about when to expect future releases, you can see our [release process document](https://github.com/asyncapi/spec/blob/master/RELEASE_PROCESS.md#release-cadence).

We're also working on the next major release of the AsyncAPI specification: 3.0.0. If you'd like to contribute, or just follow the discussions, you can see the [milestone on Github](https://github.com/asyncapi/spec/milestone/18).


> Photo by <a href="https://unsplash.com/@andurache?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Alexandru Tudorache</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

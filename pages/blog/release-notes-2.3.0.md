---
title: AsyncAPI Spec 2.3.0 Release Notes
date: 2022-02-01T19:00:00+01:00
type: Communication
tags:
  - Specification
  - Release Notes
cover: /img/posts/release-notes-2.3.0/cover.webp
authors:
  - name: Dale Lane
    photo: /img/avatars/dalelane.webp
    link: https://twitter.com/dalelane
excerpt: 'AsyncAPI 2.3 is now released. This brings enhancements allowing new ways of structuring AsyncAPI documents and support for describing Solace APIs.'
---

The new version of the AsyncAPI specification - 2.3.0 - is now available.

> This is a minor release, and it doesn't bring any breaking changes. You can switch to it by modifying the following value in your AsyncAPI file `asyncapi: '2.2.0'` into `asyncapi: '2.3.0'`


## Servers and channels can now be defined as reusable components

To allow for more flexibility in how AsyncAPI documents are structured and enable content to be reused, `servers` and `channels` can now be defined as reusable components.

For example:

```yaml
asyncapi: 2.3.0
servers:
  production:
    $ref: '#/components/servers/myserver'
channels:
  some/events:
    $ref: '#/components/channels/myChannel'
components:
  servers:
    myserver:
      url: "http://localhost:5000/ws"
      protocol: ws
  channels:
    myChannel:
      description: "mychannel"
```

These are added to the many other aspects of the AsyncAPI specification which can be declared as reusable components. You can see the full list in the [Components Object section of the AsyncAPI specification](https://www.asyncapi.com/docs/specifications/v2.3.0#componentsObject).

This new feature was contributed by [Sergio Moya](https://www.linkedin.com/in/smoya). For more detail, see this [pull request](https://github.com/asyncapi/spec/pull/665) and the [GitHub issue where this change was discussed](https://github.com/asyncapi/spec/issues/660).


## New protocol bindings

The specification is now extended to support another custom protocol through the bindings feature:

Solace, thanks to [Michael Davis](https://github.com/damaru-inc).
For more details, check out this [pull request](https://github.com/asyncapi/spec/pull/666) and [binding definition](https://github.com/asyncapi/bindings/tree/master/solace).


## Other enhancements

Regular expressions are now Unicode-compliant. This enhancement to the specification from [Sergio Moya](https://www.linkedin.com/in/smoya) means that regular expressions (found in `pattern` and `patternProperties` fields) are now Unicode-compliant (according to ECMA-262).

This improves compatibility with some JSON Schema parsers. For more details, check out the [pull request](https://github.com/asyncapi/spec-json-schemas/pull/145).


## Deprecations

The `$ref` field in [Channel Item Object](https://www.asyncapi.com/docs/specifications/v2.3.0#channelItemObject) is now deprecated from AsyncAPI 2.3.0.

The current plan is that the `$ref` field will be removed from **Channel Item Object** in AsyncAPI 3.0, and replaced with [Reference Object](https://www.asyncapi.com/docs/specifications/v2.3.0#referenceObject).

For more detail, you can see the [discussion about this issue in GitHub](https://github.com/asyncapi/spec/issues/607).


## Tooling support

The following official AsyncAPI tools are already updated to support 2.3.0 version of the specification:
- JSON Schema that supports validation of AsyncAPI documents is updated in [this](https://github.com/asyncapi/asyncapi-node) repository. Also **@asyncapi/specs** package has been updated on NPM to version 2.13.0, and it contains the 2.3.0 JSON Schema.
- [JavaScript Parser](https://github.com/asyncapi/parser-js/) uses latest **@asyncapi/specs** package and can be used to parse and validate 2.3.0 documents. Upgrade to 1.14.0 version.
- [HTML template](https://github.com/asyncapi/html-template) uses the latest **@asyncapi/react-component** package. Upgrade to 0.24.7 version.
- [JavaScript Converter](https://github.com/asyncapi/converter-js/) enables conversion from any AsyncAPI version into the 2.3.0 version of the spec. Upgrade to 0.7.0 version.
- [Modelina](https://github.com/asyncapi/modelina/) now also accepts AsyncAPI documents valid against the 2.3.0 version of the spec. Upgrade to 1.46.0 version.
 - [Generator](https://github.com/asyncapi/generator/) uses the latest @asyncapi/parser package, so while generating output, it can validate 2.1.0 documents. Upgrade to 1.9.0 version.
Last but not least is the AsyncAPI Studio. Check new studio with [this example](https://studio.asyncapi.com/?url=https://raw.githubusercontent.com/asyncapi/spec/v2.3.0/examples/websocket-gemini.yml).

Big thanks to [Maciej Urbanczyk](https://github.com/magicmatatjahu) and [Jonas Lagoni](https://github.com/jonaslagoni/) for updating most relevant tooling.


## Look ahead

We aim to have a regular cadence of releases of the AsyncAPI specification, four times a year. For more information about when to expect future releases, you can see our [release process document](https://github.com/asyncapi/spec/blob/master/RELEASE_PROCESS.md#release-cadence).

We're also working on the next major release of the AsyncAPI specification: 3.0.0. If you'd like to contribute, or just follow the discussions, you can see the [milestone on GitHub](https://github.com/asyncapi/spec/milestone/18).


> Photo by <a href="https://unsplash.com/@aridley88?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Andrew Ridley</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

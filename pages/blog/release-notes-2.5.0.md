---
title: AsyncAPI Spec 2.5.0 Release Notes
date: 2022-09-20T16:41:00+01:00
type: Communication
tags:
  - Specification
  - Release Notes
cover: /img/posts/release-notes-2.5.0/cover.webp
authors:
  - name: Vladimír Gorej
    photo: /img/avatars/char0n.webp
    link: https://twitter.com/vladimirgorej
    byline: Open Source Software Engineer, OSS contributor, author and content creator.
excerpt: "AsyncAPI 2.5 is now released. This brings really helpful additions, such as extended Server Variables reusability, and many clarifications"
featured: true
---

The new version of the AsyncAPI specification - 2.5.0 - is now available.

> This is a minor release, and it doesn't bring any breaking changes. You can switch to it by modifying the following value in your AsyncAPI file `asyncapi: '2.4.0'` into `asyncapi: '2.5.0'`

## Server Variables can be now referenced from inside the Server Object 

Previous AsyncAPI 2.4.0 release came with support of [defining Server Variable Objects as reusable components](https://www.asyncapi.com/blog/release-notes-2.4.0#server-variables-can-be-now-referenced-from-components).
Unfortunately AsyncAPI 2.4.0 doesn't allow to reference reusable server variable objects from within the `Server Object`.
So we ended up in a situation that reusable server variable objects can be defined, but they actually cannot be reused.
AsyncAPI 2.5.0 remedies this deficiency by allowing to use `Reference Object` whenever `Server Variable Object` can be used inside `Server.variables` field.

Following example is now fully compliant with the specification:

```yaml
asyncapi: 2.4.0
servers:
  development:
    $ref: '#/components/servers/myserver'
  production:
    $ref: '#/components/servers/myserver'
components:
  servers:
    myserver:
      url: "{stage}.my-server.com:{port}"
      protocol: ws
      variables:
        stage:
          $ref: "#/components/serverVariables/stage"
        port:
          $ref: "#/components/serverVariables/port"
  serverVariables:
    stage:
      default: dev
    port:
      enum: [5000, 6000]
      default: 5000
```

This new feature was contributed by [Vladimír Gorej](https://github.com/char0n). For more detail, see [Vladimír's `/spec #776` pull request](https://github.com/asyncapi/spec/pull/776) and the [GitHub issue where Vladimír's change to `serverVariables ` was discussed](https://github.com/asyncapi/spec/issues/775).

## Decorating Server Object with tags

placeholder for description

## Clarifications

Here are notable clarifications that got into AsyncAPI 2.5.0 release. Here is the list of notable clarifications that may have
impact on the tooling authors:

**ChannelItem.$ref resolution rules**

All references of `MUST be in the format of a URL` sentence have been substituted with `This MUST be in the form of an absolute URL`.
The meaning of `absolute URL` is now defined by [RFC3986, section 4.3](https://datatracker.ietf.org/doc/html/rfc3986#section-4.3).

**Clarification around URL resolution rules**

The resolution rules around `ChannelItem.$ref` field were not clearly defined. AsyncAPI 2.5.0 comes with explicit clarification
that the resolution is done as defined by the [JSON Reference](https://tools.ietf.org/html/draft-pbryan-zyp-json-ref-03).

## Tooling support

The following official AsyncAPI tools are already updated to support 2.5.0 version of the specification:
- JSON Schema that supports validation of AsyncAPI documents is updated in [this](https://github.com/asyncapi/spec-json-schemas) repository. Also **@asyncapi/specs** package has been updated on NPM to version `<version>`, and it contains the 2.4.0 JSON Schema.
- [JavaScript Parser](https://github.com/asyncapi/parser-js/) uses latest **@asyncapi/specs** package and can be used to parse and validate 2.5.0 documents. Upgrade to `<version>` version.
- [HTML template](https://github.com/asyncapi/html-template) uses the latest **@asyncapi/react-component** package. Upgrade to `<version>` version.
- [JavaScript Converter](https://github.com/asyncapi/converter-js/) enables conversion from any AsyncAPI version into the 2.5.0 version of the spec. Upgrade to `<version>` version.
- [Generator](https://github.com/asyncapi/generator/) uses the latest @asyncapi/parser package, so while generating output, it can validate 2.5.0 documents. Upgrade to `<version>` version.

Last but not least is the AsyncAPI Studio. [Check out the Studio with this example](https://studio.asyncapi.com/?url=https://raw.githubusercontent.com/asyncapi/spec/v2.5.0/examples/websocket-gemini.yml).

## Look ahead

We aim to have a regular cadence of releases of the AsyncAPI specification, four times a year. For more information about when to expect future releases, you can see our [release process document](https://github.com/asyncapi/spec/blob/master/RELEASE_PROCESS.md#release-cadence).

We're also working on the next major release of the AsyncAPI specification: 3.0.0. If you'd like to contribute, or just follow the discussions, you can see [Work on 3.0 release issue](https://github.com/asyncapi/spec/issues/691).

> Photo by <a href="https://unsplash.com/@jeremythomasphoto?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Jeremy Thomas</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

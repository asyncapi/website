---
title: AsyncAPI Spec 2.5.0 Release Notes
date: 2022-09-29T16:41:00+01:00
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
excerpt: "The release of AsyncAPI 2.5 brings helpful additions, such as extended Server Variables reusability and many clarifications."
---

The new version of the AsyncAPI specification - 2.5.0 - is now available.

> This is a minor release, and it doesn't bring any breaking changes. You can switch to it by modifying the following value in your AsyncAPI file `asyncapi: '2.4.0'` into `asyncapi: '2.5.0'`

## Server Variables can be now referenced from inside the Server Object 

Previous AsyncAPI 2.4.0 release came with the support of [defining Server Variable Objects as reusable components](https://www.asyncapi.com/blog/release-notes-2.4.0#server-variables-can-be-now-referenced-from-components).
Unfortunately, AsyncAPI 2.4.0 doesn't allow referencing reusable _server variable objects_ from within the `Server Object`.
So we ended up in a situation where reusable server variable objects can be defined but cannot be reused.
AsyncAPI 2.5.0 remedies this deficiency by allowing the use of `Reference Object`s whenever `Server Variable Object`s can be used inside the `Server.variables` field.

The following example is now fully compliant with the updated specification:

```yaml
asyncapi: 2.5.0
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

Tags categorize or group resources. 2.5.0 introduces support for defining tags at the Server level, which can be used for many use cases such as grouping servers by their features: environment name, cluster name, visibility, owner, etc.

For example:

```yaml
asyncapi: '2.5.0'
info:
  title: Streetlights Kafka API
  version: '1.0.0'
servers:
  scram-connections:
    url: test.mykafkacluster.org:18092
    protocol: kafka-secure
    description: Test broker secured with scramSha256
    security:
      - saslScram: []
    tags:
      - name: "env:test-scram"
        description: "This environment is for running internal tests through scramSha256"
      - name: "kind:remote"
        description: "This server is a remote server. Not exposed by the application"
      - name: "visibility:private"
        description: "This resource is private and only available to certain users"  
  mtls-connections:
    url: test.mykafkacluster.org:28092
    protocol: kafka-secure
    description: Test broker secured with X509
    security:
      - certs: []
    tags:
      - name: "env:test-mtls"
        description: "This environment is for running internal tests through mTLS"
      - name: "kind:remote"
        description: "This server is a remote server. Not exposed by the application"
      - name: "visibility:private"
        description: "This resource is private and only available to certain users"
channels: {}
```

This new feature was contributed by [Sergio Moya](https://github.com/smoya). For more detail, see [Sergio's `/spec #809` pull request](https://github.com/asyncapi/spec/pull/809) and the [GitHub issue where Sergio's change was discussed](https://github.com/asyncapi/spec/issues/654).

## Added missing IBM MQ Operation Binding

We noticed that we overlooked and did not define the Operation Bindings Object in the case of IBM MQ. 
In AsyncAPI 2.5.0, the definition is empty, but its name is reserved for future use to be consistent with the rest of the bindings.

This change was contributed by [Maciej Urbańczyk](https://github.com/magicmatatjahu). For more detail, see [Maciej's `/spec #840` pull request](https://github.com/asyncapi/spec/pull/840).

## Added new Google Cloud Pub/Sub Bindings

The specification is now extended to support another custom protocol through the bindings feature:

Google Cloud Pub/Sub, thanks to [Jeremy Whitlock](https://github.com/whitlockjc). For more details, check out this [pull request](https://github.com/asyncapi/spec/pull/836) and the [binding definition](https://github.com/asyncapi/bindings/tree/master/googlepubsub).

## Clarifications

Here are notable clarifications that got into the AsyncAPI 2.5.0 release. Here is the list of notable clarifications that may have an impact on the tooling authors:

**ChannelItem.$ref resolution rules**

All references of `MUST be in the format of a URL` sentence have been substituted with `This MUST be in the form of an absolute URL`.
The meaning of `absolute URL` is now defined by [RFC3986, section 4.3](https://datatracker.ietf.org/doc/html/rfc3986#section-4.3).

**Clarification around URL resolution rules**

The resolution rules around `ChannelItem.$ref` field were not clearly defined. AsyncAPI 2.5.0 comes with explicit clarification that the resolution is done as defined by the [JSON Reference](https://datatracker.ietf.org/doc/html/draft-pbryan-zyp-json-ref-03).

## Tooling support

The following official AsyncAPI tools are already updated to support the 2.5.0 specification version:
- JSON Schema that supports validation of AsyncAPI documents is updated in our [specification JSON schema repository](https://github.com/asyncapi/spec-json-schemas). We updated the **@asyncapi/specs** package on NPM to version `3.2`, containing the JSON Schema document for AsyncAPI Spec 2.5.0.
- [JavaScript Parser](https://github.com/asyncapi/parser-js/) can be used to parse and validate 2.5.0 documents. Upgraded to `the 1.17.0` version.
- [AsyncAPI React Component](https://github.com/asyncapi/asyncapi-react) allows you to render and validate the documentation of your asynchronous API provided in the AsyncAPI specification format. Upgraded to the `v1.0.0-next.43` version.
- [HTML template](https://github.com/asyncapi/html-template) uses the latest **@asyncapi/react-component** package. Upgraded to the `0.26.0` version.
- [JavaScript Converter](https://github.com/asyncapi/converter-js/) enables conversion from any AsyncAPI version into the 2.5.0 version of the spec. Upgraded to the `1.1.0` version.
- [Generator](https://github.com/asyncapi/generator/) uses the latest @asyncapi/parser package, so while generating output, it can validate 2.5.0 documents. Upgraded to the `1.9.12` version.
- [Modelina](https://github.com/asyncapi/modelina/) can be used to generate typed models. Upgraded to the `1.0.0-next.11` version.
- [Bundler](https://github.com/asyncapi/bundler) can be used to generate typed models. Upgraded to the `0.2.3` version.
- [Cupid](https://github.com/asyncapi/cupid) can be used to generate typed models. Upgraded to the `0.6.20` version.
- [Optimizer](https://github.com/asyncapi/optimizer) can be used to generate typed models. Upgraded to the `0.1.11` version.
- [Glee](https://github.com/asyncapi/glee) can be used to generate typed models. Upgraded to the `0.10.23` version.
- [Spectral AsyncAPI Ruleset](https://meta.stoplight.io/docs/spectral/1e63ffd0220f3-async-api-rules) that you can use for lining of AsyncAPI documents will be released soon. [The pull request](https://github.com/stoplightio/spectral/pull/2292) is ready.
- Last but not least comes AsyncAPI Studio. [Check out AsyncAPI Studio with this YAML example](https://studio.asyncapi.com/?url=https://raw.githubusercontent.com/asyncapi/spec/v2.5.0/examples/websocket-gemini.yml).

## Look ahead

We aim to have a quarterly cadence of releases of the AsyncAPI specification. For more information about when to expect future releases, you can see our [release process document](https://github.com/asyncapi/spec/blob/master/RELEASE_PROCESS.md#release-cadence).

We're also working on the next major release of the AsyncAPI specification: 3.0.0. If you'd like to contribute, or just follow the discussions, you can see [work on the 3.0 release issue](https://github.com/asyncapi/spec/issues/691).

> Photo by <a href="https://unsplash.com/@jeremythomasphoto?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Jeremy Thomas</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

---
title: AsyncAPI Spec 2.4.0 Release Notes
date: 2022-04-28T09:00:00+01:00
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
excerpt: 'AsyncAPI 2.4 is now released. This brings really helpful additions, such as the new `messageId` field, Server Variables reusability, and security at Operation level'
---

The new version of the AsyncAPI specification - 2.4.0 - is now available.

> This is a minor release, and it doesn't bring any breaking changes. You can switch to it by modifying the following value in your AsyncAPI file `asyncapi: '2.3.0'` into `asyncapi: '2.4.0'`

## Message uniqueness thanks to the new messageId field

As operations have `OperationId`, AsyncAPI messages can now define `messageId`. This new field is used to identify a message across a whole AsyncAPI document uniquely.
This new field will be helpful in tools that ask the user to select a message as input, such as validating their schema or filtering code to be generated.

For example:

```yaml
asyncapi: 2.4.0
components:
  messages:
    SomeMessage:
      messageId: SomeMessage
      payload:
        type: object
        properties:
          name:
            type: string
```

This new feature was contributed by [Waleed Ashraf](https://github.com/WaleedAshraf).
For more detail, see [Waleed's `/spec #751`pull request](https://github.com/asyncapi/spec/pull/751) and the [GitHub issue where Waleed's `MessageId` feature addition was discussed](https://github.com/asyncapi/spec/issues/458).

## Server Variables can be now referenced from components

To allow for more flexibility in how AsyncAPI documents are structured and enable content to be reused, `serverVariables` can now be defined as reusable components.

For example:

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

These are added to the many other aspects of the AsyncAPI specification which can be declared as reusable components. You can see the full list in the [Components Object section of the AsyncAPI specification](https://www.asyncapi.com/docs/specifications/v2.4.0#componentsObject).

This new feature was contributed by [Daniel Kocot](https://github.com/danielkocot). For more detail, see [Daniel's `/spec #717` pull request](https://github.com/asyncapi/spec/pull/717) and the [GitHub issue where Daniel's change to `serverVariables ` was discussed](https://github.com/asyncapi/spec/issues/707).

## Security can now be defined at Operation level

Until today, Security requirements were defined at Server level. That restricted the security requirements to be the same for all channels linked with a Server, and for all operations of those channels.
In fact, when setting Security in both the Server and the Operation, both should be satisfied.

For example:

```yaml
asyncapi: 2.4.0
servers:
  production:
    url: "mykafkacluster.org:8092"
    protocol: kafka-secure
    security:
      - service_auth:
         - auth:write
         - auth:read
channels:
  some/events:
    servers:
      - production
    subscribe:
      # This operation level security implies the ability to subscribe to messages from
      # `some/events` channel with Authorization headers 
      # that have `auth:read` scope. Note that an operation level security must still satisfy 
      # security requirements specified at the server level.
      security:
        - service_auth:
          - auth:read  
```

Thanks to [Sekharbans](https://github.com/sekharbans-ebay), is now possible to increase security granularity by defining a set of security requirements at Operation level. For more detail, see [Sekharban's `/spec #584` pull request](https://github.com/asyncapi/spec/pull/584) and the [GitHub issue where Sekharban's suggested feature was discussed](https://github.com/asyncapi/spec/issues/584).

## Reusability of Servers defined in Components is clarified in the specification

Reusability of Servers was introduced in [AsyncAPI 2.3.0](https://www.asyncapi.com/blog/release-notes-2.3.0#servers-and-channels-can-now-be-defined-as-reusable-components). However, the change was not fully clarified in the specification, leading to confusion.

Thanks to [Vladimir Gorej](https://github.com/char0n), this is now clarified by mentioning that elements for the Servers Object can be either Server Object or a Reference Object.
For more detail, see [Vladimir's `/spec #706`pull request](https://github.com/asyncapi/spec/pull/706) and the [GitHub issue where Vladimir's Servers Object change was discussed](https://github.com/asyncapi/spec/issues/705).

## Tooling support

The following official AsyncAPI tools are already updated to support 2.4.0 version of the specification:
- JSON Schema that supports validation of AsyncAPI documents is updated in [this](https://github.com/asyncapi/spec-json-schemas) repository. Also **@asyncapi/specs** package has been updated on NPM to version `2.14.0`, and it contains the 2.4.0 JSON Schema.
- [JavaScript Parser](https://github.com/asyncapi/parser-js/) uses latest **@asyncapi/specs** package and can be used to parse and validate 2.4.0 documents. Upgrade to `1.15.0` version.
- [HTML template](https://github.com/asyncapi/html-template) uses the latest **@asyncapi/react-component** package. Upgrade to `0.24.9` version.
- [JavaScript Converter](https://github.com/asyncapi/converter-js/) enables conversion from any AsyncAPI version into the 2.4.0 version of the spec. Upgrade to `0.11.0` version.
- [Generator](https://github.com/asyncapi/generator/) uses the latest @asyncapi/parser package, so while generating output, it can validate 2.4.0 documents. Upgrade to `1.9.3` version.

Last but not least is the AsyncAPI Studio. [Check out the Studio with this example](https://studio.asyncapi.com/?url=https://raw.githubusercontent.com/asyncapi/spec/v2.4.0/examples/websocket-gemini.yml).

## Look ahead

We aim to have a regular cadence of releases of the AsyncAPI specification, four times a year. For more information about when to expect future releases, you can see our [release process document](https://github.com/asyncapi/spec/blob/master/RELEASE_PROCESS.md#release-cadence).

We're also working on the next major release of the AsyncAPI specification: 3.0.0. If you'd like to contribute, or just follow the discussions, you can see [Work on 3.0 release issue](https://github.com/asyncapi/spec/issues/691).

> Photo by <a href="https://unsplash.com/@andurache?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Alexandru Tudorache</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

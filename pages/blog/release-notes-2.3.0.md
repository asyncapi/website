---
title: AsyncAPI Spec 2.3.0 Release Notes
date: 2022-01-05T10:00:00+01:00
type: Communication
tags:
  - Specification
  - Release Notes
cover: /img/posts/release-notes-2.3.0/cover.webp
authors:
  - name: Lukasz Gornicki
    photo: /img/avatars/lpgornicki.webp
    link: https://twitter.com/derberq
    byline: AsyncAPI Maintainer and Community Guardian
excerpt: 'TODO: write excerpt'
featured: true
---

AsyncAPI specification 2.3.0 release notes

> This is a minor release, and it doesn't bring any breaking changes. You can switch to it by modifying the following value in your AsyncAPI file `asyncapi: '2.2.0'` into `asyncapi: '2.3.0'`


## Servers and channels can now be defined as reusable components

To allow for more flexibility in how AsyncAPI documents are structured and enable content to be reused, `servers` and `channels` can now be defined as reusable components.

For example:

```yaml
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

This new feature was contributed by [Sergio Moya](https://www.linkedin.com/in/smoya). For more detail, see this [pull request](https://github.com/asyncapi/spec/pull/665) and the [Github issue where this change was discussed](https://github.com/asyncapi/spec/issues/660).


## Channels are now optional

Related to the above change, also in support of enabling greater flexibility in how AsyncAPI documents are structured and reused, `channels` are no longer a required section.

This change makes it easier, for example, to have an AsyncAPI document that only contains reusable component definitions. For more detail, see the [Github issue where this change was discussed](https://github.com/asyncapi/spec/issues/661).

For example, you could now have:

```yaml
PLACEHOLDER - asyncapi doc A without channels
```

```yaml
PLACEHOLDER - asyncapi doc B that has refs to content from doc A
```

## New protocol bindings

The specification is now extended to support the following custom protocols through the bindings feature:

Solace, thanks to [Michael Davis](https://github.com/damaru-inc). For more details, check out this [pull request](https://github.com/asyncapi/spec/pull/666) and [binding definition](https://github.com/asyncapi/bindings/tree/master/solace).


## Other enhancements

Regular expressions are now Unicode-compliant. This enhancement to the specification from [Sergio Moya](https://www.linkedin.com/in/smoya) means that regular expressions (found in `pattern` and `patternProperties` fields) are now Unicode-compliant (according to ECMA-262). This improves compatibility with some JSON Schema parsers. For more details, check out the [pull request](https://github.com/asyncapi/spec-json-schemas/pull/145).


## Look ahead

future minor releases https://github.com/asyncapi/spec/blob/master/RELEASE_PROCESS.md#release-cadence

work on 3.0.0 https://github.com/asyncapi/spec/milestone/18






- put good overview
- each section should represent a feature
  - clear info about feature
  - use case
  - contributor
  - link to PR
- last section should have additional thank you towards other people involved in the release success

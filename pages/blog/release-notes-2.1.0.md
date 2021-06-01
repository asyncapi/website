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



## Old new defaultContentType property in root object

We used and supported `defaultContentType` property to specify default content type to use when encoding/decoding a message's payload. [Lucas Block](https://github.com/BlockLucas) spotted that we do not have it defined in the specification. For more details check out [this pull request](https://github.com/asyncapi/spec/pull/419).


## New protocol bindings

Add `mercure` to protocol bindings.
Add ibmmq once merged


OpenAPI 3.0.0 Schema support is now recommended instead of mandatory.

Add SASL security schemes.



> Photo by <a href="https://unsplash.com/@dougswinson?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Doug Swinson</a> on <a href="https://unsplash.com/s/photos/landing-eagle?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

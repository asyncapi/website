---
title: "The Reference Rabbit Hole"
date: 2021-11-15T12:00:00+01:00
type: Engineering
tags:
  - Specification
  - JSON Schema 
cover: /img/posts/the-reference-rabbit-hole.webp
authors:
  - name: Jonas Lagoni
    photo: /img/avatars/jonaslagoni.webp
    link: https://github.com/jonaslagoni
    byline: AsyncAPI Maintainer
---

So [Sergio](https://github.com/smoya) and I, went down a little bit of a rabbit hole the last couple of days, when we where discussing [Fran's proposal to solve publish/subscribe confusion](https://github.com/asyncapi/spec/issues/618), and I thought I would share the journey.

## What is a reference?
References is something in AsyncAPI we use to allow for reusability, so we don't need to define things twice. In AsyncAPI we refer to this as the [Reference Object](https://www.asyncapi.com/docs/specifications/v2.2.0#referenceObject). 


## The Trigger
During the discussion Sergio brought up that Fran was actually using an illegal reference, as he, in one of the examples, used a Reference Object for server, which was not allowed.

Immediately I was like, "Wait, it's not?!". Cause Prior to this, I had always used `$ref` quite extensively in my AsyncAPI documents, - and I knew that the tooling had no problems with `$ref` as long as it was a valid reference that could be resolved. 

So to me, there was no way you could not reference servers, cause I had done just that in the past.

But Sergio was absolutely right, a second look into the specification, `servers` are defined using [Servers Object](https://www.asyncapi.com/docs/specifications/v2.2.0#serversObject), which are defined using a map of [Server Object](https://www.asyncapi.com/docs/specifications/v2.2.0#serverObject)s. **NOT** `Server Object | Reference Object` as I expected.


### But why did tooling allow it?!
So after that, we started to realize that there is quite a big difference when and where Reference Objects are allowed. For the full list of discrepancies, check out [spec #650](https://github.com/asyncapi/spec/issues/650).

A quick side note, when I say tooling allowed it, I mean the [JS Parser](https://github.com/asyncapi/parser-js), as most of our tooling directly depend upon this library to parse and interact with AsyncAPI documents. 

So back to my own experience, why was I so sure that the tooling allowed for me to use Reference Objects for servers? 

Well, as it turns out, it is because that the underlying parser bundles references before it validates the AsyncAPI document. This means that if I defined my AsyncAPI document such as:

```yaml
asyncapi: '2.2.0'
info:
  title: Test overriding dereferenced objects 
  version: '1.0.0'
servers:
  test-server:
    $ref: './servers/testServer.yaml'
...
```

Together with `testServer.yaml`:
```yaml
url: ws://mycompany.com/ws
protocol: ws
```

Validating the AsyncAPI document using the [JSON Schema representation for 2.2.0](https://github.com/asyncapi/spec-json-schemas/blob/master/schemas/2.2.0.json), would reject it. 

However, because the parser bundles the reference together before doing so:

```yaml
asyncapi: '2.2.0'
info:
  title: Test overriding dereferenced objects 
  version: '1.0.0'
servers:
  test-server:
    url: ws://mycompany.com/ws
    protocol: ws
...
```

It is a fully valid AsyncAPI document once the parser tries to validate the document. Checkout [parser-js #405](https://github.com/asyncapi/parser-js/issues/405) for more information.

## Deep diving
We started discussing the reference behavior,and we started to peruse the specification in terms of the Reference Object and the [Schema Object](https://www.asyncapi.com/docs/specifications/v2.2.0#schemaObject).

That was when we took notice, that depending on where you use the `$ref` keyword, it is subject to a different behavior.

This was something that, I especially, did not realize up until this point. In AsyncAPI Reference Object, is following [JSON Reference](https://tools.ietf.org/html/draft-pbryan-zyp-json-ref-03), and for our Schema Object something different...

By default, `$ref` in the Schema Object, is inherited by [JSON Schema Draft 7](https://datatracker.ietf.org/doc/html/draft-handrews-json-schema-01), described in [section 8](https://datatracker.ietf.org/doc/html/draft-handrews-json-schema-01#section-8).

One of the key differences between our Reference Object, and how `$ref` is interpreted in JSON Schema Draft 7, is the [$id keyword](https://datatracker.ietf.org/doc/html/draft-handrews-json-schema-01#section-8.2). This allows you to define a URI that other schemas within itself need to resolve against. Meaning that it is allowed to do:

```yaml
asyncapi: "2.2.0"
...
channels:
  test/channel:
    publish:
      message:
        payload: 
          $id: "https://example.com/schemas/customer"
          type: "object"
          properties:
            address: 
              $ref: "/schemas/address"
components: 
  schemas:
    # Same dereference behavior
...
```

Which results in the dereferencer to look up the reference for the address property at `https://example.com/schemas/address`, because it uses the Base URI of the `$id` (`https://example.com`). A Little test showed that this was not supported by the parser, see [parser-js #403](https://github.com/asyncapi/parser-js/issues/403) for more information.

Luckily, they both match the same behavior in terms of extra keywords. Both Reference Object and Schema Object should ignore extra keywords. Unlucky for us, tooling did not follow this behavior, as they include the extra keywords. See [parser-js #404](https://github.com/asyncapi/parser-js/issues/404) for more information.

This difference in behavior, is actually really really annoying from a tooling, or more specifically from a parser perspective. Because this means that we **NEED** to dereference and bundle references differently, based on it's location in the AsyncAPI document, and maybe even with different tooling, since they don't share the same underlying behavior.

This becomes only more apparent if we want to update JSON Schema Draft 7 to [JSON Schema draft 2020-12](https://github.com/asyncapi/spec/issues/596), we no longer will have the same behavior in terms of extra keywords. As from [2019-09 JSON Schema](https://datatracker.ietf.org/doc/html/draft-handrews-json-schema-02) changed it's behavior to allowing extra keywords along side `$ref` - And this is along side a bunch of other referencing keywords such as `$recursiveAnchor`, `$dynamicAnchor`, ..., which changes the dereference behavior even more.

This difference between the two, is what triggered the last issue in the [spec 649](https://github.com/asyncapi/spec/issues/649). We need to see if we cant unify this behavior in some.

Cause to me this is confusing, not only from an end-users point of view that uses AsyncAPI to document their applications, but also maintainers who are creating the underlying tools.

## Final word
That concludes the rabbit hole of issues for a simple `$ref` keyword... 

If you have any comments or issues with what was described here, please go into the respective issues and make a comment - also if you think we are wrong!

In case you are interested, we are also looking for contributors, to help us solve these issues. If you want to take one up, just write a comment in the respective issue.

Overview of issues:

- [spec #650](https://github.com/asyncapi/spec/issues/650), highlight the discrepancies when the Reference Object can be used.
- [spec #649](https://github.com/asyncapi/spec/issues/649), tries to solve the core issue that `$ref` means two different things, depending on when it's used.
- [parser-js #405](https://github.com/asyncapi/parser-js/issues/405), highlight that the parser accurately validates incorrect AsyncAPI documents, because it bundles references before validating.
- [parser-js #404](https://github.com/asyncapi/parser-js/issues/404), highlight that the parser allow for keywords to be defined together with `$ref` and are not being ignored.
- [parser-js #403](https://github.com/asyncapi/parser-js/issues/403), highlight that the parser does not care about `$id` in the Schema Object, when it should.


> Photo by <a href="https://unsplash.com/@emilymorter?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Emily Morter</a> on <a href="https://unsplash.com/s/photos/confusion?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
  
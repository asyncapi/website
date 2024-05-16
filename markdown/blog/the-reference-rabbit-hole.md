---
title: "The Reference Rabbit Hole"
date: 2021-11-30T12:00:00+01:00
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

[Sergio](https://github.com/smoya) and I went down a bit of a rabbit hole the last couple of days while discussing [Fran's proposal to solve the publish/subscribe confusion](https://github.com/asyncapi/spec/issues/618); I thought I would share the journey. 

A lot of this can be seen as nitpicking... And I totally get this, as we need to venture deep into the specifications to fully understand the differences.

I'm going to try to not use any complex words and explanations so that everyone can understand the problems, whether you're a novice or an experienced AsyncAPI user. 

So let's split up the understanding of what references are, where references can be used, and what's down this rabbit hole. 

# AsyncAPI references

In AsyncAPI, we have something called a [Reference Object](https://www.asyncapi.com/docs/specifications/v2.2.0#referenceObject), which simply enables reusability in your AsyncAPI documents. This is possible through the simple keyword `$ref`. If we take a look at the [streetlight tutorial](https://www.asyncapi.com/docs/tutorials/streetlights), to utilize reusability, we could change [the document](https://www.asyncapi.com/docs/tutorials/streetlights#creating-the-asyncapi-file) to:

```yaml
asyncapi: '2.2.0'
...
channels:
  light/measured:
    publish:
      summary: Inform about environmental lighting conditions for a particular streetlight.
      operationId: onLightMeasured
      message:
        $ref: '#/components/messages/LightMeasured'
components:
  messages:
    LightMeasured: 
      name: LightMeasured
      payload:
        $ref: '#/components/schemas/LightMeasurement'
  schemas:
    LightMeasurement:
      # Ignore the specifics here for now.
```
Here you can see that we simply reference where the definition of messages and payload schema is located.

# Schema Object references
As seen in the streetlight example, to define your message payloads in AsyncAPI, we use a [Schema Object](https://www.asyncapi.com/docs/specifications/v2.2.0#schemaObject), which is a superset of [JSON Schema draft 7](https://datatracker.ietf.org/doc/html/draft-handrews-json-schema-01). 

What `superset` means is we follow the JSON Schema draft 7 specification, but with a few modifications and additions to keywords.

The message `LightMeasured`, contains a keyword called `payload`, which is by default defined as a **Schema Object**. 

This is where the confusion starts, what behavior does the `$ref` keyword follow? More precisely, which specification?

# The confusion creeps in
Let's take a closer look at the [Schema Object](https://www.asyncapi.com/docs/specifications/v2.2.0#schemaObject) to see if we can figure out the answer.

> Further information about the properties can be found in JSON Schema Core and JSON Schema Validation. Unless stated otherwise, the property definitions follow the JSON Schema specification as referenced here.

So what this means is that unless stated otherwise in the **Schema Object**, it should follow the official JSON Schema draft 7 specification. So let's try to read further, to see if anything is stated about references. 

> Alternatively, any time a Schema Object can be used, a **Reference Object** can be used in its place. This allows referencing definitions in place of defining them inline.

Okay... So that must mean that if we ever encounter a reference, we follow the **Reference Object** description. 

Well, that was easy; I see no rabbit hole here, Jonas!? 

# Welcome to the rabbit hole
During the discussion, Sergio brought up that Fran was using an illegal reference, as he, in one of the examples, was using a **Reference Object** for a server, which was not allowed.  More specifically, it was this example where he references the `mosquitto` server:

```yaml
...
servers:
  mosquitto:
    $ref: 'common.asyncapi.yaml#/components/servers/mosquitto'
```

My immediate reaction was "wait... It's not?!"

I had always used `$ref` quite extensively in my AsyncAPI documents and specifically used a reference for servers. And I knew that the tooling had no problems with the `$ref` as long as it was a valid reference. 

But Sergio was absolutely right; a second look at the specification showed that `servers` are defined using the [Servers Object](https://www.asyncapi.com/docs/specifications/v2.2.0#serversObject), which is defined by using a map of [Server Object](https://www.asyncapi.com/docs/specifications/v2.2.0#serverObject)s. **NOT** `Server Object | Reference Object` as I expected.

After that, we started to realize that there is quite a big difference between when and where **Reference Object**s are allowed. For the full list of discrepancies, check out [spec #650](https://github.com/asyncapi/spec/issues/650).

But... Why did I think it was allowed to do so? 

## Discrepancies in AsyncAPI Tooling
So back to my own experience, why was I so sure that the tooling allowed for me to use **Reference Object**s for servers? 

Well, as it turns out, it's because the [JS parser](https://github.com/asyncapi/parser-js) dereferences before it validates the AsyncAPI document. This means that if I defined my AsyncAPI document as follows:

```yaml
asyncapi: '2.2.0'
...
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

Validating the AsyncAPI document using a tool such as [ajv](https://ajv.js.org/) against the [JSON Schema representation for 2.2.0](https://github.com/asyncapi/spec-json-schemas/blob/master/schemas/2.2.0.json), it would reject it. 

However, because the parser dereferences first, the document that is being validated is this:

```yaml
asyncapi: '2.2.0'
...
servers:
  test-server:
    url: ws://mycompany.com/ws
    protocol: ws
...
```

Checkout [parser-js #405](https://github.com/asyncapi/parser-js/issues/405) for more information.

## What about `$id` keyword

One of the key differences between our **Reference Object**, and how `$ref` is resolved in JSON Schema Draft 7, is the [$id keyword](https://datatracker.ietf.org/doc/html/draft-handrews-json-schema-01#section-8.2). This allows you to define a URI that is used as a base URI. This means that for example a message such as this:

```yaml
asyncapi: '2.2.0'
...
channels:
  test/channel:
    publish:
      message:
        schemaFormat: application/schema+json;version=draft-07
        payload: 
          $id: https://example.com/schemas/test
          type: object
          properties:
            address: 
              $ref: "address"
...
```

This will result in the reference for the `address` property, to be looked up at `https://example.com/schemas/address`, because it uses the Base URI in `$id` from the parent schema (`https://example.com/schemas`). 

I tried a little test in the [new Studio tool](https://studio.asyncapi.com/) (Studio uses the parser, so it could be used for an easy test), [which showed that this was not supported by the parser](https://studio.asyncapi.com/?base64=YXN5bmNhcGk6ICcyLjIuMCcKaW5mbzoKICB0aXRsZTogVGVzdCBvdmVycmlkaW5nIGRlcmVmZXJlbmNlZCBvYmplY3RzIAogIHZlcnNpb246ICcxLjAuMCcKY2hhbm5lbHM6CiAgdGVzdC9jaGFubmVsOgogICAgcHVibGlzaDoKICAgICAgbWVzc2FnZToKICAgICAgICBzY2hlbWFGb3JtYXQ6IGFwcGxpY2F0aW9uL3NjaGVtYStqc29uO3ZlcnNpb249ZHJhZnQtMDcKICAgICAgICBwYXlsb2FkOiAKICAgICAgICAgICRpZDogaHR0cHM6Ly9leGFtcGxlLmNvbS9zY2hlbWFzL3Rlc3QKICAgICAgICAgIHR5cGU6IG9iamVjdAogICAgICAgICAgcHJvcGVydGllczoKICAgICAgICAgICAgYWRkcmVzczogCiAgICAgICAgICAgICAgJHJlZjogImFkZHJlc3Mi). The library tries to resolve the reference at `https:///address` when it should have tried to resolve it from `http://example.com/schemas/address`. See [parser-js #403](https://github.com/asyncapi/parser-js/issues/403) for more information.

## What about `$schema`?
Before getting into `$schema` I first need to mention a keyword in AsyncAPI called [schemaFormat which is part of the Message Object](https://www.asyncapi.com/docs/specifications/v2.2.0#messageObject). What this keyword is used for is to change what format the payload is defined with. By defining it with `application/vnd.aai.asyncapi+yaml;version=2.2.0` it is the same as the default format.

In JSON Schema Draft 7, and in the **Schema Object**, there exists a keyword, similar to what `schemaFormat` is for AsyncAPI, that can be used to define what version of JSON Schema `LightMeasurement` follows.

So what if both are defined at the same time, and they contradict each other?

```yaml
asyncapi: '2.2.0'
...
components:
  messages:
    LightMeasured: 
      name: LightMeasured
      schemaFormat: application/vnd.aai.asyncapi+yaml;version=2.2.0
      payload:
        $ref: '#/components/schemas/LightMeasurement'
  schemas:
    LightMeasurement:
      $schema: 'http://json-schema.org/draft-04/schema#'
      ...
```
With such contradicting information, how should tooling handle this? This sparked [spec #655](https://github.com/asyncapi/spec/issues/655).

## What about extra keywords?
Following that, by taking a closer look at the [JSON reference](https://datatracker.ietf.org/doc/html/draft-pbryan-zyp-json-ref-03) specification the **Reference Object** follows, we find the [sentence](https://datatracker.ietf.org/doc/html/draft-pbryan-zyp-json-ref-03#section-3):

> Any members other than "$ref" in a JSON Reference object SHALL be ignored.

What this means, is that if we have a reference defined such as:

```yaml
...
components:
  messages:
    LightMeasured:
      payload:
        type: boolean
        $ref: '#/components/schemas/LightMeasurement'
  schemas:
    LightMeasurement:
      type: string
```

The `type` property for the message payload, should be completely ignored. So let's try and see what happens when we try this in [Studio](https://studio.asyncapi.com/?base64=YXN5bmNhcGk6ICcyLjIuMCcKaW5mbzoKICB0aXRsZTogVGVzdCBvdmVycmlkaW5nIHByb3BlcnRpZXMgd2l0aCBkZXJlZmVyZW5jZWQgb2JqZWN0cyAKICB2ZXJzaW9uOiAnMS4wLjAnCmNoYW5uZWxzOgogIHRlc3Q6CiAgICBwdWJsaXNoOgogICAgICBtZXNzYWdlOgogICAgICAgICRyZWY6ICcjL2NvbXBvbmVudHMvbWVzc2FnZXMvTGlnaHRNZWFzdXJlbWVudCcKY29tcG9uZW50czoKICBtZXNzYWdlczoKICAgIExpZ2h0TWVhc3VyZW1lbnQ6IAogICAgICBuYW1lOiBMaWdodE1lYXN1cmVtZW50CiAgICAgIHBheWxvYWQ6CiAgICAgICAgdHlwZTogYm9vbGVhbgogICAgICAgICRyZWY6ICcjL2NvbXBvbmVudHMvc2NoZW1hcy9MaWdodE1lYXN1cmVtZW50JwogIHNjaGVtYXM6CiAgICBMaWdodE1lYXN1cmVtZW50OgogICAgICB0eXBlOiBzdHJpbmc=).

Once the schema is parsed, all that remains is `type: boolean`, and not the expected `type: string` from the referenced schema. This is clearly the opposite of what the specification defines. For more information see [parser-js #404](https://github.com/asyncapi/parser-js/issues/404).

We then asked ourselves, what about JSON Schema, does it define a different behavior? The answer to this question can be found [here](https://datatracker.ietf.org/doc/html/draft-handrews-json-schema-01#section-8.3):

> All other properties in a "$ref" object MUST be ignored.

Luckily, they both match the same behavior in terms of extra keywords. Both Reference Object and JSON Schema should ignore extra keywords.

But, what if I use one of the newer JSON Schema versions, what then?

## Upgrading to JSON Schema draft 2020-12
We started to correlate the findings with the feature request from [Maciej](https://github.com/magicmatatjahu) about updating AsyncAPI Schema Object to point towards [JSON Schema Draft 2020-12](https://datatracker.ietf.org/doc/html/draft-bhutton-json-schema-00).

What would this mean for our little `$ref` keywords?

OpenAPI have in its most recent version 3.1, switched its default JSON Schema version to Draft 2020-12, the exact feature request for AsyncAPI. This, however, introduced a huge change to how you bundle references. I don't want to spend much time on this as [Ben](https://twitter.com/relequestual) and [Mike](https://twitter.com/PermittedSoc) described this entire change and what it means in terms of bundling in this great blog post [Bundling simple external resources](https://json-schema.org/blog/posts/bundling-json-schema-compound-documents#bundling-simple-external-resources). Besides this, the release notes for Draft 2020-12 also offers some guidance which can be found here: https://json-schema.org/draft/2020-12/release-notes.html

Besides having a bunch of new keywords that change the referencing behavior, such as `$dynamicRef`, `$dynamicAnchor`, `$anchor`, one of the key differences is that in [JSON Schema draft 2019-09](https://datatracker.ietf.org/doc/html/draft-handrews-json-schema-02), they changed their behavior of references so that extra keywords are now allowed adjacent to `$ref`.

But what does this mean exactly? Does this mean `$ref` overwrites any duplicated properties? Or is it the other way around?

Well, there is one thing we need to remember about JSON Schema. It is primarily built for validation rules and how a validator can take input data and determine whether that input is valid against the Schema. 

This means, that if you have a JSON Schema using `$ref` such as:
```json
{ "$ref": "./test.json", "minLength": 7, "maxLength": 12}
```
and `test.json` is defined as:

```json
{"minLength": 5, "format": "email"}
```

JSON Schema draft 2019-09, assumes that the references are resolved similar to:
```json
{"$ref": {"minLength": 5, "format": "email"}, "minLength": 7, "maxLength": 12}
```

This is because in validation, you want to validate that the input data is valid against the referenced schema and should [**not** be seen as a kind of merging behavior](https://github.com/APIDevTools/json-schema-ref-parser/issues/145):
```json
{"format": "email", "minLength": 7, "maxLength": 12}
```

This behavior is different from what is assumed when using AsyncAPI, as the last option, is more aligned with expected behavior.

Furthermore, now, each schema can define it's own `$schema` that they follow, instead of ONLY being available at the root... 

This leaves the question, how can we make sure that we stay consistent and don't introduce more confusion into the AsyncAPI specification? This difference is what triggered the last issue in [spec 649](https://github.com/asyncapi/spec/issues/649).

## Hard to find tooling
This leaves us with one huge deficit, that there are so many different behaviors for references that tooling mix and matches between the specifications and what they solve.

One of the most used tooling for dereferencing stuff in JS, and the one we are using is from [APIDevTools called json-schema-ref-parser](https://github.com/APIDevTools/json-schema-ref-parser). We actually use this tool to ensure **ANY** encounters of `$ref` are dereferenced, so the tool has direct access to the schema, without it having to look elsewhere for it. 

However, the tool started out being built **ONLY** for dereferencing `$ref` based on the [JSON Reference specification and the JSON Pointer specification](https://github.com/APIDevTools/json-schema-ref-parser/issues/22#issuecomment-231783185).  At least it was, now it's not easy to figure out what it is for, as [it allows extra properties](https://github.com/APIDevTools/json-schema-ref-parser/issues/232) but [$id is not taken into account](https://github.com/APIDevTools/json-schema-ref-parser/issues/136).

This leaves us in a bit of a struggle, as [there are not many alternatives](https://json-schema.org/implementations.html#general-processing); JS [@hyperjump/json-schema-core](https://github.com/jdesrosiers/json-schema-core) looks promising, but there's no tooling that our [Go parser](https://github.com/asyncapi/parser-go) can use.

And with no official or community tooling, we are left with having to develop it ourselves to adopt the spec... There are luckily efforts being made in [JSON Schema to adopt to such a change](https://github.com/json-schema-org/community/discussions/113).

# Final word
That concludes the rabbit hole that Sergio and I went down, for a simple `$ref` keyword... (ONE KEYWORD! :sweat_smile:)


If you have any comments or issues with what was described here, please go into the respective issues and make a comment - also if you think we are wrong!

In case you are interested, we are also looking for contributors, to help us solve these issues. If you want to take one up, just write a comment in the respective issue.

Overview of issues:

- [spec #650](https://github.com/asyncapi/spec/issues/650), highlights the discrepancies when the Reference Object can be used.
- [spec #649](https://github.com/asyncapi/spec/issues/649), tries to solve the core issue that `$ref` means two different things, depending on when it's used.
- [spec #655](https://github.com/asyncapi/spec/issues/655), what do you do when encountering `$schema` and Message Object `schemaFormat`, especially when they are contradicting.
- [parser-js #405](https://github.com/asyncapi/parser-js/issues/405), highlights that the parser accurately validates incorrect AsyncAPI documents, because it bundles references before validating.
- [parser-js #404](https://github.com/asyncapi/parser-js/issues/404), highlights that the parser allows for keywords to be defined together with `$ref` and are not being ignored.
- [parser-js #403](https://github.com/asyncapi/parser-js/issues/403), highlights that the parser does not care about `$id` in the Schema Object when it should.

> Photo by <a href="https://unsplash.com/@nxvision?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Nigel Tadyanehondo</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

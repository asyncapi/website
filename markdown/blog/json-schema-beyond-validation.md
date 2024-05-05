---
title: "Using JSON Schema Beyond Validation"
date: 2021-08-03T12:00:00+01:00
type: Engineering
tags:
  - Code Generation
  - JSON Schema
cover: /img/posts/json-schema-beyond-validation/halgatewood-com-QM9yzAoX-GQ-unsplash.webp
authors:
  - name: Jonas Lagoni
    photo: /img/avatars/jonaslagoni.webp
    link: https://github.com/jonaslagoni
    byline: AsyncAPI Maintainer
---

What is JSON Schema, why is it important and why is it so hard to use beyond validation? 

For those unfamiliar with Asyncapi [we use a superset of JSON Schema](https://www.asyncapi.com/docs/specifications/2.0.0#schemaObject) as the default format for defining operation payloads, headers, channel parameter schemas, etc.

Even though formats such as Avro, OpenAPI 3.x and Swagger 2.x, RAML schemas, etc, are allowed in its place, as soon as it hits the parser (which most tooling utilizes), said formats are converted to [JSON Schema draft 7](https://json-schema.org/specification-links.html#draft-7) to ensure a [common structure for tooling](https://github.com/asyncapi/parser-js/blob/826b36922260254ba23d162cda309fc72f552c49/lib/models/message.js#L20). 

However, in tooling, many times you do not want to validate data, but to represent the data in a structured manner so it is easier to interact with, such as classes that represent a message payload. How can you achieve this with validation rules?

## Quick intro to JSON Schema

Let's try and take a look at an example. Given the following, I have defined a schema representing the validation rules that the data should comply with. 

<figure>
  <img src="/img/posts/json-schema-beyond-validation/json-schema-process.webp" title="JSON Schema validation process" alt="Shows the overall JSON Schema validation process of how a JSON Schema and some data is validated against each other."/>
  <figcaption className="text-center text-gray-400 text-sm">Displays the overall process of validating data using JSON Schema.</figcaption>
</figure>

The JSON Schema defines that the JSON data should be an object, which requires a property called `someRequiredProperty` to always be present and an optional property called `someOptionalProperty`. `someRequiredProperty` should validate against an integer and `someOptionalProperty` against an arbitrary string. The schema also dictates that no additional properties (`"additionalProperties": false`) may be allowed. There is also some metadata defined, called `$id` and `$schema`, but they are not important for this example.

If we then take a look at the example data instances (below the JSON Schema in the figure), the first one contains the required property, and the second one has both the required and the optional property.

The data and the JSON Schema can then together, validate whether the data is an instance of the schema, i.e., validate if the data comply with the validation rules and give a simple true or false statement if they are compatible.

JSON Schema is an extremely powerful tool that allows you to create complex validation rules for data and is the standard specification used in not only AsyncAPI but also OpenAPI, however it has its challenges in tooling when used beyond validation.

## Challenges using JSON Schema for data definitions

Many of the JSON Schema keywords are for [JSON instance validation](https://datatracker.ietf.org/doc/html/draft-handrews-json-schema-validation-01), which means specifying validation rules that data should comply with. However, what if you wanted to know the definition of the data rather than what it should validate against? 

This is currently not something the JSON Schema specification provides to you, even though it is such an important part of tooling. First, let me show you how to interpret data definition from the above example for then to move into a more complex JSON Schema. 

Interpreting data definition from a JSON Schema is not always complex. For our previous example, I can almost interpret it as is. If I wanted a class in TypeScript that represented the data, it could look something like this (gonna use TS syntax as examples throughout). Notice how the `$id` keyword is used to define the naming of the class.

```ts
class SomeIdForSchema {
  public someRequiredProperty: number;
  public someOptionalProperty?: string;
}
```

In theory, I use the very same validation rules and interpret them, such that the output gives us the definition of what form the data may take. Sounds easy enough right? :sweat_smile:

The problem is that JSON Schema –which might seem simple on the surface— is complex underneath when you start to interpret the recursive keywords such as `not`, `if`, `then`, `else`, `allOf`, `oneOf`, etc. This causes the possibilities to be endless in terms of how the JSON Schema document can be structured (at least endless in principle).

Ideally, all keyword possibilities MUST be supported with no restrictions. So let's take a look at a more complex example, that introduces the `not` keyword. We aren't interested in why one would define something like this, but merely the possibility of doing so.

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "$id": "SomeIdForSchema",
  "additionalProperties": false,
  "properties": {
    "someOptionalProperty": {
      "type": ["string", "number"]
    } 
  },
  "not": {
    "properties": {
      "someOptionalProperty": {
        "type": "number"
      } 
    }
  }
}
```
**Take a moment and think about what data would you say is valid against this schema?**

In the very simplest form the JSON Schema could be converted to the following:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "$id": "SomeIdForSchema",
  "additionalProperties": false,
  "properties": {
    "someOptionalProperty": {
      "type": "string"
    } 
  }
}
```
Where the property `someOptionalProperty` may only be of type `string`. But, let's try and break the complex schema down step by step, to show how the validation would work against the data:
```json
{
  "someOptionalProperty": "string"
}
```
Notice how the `not` keyword reverses the validation result of step 5, which is why the inner schema is validated before the keyword itself.
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#", 
  "type": "object",               //Step 1 
  "$id": "SomeIdForSchema", 
  "additionalProperties": false,  //Step 2 
  "properties": { 
    "someOptionalProperty": {     //Step 3
      "type": ["string", "number"]//Step 4
    } 
  },
  "not": {                        //Step 6
    "properties": {
      "someOptionalProperty": { 
        "type": "number"          //Step 5
      } 
    }
  }
}
```

1. Step: accept, as the input is of type object.
2. Step: accept, as no additional properties have been defined.
3. Step: accept, as the property exists.
4. Step: accept, as the property is of type string.
5. Step: reject, as the property is of type string and not number.
6. Step: accept (negate step 5), as the validation of the inner schema is negated. 

With the `not` keyword it means that it is not only a matter of interpreting what form the data may take but also which it may not. If we had to represent a class for this Schema it would be the following:
```ts
class SomeIdForSchema {
  public someOptionalProperty?: string;
}
``` 
## The interpretation of JSON Schema

So, how can we create an algorithm that will enable us to consistently and accurately represent the underlying data model for the JSON data? How can this be standardized across all versions of JSON Schema (as we might not stay on Draft 7 forever)? 

Some of the alternatives to JSON Schema is specification such as [TypeSchema](https://typeschema.org/) or [JTD](https://datatracker.ietf.org/doc/html/rfc8927), that instead of focusing on validation, you focus on the definition of data models. Using these as the standard definition for payloads would indeed solve the problem in terms of data definitions in tooling. However, doing so neglect many important features of JSON Schema that simply cannot be done by defining the models, and we are left with the very same problem of transforming `JSON Schema -> TypeSchema` or `JSON Schema -> JTD`, which to some extent is the process we are trying to figure out.

In terms of the algorithm, it is highly work in progress :smiley: For [Modelina](https://github.com/asyncapi/modelina) we have our own process, but... It is something we are trying to solve collectively (as AsyncAPI is not the only one with this problem, [OAI, IBM](https://github.com/OAI/OpenAPI-Specification/issues/2542), etc) in the JSON Schema organization. 

Therefore I started a [discussion](https://github.com/json-schema-org/community/discussions/18) to trigger some initial thoughts on the subject and a [JSON Schema SIG](https://t.co/n20GalaIkI?amp=1) has been formed to tackle this problem.
<center>
<TwitterTweetEmbed
  tweetId='1420774687328583680' 
  options={{
    cards: 'hidden'
  }}
/>
</center>

This blog post is as much a call for help as it is to enlighten you about the problem of using JSON Schema beyond validation. If you want to help tackle this problem, test the process, review changes, or make some kick-ass documentation, just reach out, cause we want your help! 

> Photo by <a href="https://unsplash.com/@halacious?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">HalGatewood.com</a> on <a href="https://unsplash.com/s/photos/cable?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
  

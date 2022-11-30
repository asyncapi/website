---
title: "AsyncAPI Initiative Status Update (week 39, 2020)"
date: 2020-09-22T06:00:00+01:00
type: Communication
tags:
  - Project Status
cover: /img/posts/status-update-39/status-update-39-cover.webp
authors:
  - name: Lukasz Gornicki
    photo: /img/avatars/lpgornicki.webp
    link: https://twitter.com/derberq
    byline: AsyncAPI Maintainer and Community Guardian
---

## Circular References Supported in HTML and Markdown Templates

After recent efforts into circular references support in the AsyncAPI JavaScript Parser, now we started using these features in HTML and Markdown docs generators. With the latest releases of those two templates, you can generate documentation for schemas containing circular references. Below you can see an example specification file and how its payload and payload generated example looks like in generated HTML. You can also give it a try on your own in our [Playground](https://playground.asyncapi.io/). 

```asyncapi caption='AsyncAPI schema with a circular reference.'
asyncapi: 2.0.0
info:
  title: Example
  version: 0.1.1
channels:
  recursive:
    subscribe:
      message:
        payload:
          $ref: '#/components/schemas/Recursive'
components:
  schemas:
    Recursive:
      type: object
      properties:
        children:
          type: array
          items:
            $ref: '#/components/schemas/Recursive'
        something:
          type: string
```

<Row>
  <Column>
    <Figure
      src="/img/posts/status-update-39/pic2-circ-schema.webp"
      caption="Message payload presentation."
    />
  </Column>
  <Column>
    <Figure
      src="/img/posts/status-update-39/pic3-circ-example.webp"
      caption="Generated payload example."
    />
  </Column>
</Row>

## Generate HTML Docs into a Single File

Thanks to the contribution from [Gordeev Artem](https://github.com/GordeevArt), you can now generate HTML documentation into a single file. Like what?

To generate HTML documentation for AsyncAPI files, you can use our [HTML generator template](https://github.com/asyncapi/html-template). It generates an index.html file with correctly rendered content of the AsyncAPI file. In addition, it also references additional files necessary for nice display of the HTML, JavaScript, and CSS files. 

From time to time, the community asked that it would be nice if the template could generate only one index.html file with all the JavaScript and CSS inline inside the HTML file.

Now it is possible! There is a new parameter added to the template called singlePage. Just pass it for example, in the CLI like this -p singlePage=true.

## Parser with More Helpers and Better API docs

We released [Parser release candidate 5](https://github.com/asyncapi/parser-js/releases/tag/v1.0.0-rc.5) with features you want to have in a library before you announce the 1.0.0 release. Thanks to generous support from our community member [Maciej Urbanczyk](https://github.com/magicmatatjahu), this release candidate contains the following additions:

- Missing externalDocs field in AsyncAPIDocument model
- New functions to all models that need it: hasBindings, bindingProtocols, hasBinding(name), binding(name), extensionKeys, extKeys, hasExtension, hasExt, tagNames, tag, hasTag, hasDescription
- Much better API documentation. In the past, it was not only missing functions that were not available but also functions that were not documented because of the wrong usage of JSDocs. Now see on your own how significant is the change by looking just on the list of functions available for ChannelParameter model:


<Row>
  <Column>
    <Figure
      src="/img/posts/status-update-39/pic1-api-before.webp"
      caption="ChannelParameter Docs before release."
    />
  </Column>
  <Column>
    <Figure
      src="/img/posts/status-update-39/pic2-api-after.webp"
      caption="ChannelParameter Docs after release."
    />
  </Column>
</Row>      

## Hacktoberfest Preparation

[Hacktoberfest](https://hacktoberfest.digitalocean.com/) is a great event for people to start contributing to open source. It runs throughout October, and we want AsyncAPI Initiative to join the event. Why?

- Enable different communities to jump into the AsyncAPI projects with simple tasks, so they can get familiar with what we have, where to find things, and how easy it is to kick off with the first contribution
- Show to the community something that might not be so obvious, that the AsyncAPI Initiative is not only working on the specification but also a lot of great tools to make it easy to work with the specification 

If you are interested in how we plan to join the Hacktoberfest, look at our [plan](https://docs.google.com/document/d/1fljbYU-wD4gvusFpWqCrVQfPb4nitcKAKag1TOm5lNs/). 

## The Highlight of Interesting Discussions

### WAMP Protocol Bindings

There are community efforts to define bindings for [Web Application Messaging Protocol (WAMP)](https://wamp-proto.org/). In case you are experienced with the protocol, please join and support [here](https://github.com/asyncapi/asyncapi/issues/400).

### Go Code Generation 

There are community efforts to create a template for generating Go code using the AsyncAPI generator. The initial pull request is opened. You can help even if you are not familiar with AsyncAPI, as you can help with just the review of the generated code. Please join and support [here](https://github.com/asyncapi/go-template/pull/1/files).

## AsyncAPI Special Interest Group (SIG) open meeting

The last meeting took place on Tuesday, 15th of September, 4PM UTC. Meeting notes and recording are available [here](https://github.com/asyncapi/asyncapi/issues/435). 

The next meeting is scheduled for next [Tuesday, 29th of September, 8AM UTC](https://everytimezone.com/?t=5f727900,1e0). 

We work on the agenda for the next meeting [here](https://github.com/asyncapi/asyncapi/issues/443). At the moment, there is nothing in the agenda so you can sneak in your topic easily. 

We host the meeting on [Zoom](https://zoom.us/j/83140549308). Do not forget about future meetings and always have up to date invitations in your calendar by adding your email to [this](https://groups.google.com/forum/#!forum/asyncapi-users) mailing list.


> Cover photo by <a href="https://unsplash.com/@finleydesign?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Neil Thomas</a> on <a href="https://unsplash.com/s/photos/community-support?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a>

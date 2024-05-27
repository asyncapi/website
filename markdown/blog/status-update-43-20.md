---
title: "AsyncAPI Initiative Status Update (week 43, 2020)"
date: 2020-10-21T06:00:00+01:00
type: Communication
tags:
  - Project Status
cover: /img/posts/status-update-43/cover.webp
authors:
  - name: Lukasz Gornicki
    photo: /img/avatars/lpgornicki.webp
    link: https://twitter.com/derberq
    byline: AsyncAPI Maintainer and Community Guardian
---

## AsyncAPI JavaScript Parser 1.0.0 Is Out

I’m very proud to share that we are finally there, release 1.0.0 is out in the wild.

One month passed since the last release candidate, and no one reported any blockers for our first major release.

AsyncAPI JavaScript Parser is an official library that validates AsyncAPI documents and returns a set of functions that make it much easier to access the document's contents. It works well both in the browser and in Node.js. We've been using it for very long in our React component to parse in the browser and in the AsyncAPI Generator to parse documents in the Node.js server and CLI.

Please join us in the celebration. We do it in a typical asynchronous way. Everyone celebrates whenever they can...

<div className="text-center">
  <img src="https://media.giphy.com/media/Vj97qNut6WDHa/giphy.gif" />
</div>

## HTML Template Improvements

Hacktoberfest contributions brought many improvements and bug fixes. Two weeks ago, during the last status update, the HTML template version was 0.12.2, and now it is 0.15.0.

### PDF Generation

The template supports now an additional parameter called **pdf**. You use it to get an additional PDF file generated, next to the index.html file. In the CLI, pass `-p pdf=true` to get it. Thank you [Talmiz Ahmed](https://github.com/HashTalmiz).

### Change Default Name of HTML File

The template now supports an additional parameter called **outFilename**. You use it to change the default index.html file to something different, like for example, asyncapi.html. In the CLI, pass `-p outFilename=asyncapi.html` to get it. Thank you [Mitchell Sawatzky](https://github.com/bufutda). 

### Display of Schema UID

Due to suggestions from different community members, we now display the UID of the schema. UID is displayed only if it is provided. An anonymous UID assigned by the AsyncAPI Parser to schemas without UID is not shown.

Notice how it is displayed in the below example, next to the first two **mixedTypeArray** property schemas.

<img className="w-3/4" src="/img/posts/status-update-43/display-schema-uid.webp" />

## Java Spring Template Improvements

Our great contributor [Semen Tenischev](https://github.com/Tenischev) came back and kicked off the work on the Java template. Most important is a new feature to support _anyOf_ and _oneOf_. There are also bug fixes for enums generation and how schemas without UID are handled. The current version is 0.20.1. 

## Hacktoberfest Status

For us, the Hacktoberfest celebration has been a great success so far. The first day of the event started with two spam pull requests, but then...well, see for yourself:
- We had 24 contributors
- We merged 58 pull requests!

Only around 20 issues left on our [list](https://docs.google.com/spreadsheets/d/1vX4J395apexutfQ0OSqPNltFKDacmemHZwCmOXwHNLo/). Hurry up and become our star!

## Generator Release Candidate 13

We released [another](https://github.com/asyncapi/generator/releases/tag/v1.0.0-rc.13) release candidate with several security fixes. Important to notice in this RC is that we changed the way we build the docker image. Now it doesn’t contain the generator's sources but we install Generator CLI as a global application. This means the entrypoint is not “node ./cli.js” but “ag”, just like you would use it without Docker. Also, keep in mind that this release candidate now uses the official major release of the JavaScript Parser.

## AsyncAPI Special Interest Group (SIG) open meeting

The last meeting took place on Tuesday, 13th of October, 4PM UTC. Meeting notes and recording are available [here](https://github.com/asyncapi/asyncapi/issues/451).

The next meeting is scheduled for next [Tuesday, 27th of October 8AM UTC](https://everytimezone.com/s/577ca99f). 

We work on the agenda for the next meeting [here](https://github.com/asyncapi/asyncapi/issues/455). At the moment, there is nothing on the agenda so you can easily sneak your topic in. 

We host the meeting on [Zoom](https://zoom.us/j/83140549308). Do not forget about future meetings and always have up to date invitations in your calendar by adding your email to [this](https://groups.google.com/forum/#!forum/asyncapi-users) mailing list.

> Cover photo by <a href="https://unsplash.com/@spacex?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">SpaceX</a> on <a href="https://unsplash.com/s/photos/rocket-launch?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a>

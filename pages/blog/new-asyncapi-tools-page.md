---
title: "New Tools page for AsyncAPI"
date: 2022-11-27T06:00:00+01:00
type: Communication
tags:
  - Automation
  - JSON Schema
cover: /img/posts/new-asyncapi-tools-page/cover.webp
authors:
  - name: Akshat Nema
    photo: /img/avatars/akshatnema.webp
    link: https://twitter.com/AksNema
    byline: AsyncAPI Maintainer and Dev Akshat Nema
excerpt: "We haven't come up with some exciting features in AsyncAPI in recent, but now we come up with something new and special"
---

We already know that the present list of tools used inside AsyncAPI is presented on [AsyncAPI Tools Overview](/docs/tools) and it is manually maintained inside the Github repository. All the tools are sorted according to the different categories in which they are used and maintained by the contributors. But we don't have, how to filter the tools according to our interest 🤔, like languages, technolgies used in it, open source tools, etc. Also, what if you want to add your tool in the list, what you will do 🤔? Will make a PR? 

What if I say, you don't need to make a mess of PR now 😉. Yepp, we introduce you with something new to add tools in our website. For this, stay tuned in the blog 👇.

We have introduced a new concept of `.asyncapi-tool` file which describes the type and details of a tool related to AsyncAPI. This file will follow certain schema and fields to describe your tool appropriately according to the needs of a user and it will then automatically being added to our website within a week. But the question comes, where this file will exist? inside AsyncAPI repositories? Definitely not!. Here comes the twist, this file will be created and maintained in your Tool's repository, and it won't ask for our approval. This file will follow certain schema which you have to follow to successfully and appropriately add your tool to our brand new [Tools Dashboard](/tools). The proper schema of the file is described here
---
title: 'New Tools Dashboard for AsyncAPI'
date: 2023-01-30T06:00:00+01:00
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
featured: true
---

We already know that the present list of tools used inside AsyncAPI is presented on [AsyncAPI Tools Overview](/docs/tools) and it is manually maintained inside the Github repository. All the tools are sorted according to the different categories in which they are used and maintained by the contributors. But we don't have, how to filter the tools according to our interest 🤔, like languages, technolgies used in it, open source tools, etc. Also, what if you want to add your tool in the list, what you will do 🤔? Will make a PR?

What if I say, you don't need to make a mess of PR now 😉. Yepp, we introduce you with something new to add tools in our website. For this, stay tuned in the blog 👇.

# AsyncAPI Tool File

We have introduced a new concept of `.asyncapi-tool` file which describes the type and details of a tool related to AsyncAPI. This file will follow certain schema and fields to describe your tool appropriately according to the needs of a user and it will then automatically being added to our website within a week. But the question comes, where this file will exist? inside AsyncAPI repositories? Definitely not!. Here comes the twist, this file will be created and maintained in your Tool's repository, and it won't ask for our approval. This file will follow certain schema which you have to follow to successfully and appropriately add your tool to our brand new [Tools Dashboard](/tools). The proper schema of the file is described [here](https://github.com/asyncapi/website/blob/master/scripts/tools/tools-schema.json). You can use the tools like [Online JSON Validator](https://www.liquid-technologies.com/online-json-schema-validator) to validate your JSON data for Tool against the schema given above. For more detailed explanation, you can refer to our [official documentation](https://github.com/asyncapi/community/blob/master/new-tool-documentation.md) of `.asyncapi-tool` file. 

## Tool File Structure

Here's the sample `.asyncapi-tool` file structure, which can be used to structurise your tool configuration.

```JSON
{
  "title": "ZenWave Code Generator",
  "description": "DDD and API-First for Event-Driven Microservices",
  "links": {
    "websiteUrl": "https://zenwave360.github.io/",
    "docsUrl": "https://zenwave360.github.io/zenwave-code-generator/plugins/asyncapi-spring-cloud-streams3/",
    "repoUrl": "https://github.com/zenwave360/zenwave-code-generator"
  },
  "filters": {
    "language": "Java",
    "technology": [
      "Maven",
      "Spring Cloud Streams"
    ],
    "categories": [
      "code-generator",
      "dsl",
      "mocking-and-testing",
      "cli"
    ],
    "hasCommercial": false
  }
}
```

This file structure should be used to insert your tool in website. The fields specified above are explained below:

- **`title`** - Specifies the title or name of the Tool. Remember this name will be used as official name of your tool in website.
- **`description`** - Specifies the description of the tool you want to add. Make sure it should be precise, upto 30 words only.
- **`links`** - Object which contains important links related to the tool.
  - **`websiteUrl`** - This is an optional field which specifies URL of the website of the tool.
  - **`docsUrl`** - This is an optional field which specifies URL of the documentation of the tool.
  - **`repoUrl`** - This is an optional field which specifies URL of the Github repository of the tool.
- **`filters`** - Object which contains various fields like language, technologies, categories to provide information about the tool.
  - **`language`** - Specifies primary Language in which the tool has been created. There are predefined languages listed in our documentation which are available right now and will be expanded to add new languages if needed.
  - **`technology`** - Specifies the list of technologies which are used to create the tool. There are predefined technologies listed in our documentation which are available right now and will be expanded to add new languages if needed.
  - **`categories`** - Specifies the list of categories which defines the type of tool. There are predefined categories listed in our documentation which can be used to list down your tool under proper category.
  - **`hasCommercial`** - Specifies whether the tool is a commercial product or is open source.

The predefined list of technologies can be found in our repository and are listed as:

- [Languages and Technologies](https://github.com/asyncapi/website/blob/master/scripts/tools/tags-color.js)
- [Categories](https://github.com/asyncapi/website/blob/master/scripts/tools/categorylist.js)

# AsyncAPI Tools Dashboard

Ohh! wait a minute, have I told you about new Tools Dashboard? Then, let me present you with brand new and astonishing AsyncAPI Tools Dashboard, which has list of Tools presented in the form of cards. Do checkout that out right now - [AsyncAPI Tools Dashboard](/tools). Preview of the UI is as follows:

![Dashboard UI](/img/posts/new-asyncapi-tools-page/dashboard-preview.webp)

The Dashboard consists of various features like the overall information about the tools inside ToolCard, filters to sort out the tools according to your needs, and search for tools specific to its name and type.

## Tool Card

Taking the Tools Card under consideration, you have following sections to detail about a Tool:

![Tools Card](/img/posts/new-asyncapi-tools-page/tool-preview.webp)

<ol>
  <li> Specifies the Name of the Tool.</li>
  <li> Specifies whether the Tool is Free to use or requires commercial access to use it.</li>
  <li> Specifies the Description of the Tool. Clicking on the `Show More` button will open a small box to show full description of the Tool.</li>
  <li> Specifies the Primary Language of the Tool in which it is built.</li>
  <li> Specifies the list of Technologies used to create the Tool.</li>
  <li> <b>View on Github</b> Button that directs the user to the Github repository of the Tool.</li>
  <li> <b>Visit Website</b> Button that directs the user to the official website of the Tool.</li>
  <li> <b>Visit Docs</b> Button that directs the user to the official Docs of the Tool.</li>
</ol>

## Filters for Tools

The Dashboard also contain various filters to search for a specific Tool according to your needs. You can now search according to the Name, Languages, Technologies, Categories, etc.. as provided in respective dropdowns and radio buttons. Filters are mostly divided in 2 sections - Filter Menu and Search bar. The use of each menu is explained below under respective subheadings.

![Filters Preview](/img/posts/new-asyncapi-tools-page/filters.webp)

### Filter Menu

Taking the Tools Filter Menu under consideration, you have following filters to search a Tool:

![Filter Menu](/img/posts/new-asyncapi-tools-page/filter-menu.webp)

<ol>
  <li> This radio filter button allows to search for either free tools available on internet or Github, or search for the Paid Tools.</li>
  <li> The slider filter button allows to search for the tools owned or maintained by AsyncAPI organization. </li>
  <li> The <b>Language Filter</b> allows you to select the languages from the dropdown on which you want to search for Tools. </li>
  <li> The <b>Technology Filter</b> allows you to select the technologies from the dropdown on which you want to search for Tools. </li>
  <li> The <b>Clear Filters</b> button allows you to clear all filters inside the Filters Modal and will show you all the tools of selected categories (or all categories).</li>
</ol>

Do remember to click on `Apply Filter` Button before closing the `Filters` Modal so that filters will be applied on the Dashboard.

### Search Bar

The Search Bar will allow you to search the tools on the basis of their names.

## Summary

This project is under my Mentorship program 2022 and was mentored by [Lukasz Gornicki](https://github.com/derberg) and [Maciej Urbańczyk](https://github.com/magicmatatjahu). It was an amazing experience to work in this project and create such an automation for AsyncAPI tools. Quite a good learning experience as I researched about GitHub APIs, JSON Schema, GitHub Actions and lot more stuff. Moreover, I became the maintainer of AsyncAPI website repository and started contributing to organization in lot many ways. My work in the project consists of following Pull Requests: 

- [feat: tools backend implementation](https://github.com/asyncapi/website/pull/939)
- [feat: added new /tools page](https://github.com/asyncapi/website/pull/940)
- [feat: manual tools added to the Tools Dashboard](https://github.com/asyncapi/website/pull/1191)

You are welcomed to review my work in the program and I will love to get your feedbacks on this. You can contact me via [mail](mailto:akshatnema.official@gmail.com) or using DMs in [AsyncAPI Slack](https://asyncapi.com/slack-invite). Thanks to AsyncAPI and their community members for proividing me with this opportunity and I'll be looking for more such activities to contribute to the organization. Also, we are close to announce the next AsyncAPI Mentorship Program in year 2023 so stay tuned with us on [Slack](https://asyncapi.com/slack-invite).

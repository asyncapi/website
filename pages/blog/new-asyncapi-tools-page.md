---
title: "New Tools Dashboard for AsyncAPI"
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
featured: true
---

We already know that the present list of tools used inside AsyncAPI is presented on [AsyncAPI Tools Overview](/docs/tools) and it is manually maintained inside the Github repository. All the tools are sorted according to the different categories in which they are used and maintained by the contributors. But we don't have, how to filter the tools according to our interest 🤔, like languages, technolgies used in it, open source tools, etc. Also, what if you want to add your tool in the list, what you will do 🤔? Will make a PR? 

What if I say, you don't need to make a mess of PR now 😉. Yepp, we introduce you with something new to add tools in our website. For this, stay tuned in the blog 👇.

# AsyncAPI Tool File

We have introduced a new concept of `.asyncapi-tool` file which describes the type and details of a tool related to AsyncAPI. This file will follow certain schema and fields to describe your tool appropriately according to the needs of a user and it will then automatically being added to our website within a week. But the question comes, where this file will exist? inside AsyncAPI repositories? Definitely not!. Here comes the twist, this file will be created and maintained in your Tool's repository, and it won't ask for our approval. This file will follow certain schema which you have to follow to successfully and appropriately add your tool to our brand new [Tools Dashboard](/tools). The proper schema of the file is described [here](https://github.com/asyncapi/website/blob/master/scripts/tools/tools-schema.json). You can use the tools like [Online JSON Validator](https://www.liquid-technologies.com/online-json-schema-validator) to validate your JSON data for Tool against the schema given above.

## Tool File Structure

Here's the sample `.asyncapi-tool` file structure, which can be used to structurise your tool configuration.

```JSON
{
    "title": "Sample Tool",
    "description": "Tool for testing", 
    "links": {
      "websiteUrl": "https://akshatnema.netlify.app", 
      "docsUrl": ""
    },
    "filters": {
      "language": "javascript",
      "technology": ["react"],
      "categories": ["code generator"], 
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
- **`filters`** - Object which contains various fields like language, technologies, categories to provide information about the tool.
  - **`language`** - Specifies primary Language in which the tool has been created. There are predefined languages listed in our documentation which are available right now and will be expanded to add new languages if needed.
  - **`technology`** - Specifies the list of technologies which are used to create the tool. There are predefined technologies listed in our documentation which are available right now and will be expanded to add new languages if needed.
  - **`categories`** - Specifies the list of categories which defines the type of tool. There are predefined categories listed in our documentation which can be used to list down your tool under proper category.
  - **`hasCommercial`** - Specifies whether the tool is a commercial product or is open source.

The predefined list of technologies can be found in our repository and are listed as:
 - [Languages and Technologies](https://github.com/asyncapi/website/blob/master/scripts/tools/tags-color.js)
 - [Categories](https://github.com/asyncapi/website/blob/master/scripts/tools/categorylist.js)

## JSON Tool Structure
---
title: Add new AsyncAPI tool to website
description: Learn how to add your tool to the AsyncAPI website using the .asyncapi-tool file.
weight: 20
---

## Introduction

Learn how to add your tool to the AsyncAPI website using the `.asyncapi-tool` file. Make sure to structure your `.asyncapi-tool` file correctly to render your tool on the AsyncAPI website with customized tags and information for users to filter tools according to different categories.

> The entire AsyncAPI Tools list is under the [AsyncAPI Tools Dashboard](https://www.asyncapi.com/tools) page.

## AsyncAPI tool file

The [`.asyncapi-tool` file](https://github.com/asyncapi/website/blob/master/scripts/tools/tools-schema.json) requires a specific schema to describe the type and details of your AsyncAPI tool; this file automatically adds your tool to our website's [Tools Dashboard](https://www.asyncapi.com/tools) within a week. Every Monday, we run our workflow to add new tools or update existing tools in our website and thus, notifies us regarding the wrong format of the file used somewhere in Github using Slack notifications. You can even ask the maintainers to manually trigger workflow by [Creating a Github issue](https://github.com/asyncapi/website/issues/new/choose) or contact us via [AsyncAPI Slack](https://asyncapi.com/slack-invite).

You must create and maintain your `.asyncapi-tool` file in your tool's repository, as it doesn't require AsyncAPI approval. There is no restriction on the directory in which the file has to be created. In case, you need to create 2 or more `.asyncapi-tool` files in same repository, you can do the same, just make sure you provide correct `repoUrl` for each of them. Same case applies for monorepo as well.

## Tool file structure

Let's look at a sample `.asyncapi-tool` file in `JSON` and `YAML` structures. You'll use these file structures to insert your tool into the website's [Tools Dashboard](https://www.asyncapi.com/tools).

### JSON format file structure

```JSON
{
  "title": "Sample Tool",
  "description": "Tool for testing purposes in AsyncAPI",
  "links": {
    "websiteUrl": "https://akshatnema.netlify.app",
    "docsUrl": "https://akshatnema.vercel.app",
    "repoUrl": "https://github.com/akshatnema/Login-Registration-project/"
  },
  "filters": {
    "language": "javascript",
    "technology": ["react"],
    "categories": ["code-generator"],
    "hasCommercial": true
  }
}
```

### YAML format file structure

```YAML
---
title: Sample Tool
description: Tool for testing
links:
  websiteUrl: https://akshatnema.netlify.app
  docsUrl: https://akshatnema.vercel.app
  repoUrl: https://github.com/akshatnema/Login-Registration-project/
filters:
  language: javascript
  technology:
  - react
  categories:
  - code-generator
  hasCommercial: true
```

Let's break down each field of an `.asyncapi-tool` file:

|  Field Name 	| Type |  Description 	|  Required 	|
|:---:| :---: |---	|:---:	|
|  `title` 	| String |   Specifies the title or name of the tool; the official name of your tool on the website.  |  Yes 	|
|   `description`	| String |  Specifies the tool's description. * denotes that this field can be left blank/skipped if you wish to display Github repository description in the Tool Card	|  No* 	|
|   `links`	| Object |   Object which contains important links related to the tool.	|  No 	|
|  `links.websiteUrl` 	| String |  This is an optional field specifying the tool's website URL. 	|  No 	|
|  `links.docsUrl`	| String |  This is an optional field specifying the tool's documentation URL. 	|  No	|
|  `links.repoUrl`	| String |  This is an optional field specifying the tool's repository URL. By default, the URL matches the repo where .asyncapi-tool file is located. You can override default behaviour in cases when you have multiple .asyncapi-tool files in your repository.	|  No*	|
|  `filters` 	| Object |  Object which contains various fields like language, technologies, and categories to provide information about the tool. 	|  Yes 	|
|  `filters.language` 	| String | Specifies the primary language in which you created the tool. Our documentation lists [predefined languages](https://github.com/asyncapi/website/blob/master/scripts/tools/tags-color.ts), and you can expand this list to add new languages according to your need. To add a new language, you have to create a [new issue on GitHub repository](https://github.com/asyncapi/website/issues/new/choose) specifying the language you want to add. 	|  No	|
|  `filters.technology` 	| Array of strings | Specifies the technologies used to create the tool. Our documentation lists [predefined technologies](https://github.com/asyncapi/website/blob/master/scripts/tools/tags-color.ts), and you can expand this list to add new technologies according to your need. To add a new technology, you have to create a [new issue on GitHub repository](https://github.com/asyncapi/website/issues/new/choose) specifying the technology you want to add. 	|  Yes 	|
|  `filters.categories` 	| Array of strings |  Specifies the list of categories that defines the type of tool. There are [predefined categories](https://github.com/asyncapi/website/blob/master/scripts/tools/categorylist.ts) in our documentation that you can use to list your tool under the proper category. If your tool doesn't matches with any categories specified in list, you can choose `others` option to list your tool.  	|  Yes 	|
|  `filters.hasCommercial` 	| Boolean |  Specifies whether the tool is a commercial product or open source. 	|  No (`false` by default) 	|

You can also follow a simple example of `.asyncapi-tool` file to render the tool in website. This is example of [AsyncAPI Bundler](https://github.com/asyncapi/bundler). `.asyncapi-tool` file in YAML format:

```YAML
title: AsyncAPI Bundler
filters:
    languages:
        - TypeScript
    technology:
        - TypeScript
    categories:
        - bundler
```

## Manual addition of tools

If you don't want to create the `.asyncapi-tool` file in your repository or your tool's codebase doesn't exist in Github, the [AsyncAPI website repository](https://github.com/asyncapi/website) contains a [`tools-manual.json`](https://github.com/asyncapi/website/blob/master/config/tools-manual.json) file that adds your tool to our website's [Tools Dashboard](/tools).

Inside this [`tools-manual.json`](https://github.com/asyncapi/website/blob/master/config/tools-manual.json) file, you must choose the desired category for your tool and add your tool as an **element** inside that particular category **object**.

## JSON tool structure

Once you've created your `.asyncapi-tool` file, check your tool configuration inside our database on the [tools-automated.json](https://github.com/asyncapi/website/blob/master/config/tools-automated.json) file.

Here's what a sample JSON object for an AsyncAPI tool should look like after it is added to the final [tools.json](https://github.com/asyncapi/website/blob/master/config/tools.json) that keeps the information about all tools added manually and through `.asyncapi-tool` file:

```JSON
{
  "title": "Sample Tool",
  "description": "Tool for testing",
  "links": {
    "websiteUrl": "https://akshatnema.netlify.app",
    "docsUrl": "",
    "repoUrl": "https://github.com/akshatnema/Login-Registration-project"
  },
  "filters": {
    "language": "javascript",
    "technology": ["react"],
    "categories": ["code-generator"],
    "hasCommercial": false,
    "isAsyncAPIOwner": false
  }
}
```

> If your tool's information isn't showing up correctly in this file, please [create a new AsyncAPI GitHub issue](https://github.com/asyncapi/website/issues/new/choose) or contact us via [AsyncAPI Slack](https://asyncapi.com/slack-invite).

## Adding New Category

The category list is available in the [`categorylist.ts` file](https://github.com/asyncapi/website/blob/master/scripts/tools/categorylist.ts) from where you can opt the best category for your tools. Moreoever, if you don't find any, you can send us a request to add a new category that goes best with your requirements.

You can also create a [Pull Request](https://github.com/asyncapi/website/pulls) by adding a new category object in the `categorylist.ts` file providing all the details/information about the new category, as follows:

```js
{
  name: "Sample category name",
  tag: "sample-tag",
  description: "Description providing some information about the category and other nitty-gritty things about the category."
}
```

Also, add the new category details in the [`tools-manual.json` file](https://github.com/asyncapi/website/blob/master/config/tools-manual.json) with proper json schema, as well.

```JSON
  "Sample category name": {
    "description": "Description that provides some information about the category and other nitty-gritty things about the category.",
    "toolsList": []
  }
```

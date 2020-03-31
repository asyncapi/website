---
title: "GitHub Actions for AsyncAPI aka Automate your workflows related to AsyncAPI documents"
date: 2020-03-31T06:00:00+01:00
type: blog
featured: true
tags:
  - GitHubActions
  - Validation
  - Generator
  - Automation
cover: /images/posts/asyncapi-github-action.png
weight: 100
authors:
  - name: Lukasz Gornicki
    photo: /images/avatars/lpgornicki.png
    link: https://twitter.com/derberq
    byline: AsyncAPI Maintainer and Dev Comm Keeper
---

> tl;dr
AsyncAPI community got rich with two GitHub Actions that you can use for [validation](https://github.com/marketplace/actions/asyncapi-github-action) and [generation](https://github.com/marketplace/actions/generator-for-asyncapi-documents).

There is no better reason to work on a solution if there is a bag of swags waiting for you. GitHub organized a [hackathon for GitHub Actions](https://githubhackathon.com/#hackathon), and it was the best moment to write a GitHub Action that can help AsyncAPI community.

Two AsyncAPI related actions we crafterd in March are:
- Our community member, [Waleed Ashraf](https://twitter.com/WaleedAshraf01/) created [an action](https://github.com/marketplace/actions/asyncapi-github-action) to validate AsyncAPI documents with our [parser](https://github.com/asyncapi/parser-js/)
- We also created [official AsyncAPI action](https://github.com/marketplace/actions/generator-for-asyncapi-documents) for our [generator](https://github.com/asyncapi/generator/).

## Writing a GitHub Action

Our actions are both written in JavaScript. The other way of writing action is to do a Docker container action. The best way to start writing your action is to:

1. Follow [this](https://help.github.com/en/actions/building-actions/creating-a-javascript-action) tutorial to create a simple action to understand it's components.
1. Get familiar with [official toolkit](https://github.com/actions/toolkit) that you can use to simplify writing an action. 
1. Create your custom action with [this](https://github.com/actions/javascript-action) template that has many things plugged in already, like eslint, testing, and most important, distro generation, so you do not have to commit `node_modules` directory to your repository.

These are all the resources I used to write my first action, and to master it, I only had to read official docs, like reference docs for `action.yml` file. Well done GitHub!

## What I can do today with AsyncAPI GitHub Actions

Those two actions can help you a lot already, together or separately. I present in this post only two possible workflows, and you can take it from here and think about your ideas.

### Validation of AsyncAPI files in a Pull Request

You can make sure that whenever someone makes a Pull Request to propose a change in the AsyncAPI document, you can validate it automatically using [Waleed's](https://twitter.com/WaleedAshraf01/) action `WaleedAshraf/asyncapi-github-action@v0.0.3`.

You only need to make sure the action reacts to `pull_request` events that make sense for you. For the sake of this example, all possible events are mentioned, depending on your setup, some might not be necessary.

```yaml
name: Validate AsyncAPI document

on:
  pull_request:
    types:
      - labeled
      - unlabeled
      - synchronize
      - opened
      - edited
      - ready_for_review
      - reopened
      - unlocked
  pull_request_review:
    types:
      - submitted
  check_suite: 
    types:
      - completed
  status: {}
  
jobs:
  validation:
    runs-on: ubuntu-latest
    - name: asyncapi-github-action
      uses: WaleedAshraf/asyncapi-github-action@v0.0.3
      with:
        filepath: 'my-directory/asyncapi.yaml'
```

### Generating HTML and publishing it to GitHub Pages

One of the AsyncAPI use cases is to document your application with it and generated docs out of it, best in HTML. The typical workflow here would be to have a GitHub Action workflow that your trigger on every push to the `master` branch. 

```yaml
name: AsyncAPI documentation publishing

on:
  push:
    branches: [ master ]
```

To generate HTML from your AsyncAPI documentation, you need to use `asyncapi/github-action-for-generator@v0.2.0` action. You also need to specify a few more things:
- The template you want to use for generation. In this example, you can see official [AsyncAPI HTML Template](https://github.com/asyncapi/html-template). You can also write your custom template, and hosting it on npm is not mandatory.
- Filepath to the AsyncAPI document in case it is not in the root of the working directory, and not called `asyncapi.yml`
- The template specific parameters. The crucial part here is the `baseHref` parameter. When enabling [GitHub Pages](https://pages.github.com/) for regular repository, the URL of the website is `https://{GITHUB_PROFILE}.github.io/{REPO_NAME}/`. Specifying `baseHref` parameter helps the browser to properly resolve URL to relative links to additional resources like CSS or JS files. You do not have to hardcode the name of the repo in workflow configuration. Your workflow has access to information about the repository it is running in. You could do this: `${baseHref=/{github.repository}}/`
- The output directory where the generator creates files. You might access those files in other steps of the workflow. 

```yaml
- name: Generating HTML from my AsyncAPI document
  uses: asyncapi/github-action-for-generator@v0.2.0
  with:
    template: '@asyncapi/html-template@0.3.0'  #In case of template from npm, because of @ it must be in quotes
    filepath: docs/api/my-asyncapi.yml
    parameters: baseHref=/test-experiment/ sidebarOrganization=byTags #space separated list of key/values
    output: generated-html
```

Now you have a trigger, and you can generate a website. The next step is to publish a website to GitHub Pages. For this, you can use one of the actions created by the community, like `JamesIves/github-pages-deploy-action@3.4.2`. You can also use other hosting solutions than GitHub Pages, like, for example, Netlify and [one of their actions](https://github.com/netlify/actions/tree/master/cli).

```yaml
- name: Deploy GH page
  uses: JamesIves/github-pages-deploy-action@3.4.2
  with:
    ACCESS_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    BRANCH: gh-pages
    FOLDER: generated-html
```

Here is how a full workflow, with embedded validation, could look like:

```yaml
name: AsyncAPI documentation publishing

on:
  push:
    branches: [ master ]

jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
    #"standard step" where repo needs to be checked-out first
    - name: Checkout repo
      uses: actions/checkout@v2
      
    #Using another action for AsyncAPI for validation
    - name: Validating AsyncAPI document
      uses: WaleedAshraf/asyncapi-github-action@v0.0.3
      with:
        filepath: docs/api/my-asyncapi.yml
      
    #In case you do not want to use defaults, you, for example, want to use a different template
    - name: Generating HTML from my AsyncAPI document
      uses: asyncapi/github-action-for-generator@v0.2.0
      with:
        template: '@asyncapi/html-template@0.3.0'  #In case of template from npm, because of @ it must be in quotes
        filepath: docs/api/my-asyncapi.yml
        parameters: baseHref=/test-experiment/ sidebarOrganization=byTags #space separated list of key/values
        output: generated-html
      
    #Using another action that takes generated HTML and pushes it to GH Pages
    - name: Deploy GH page
      uses: JamesIves/github-pages-deploy-action@3.4.2
      with:
        ACCESS_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        BRANCH: gh-pages
        FOLDER: generated-html
```

## Conclusion

First of all, huge thank you to [Waleed Ashraf](https://twitter.com/WaleedAshraf01/) for creating an action to validate AsyncAPI documents.

Please try out the above-described actions and let us know what you think. Feel free to leave an issue to suggest improvements or ideas for other actions. 

In case you are interested with other GitHub Actions related posts you might have a look at:

- [Full automation of release to NPM and Docker Hub with GitHub Actions and Conventional Commits](/blog/automated-releases/)
- [Full automation of release with GitHub Actions and Conventional Commits for non-JS projects - part 2](/blog/automated-releases-part-two/)
- [GitHub Actions - When Fascination Turns Into Disappointment](https://dev.to/derberg/github-actions-when-fascination-turns-into-disappointment-4d75)
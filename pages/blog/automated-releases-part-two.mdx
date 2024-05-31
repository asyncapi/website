---
title: "(Part 2) Full automation of release with GitHub Actions and Conventional Commits for non-JS projects"
date: 2020-04-14T06:00:00+01:00
type: Engineering
tags:
  - GitHub Actions
  - Release
cover: /img/posts/robot2.webp
authors:
  - name: Lukasz Gornicki
    photo: /img/avatars/lpgornicki.webp
    link: https://twitter.com/derberq
    byline: AsyncAPI Maintainer and Dev Comm Keeper
excerpt: This post and the previous one come from our experience we gained when working on full automation for all tools maintained by AsyncaPI Initiative.
---

> tl;dr
[Here](/blog/automated-releases/) you can find the first blog post about automated releasing. The purpose of this blog post is to show how you can do the same automation in non-JavaScript projects. Even if JavaScript community created tooling, you can still use it in other projects and don't freak out.

This post and the [previous one](/blog/automated-releases/) come from our experience we gained when working on full automation for all tools maintained by [AsyncaPI Initiative](https://github.com/asyncapi/asyncapi/).

> [AsyncAPI](https://github.com/asyncapi/asyncapi/) is a specification that you use to create machine-readable definitions of your event-driven APIs. 

The previous post focused on JavaScript as the first library that we automated was our [generator](https://github.com/asyncapi/generator/). It covered publishing to NPM and usage of the JavaScript community ecosystem. Now we have automation rolled out to all our libraries, Go-written too.

## What I need to automate release?

To automate a release efficiently, you need two things:

- Machine-readable information that allows you to identify if a given commit should trigger a release or not.
- Tooling that you can easily plug in and configure without the need to write everything from scratch.

This automation is possible thanks to the following:

- The [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification. The purpose of Conventional Commits is to make commits machine-readable but also human-readable. It defines a set of commit prefixes that can be easily parsed and analyzed by tooling and looks good to the human eye too.
- The [Semantic Release](https://github.com/semantic-release/semantic-release) package and related plugins that support Conventional Commits and publishing to different channels like GitHub, NPM, Slack, and others.

## Where's the catch?

This blog post is about the automation of releases for non-JavaScript projects. Let me be honest though, solutions I mentioned in the previous chapter come from the JavaScript community.

The problem is, there are people who [Hate JavaScript](https://www.reddit.com/r/javascript/comments/9pwzpn/why_do_people_hate_javascript/), they truly [hate it](https://www.quora.com/Why-is-JavaScript-so-hated) like it is a living thing. Although, I'm personally proud to be an idiot that has a programming language that I can use.

Conventional Commits specification is heavily inspired by [Angular Commit Guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#commit-message-format). The Semantic Release package and its plugins ecosystem are all Node.js packages.

![](https://media.giphy.com/media/10FHR5A4cXqVrO/giphy.gif)

If you have Java or Go project, you can still use these tools. You do not have to keep `package.json` in your repository, so don't worry, you can keep your repository clean. The great folks from Semantic Release thought about you too.

![](https://media.giphy.com/media/QynGWwS6GdOMj6cvmz/giphy-downsized.gif)

## Using Semantic Release with GitHub Action in Go project

One of the projects where we use this JavaScript tools is our parser for AsyncAPI documents. It is a [Go parser](https://github.com/asyncapi/parser-go).

### Semantic Release configuration

The Semantic Release package supports configuration files in different formats and file types. You are not bound to `package.json`. We chose to use `.releaserc` file in YAML format but there are [other options](https://github.com/semantic-release/semantic-release/blob/master/docs/usage/configuration.md#configuration-file) too.

```yaml
---
branches:
- master
plugins:
- - "@semantic-release/commit-analyzer"
  - preset: conventionalcommits
- - "@semantic-release/release-notes-generator"
  - preset: conventionalcommits
- - "@semantic-release/github"
  - assets:
    - path: asyncapi-parser.darwin.amd64
      label: Binary - Darwin AMD64
    - path: asyncapi-parser.linux.amd64
      label: Binary - Linux AMD64
    - path: asyncapi-parser.windows.amd64.exe
      label: Binary - Windows AMD64
```

Our configuration uses plugins to:
- Analyze Git commits with Conventional Commits specification.
- Create a Git tag and generate changelog for release notes.
- Publish a release with additional assets. We compile our parser as binaries that are compatible with many platforms and we want to have them easily accessible with each release.

We place the configuration under `.github/workflows/`, next to our GitHub Action release workflow file: `release.yml`. It indicates that it is for release only, nothing else.

### Release workflow

Let us have a look at the differences between this workflow and the workflow I described for a typical JavaScript project [here](/blog/automated-releases/).

First, you define a `test` job with the Go environment to trigger tests with different versions of Go.

```yaml
test:
  name: 'Testing'
  runs-on: ubuntu-latest
  strategy:
    matrix:
      go: 
        - '1.14'
        - '1.13'
        - '1.12' 
  steps:
    - name: Checkout repo
      uses: actions/checkout@v2
    - name: Setup Go
      uses: actions/setup-go@v1.1.2
      with:
        go-version: '${{ matrix.go }}'
    - name: Invoking go test
      run: go test ./...
```

The next step is the `release` job, where you can differentiate two core steps. The first part is the generation of the binaries that you want to expose in the GitHub release.

```yaml
- name: Setup Go
  uses: actions/setup-go@v1.1.2
  with:
    go-version: '1.14'
- name: Invoking go vet and binaries generation
  run: |
    go vet ./...
    GOOS=darwin GOARCH=amd64 go build -o=.github/workflows/asyncapi-parser.darwin.amd64 ./cmd/api-parser/main.go
    GOOS=linux GOARCH=amd64 go build -o=.github/workflows/asyncapi-parser.linux.amd64 ./cmd/api-parser/main.go
    GOOS=windows GOARCH=amd64 go build -o=.github/workflows/asyncapi-parser.windows.amd64.exe ./cmd/api-parser/main.go
```

So far, it is all Go-related operations. How about the release? For the release, you need to set up a Node.js environment to run Semantic Release. Node.js community has this excellent package, [npx](https://www.npmjs.com/package/npx), that allows you to run a package without installing it, and this is what you can do here in the workflow.

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v1
  with:
    node-version: 13
- name: Add plugin for conventional commits
  run: npm install conventional-changelog-conventionalcommits
  working-directory: ./.github/workflows
- name: Release to GitHub
  working-directory: ./.github/workflows
  env:
    GITHUB_TOKEN: ${{ secrets.GH_TOKEN }}
    GIT_AUTHOR_NAME: asyncapi-bot
    GIT_AUTHOR_EMAIL: info@asyncapi.io
    GIT_COMMITTER_NAME: asyncapi-bot
    GIT_COMMITTER_EMAIL: info@asyncapi.io
  run: npx semantic-release
```

You only have to install `conventional-changelog-conventionalcommits` explicitly if you want to use `conventionalcommits` preset when analyzing Git commits and generating the changelog:
```
plugins:
- - "@semantic-release/commit-analyzer"
  - preset: conventionalcommits
- - "@semantic-release/release-notes-generator"
  - preset: conventionalcommits
``` 

Take a look at full release workflow for reference:

```yaml
name: Release

on:
  push:
    branches:
      - master

jobs:
  test:
    name: 'Testing'
    runs-on: ubuntu-latest
    strategy:
      matrix:
        go: 
          - '1.14'
          - '1.13'
          - '1.12' 
    steps:
      - name: Checkout repo
        uses: actions/checkout@v2
      - name: Setup Go
        uses: actions/setup-go@v1.1.2
        with:
          go-version: '${{ matrix.go }}'
      - name: Invoking go test
        run: go test ./...
  
  release:
    name: 'Release to GitHub'
    runs-on: ubuntu-latest
    needs: 
      - test
    steps:
      - name: Checkout repo
        uses: actions/checkout@v2
      - name: Setup Go
        uses: actions/setup-go@v1.1.2
        with:
          go-version: '1.14'
      - name: Invoking go vet and binaries generation
        run: |
          go vet ./...
          GOOS=darwin GOARCH=amd64 go build -o=.github/workflows/asyncapi-parser.darwin.amd64 ./cmd/api-parser/main.go
          GOOS=linux GOARCH=amd64 go build -o=.github/workflows/asyncapi-parser.linux.amd64 ./cmd/api-parser/main.go
          GOOS=windows GOARCH=amd64 go build -o=.github/workflows/asyncapi-parser.windows.amd64.exe ./cmd/api-parser/main.go
      - name: Setup Node.js
        uses: actions/setup-node@v1
        with:
          node-version: 13
      - name: Add plugin for conventional commits
        run: npm install conventional-changelog-conventionalcommits
        working-directory: ./.github/workflows
      - name: Release to GitHub
        working-directory: ./.github/workflows
        env:
          GITHUB_TOKEN: ${{ secrets.GH_TOKEN }}
          GIT_AUTHOR_NAME: asyncapi-bot
          GIT_AUTHOR_EMAIL: info@asyncapi.io
          GIT_COMMITTER_NAME: asyncapi-bot
          GIT_COMMITTER_EMAIL: info@asyncapi.io
        run: npx semantic-release
```

You see, you can still have your project "clean" from any JavaScript-specific files and references. Everything you need for running your release with the JavaScript community tooling is only in the release-related configuration.

## Conclusion

I don't think I can ever understand this "hate" towards JavaScript. I think, though, that you can "hate" the language, but if you see some amazing tooling built with it, that can increase your productivity, grit your teeth, put bias aside, and enjoy life. Especially, if in exchange you get this excellent feature, notification about release under the Issue and Pull Request:

![pr info about release](/img/posts/pr-indicator.webp)

In case you want to have more explanation on the release automation subject, I recommend reading [the first part of the automation story](/blog/automated-releases/). You can also [join our Slack](https://www.asyncapi.com/slack-invite/) for further discussion.

_* Cover photo by [Rock'n Roll Monkey](https://unsplash.com/@rocknrollmonkey) on Unsplash_

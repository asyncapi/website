---
title: "Full automation of release to NPM and Docker Hub with GitHub Actions and Conventional Commits"
date: 2020-03-18T08:00:00+01:00
type: blog
featured: true
tags:
  - GitHubActions
  - Release
  - Generator
cover: /images/posts/robot.png
weight: 100
authors:
  - name: Lukasz Gornicki
    photo: /images/avatars/lpgornicki.png
    link: https://twitter.com/derberq
    byline: AsyncAPI Maintainer and Dev Comm Keeper
---

> tl;dr
from now on, some libraries owned by [AsyncAPI Initiative](https://www.asyncapi.com/) are released in an automated way. We roll-out this setup to the rest when we see it is needed.

Repetitive tasks are boring. If what you do manually can be automated, then what are you waiting for! 

> _But these tasks take only a couple of minutes from time to time, gimme a break_

A couple of minutes here, a couple of minutes there and all suddenly you do not have time on more important things, on innovation. Automation makes it easier to scale and eliminates errors. Distractions consume time and make you less productive.

We kick ass at [AsyncAPI Initiative](https://www.asyncapi.com/) at the moment. We started regularly improve our tooling. We are now regularly sharing project status in our [newsletter](https://www.asyncapi.com/subscribe) and host [bi-weekly open meetings](https://github.com/asyncapi/asyncapi/issues/115), but most important is that we just recently updated our roadmap.

Am I just showing off? sounds like, but that is not my intention. I just want to point out we are being productive, and we want to continue this trend, this means we need automation. If you have libraries that you want to regularly release, and you plan additional ones to come, you need to focus on release automation.

## What full automation means

Full automation means that release process if fully automated with no manual steps... what else did you think :trollface:.

Your responsibility is just to merge a pull request. The automation handles the rest. 

You might say: _but I do not want to release on every merge, sometimes I merge changes that are not related to the functionality of the library_.

This is a valid point, you need a way to recognize if the given commit should trigger the release, and what kind of release, PATCH or MINOR. The way to do it is to introduce in your project [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.

## Conventional Commits

At [AsyncAPI Initiative](https://www.asyncapi.com/) we use [Semantic Versioning](https://semver.org/). This is why choosing [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification was a natural decision.

Purpose of Conventional Commits is to make commits not only human-readable but also machine-readable. It defines a set of commit prefixes (but not only) that can be easily parsed and analyzed by tooling.

This is how the version of the library looks like when it follows semantic versioning: `MAJOR.MINOR.PATCH`. How does the machine know what release you want to bump because of a given commit? Simplest mapping looks like in the following list:

- `fix: ` -> `PATCH`
- `feat: ` -> `MINOR`
- `{ANY_PREFIX}!: ` so for example `refactor!: ` -> `MAJOR` 


It other words, assume your version was 1.0.0 and you made a commit like `feat: add new parameter to test endpoint`. You can have a script that picks up `feat: ` and triggers release that eventually releases version 1.1.0.

## Workflow design

At [AsyncAPI Initiative](https://www.asyncapi.com/), and to be more specific, in [generator](https://github.com/asyncapi/generator/) where we introduced the pipeline for the very first time we had to automatically:

- Tag Git repository with a new version
- Create GitHub Release
- Push new version of the package to [NPM](https://www.npmjs.com/)
- Push new version of Docker image to [Docker Hub](https://hub.docker.com/)
- Bump the version of the package in `package.json` file and commit the change to the repository

This is how the design looks like:

![npm docker release workflow](/images/posts/release-workflow.png)

There are two workflows designed here. 

The first workflow, release, react to changes in the release branch (`master` in this case) and decides if release should be triggered, and triggers it. The last step of the workflow is a pull request creation with changes in `package.json`. Why changes are not committed directly to the release branch? because in the majority of cases people, like we in AsyncAPI, use branch protection rules and do not allow direct commits to release branches.

The second workflow is just for handling changes in `package.json`. To fulfill branch protection settings, we heed to auto-approve the pull request and then we can automatically merge it.

You can extend this workflow with additional steps, like:
* Integration testing
* Deployment
* Notifications

## GitHub Actions

Even though I have my opinion about GitHub Actions (for more details you can read my [post about it](https://dev.to/derberg/github-actions-when-fascination-turns-into-disappointment-4d75)) I still think it is worth investing in it, especially for the release workflows.

Except from the GitHub provided actions, I used the following awesome actions provided by the community:

- [Create Pull Request](ttps://github.com/marketplace/actions/create-pull-request)
- [Auto Approve](https://github.com/marketplace/actions/auto-approve)
- [Merge Pull Request](https://github.com/marketplace/actions/merge-pull-requests)

### Release workflow

Release workflow must be triggered every time there is something new happening in the release branch, in our case it is a `master` branch:

```yaml
on:
  push:
    branches:
      - master
```

#### GitHub and NPM

For releases to GitHub and NPM, the most convenient solution is to integrate [semantic release](https://github.com/semantic-release/semantic-release) package and related plugins that support Conventional Commits. You can configure plugins in your `package.json` but not only:

```json
"plugins": [
      [
        "@semantic-release/commit-analyzer",
        {
          "preset": "conventionalcommits"
        }
      ],
      [
        "@semantic-release/release-notes-generator",
        {
          "preset": "conventionalcommits"
        }
      ],
      "@semantic-release/npm",
      "@semantic-release/github"
    ]
```

Remember that good automation should be backed by a technical bot rather than a real user. GitHub Actions allow you to encrypt credentials to different systems on the repository level and referring them in actions if straight-forward. 

```yaml
- name: Release to NPM and GitHub
  id: release
  env:
    GITHUB_TOKEN: ${{ secrets.GH_TOKEN }}
    NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
    GIT_AUTHOR_NAME: asyncapi-bot
    GIT_AUTHOR_EMAIL: info@asyncapi.io
    GIT_COMMITTER_NAME: asyncapi-bot
    GIT_COMMITTER_EMAIL: info@asyncapi.io
  run: npm run release
```

#### Docker

For handling Docker you can use some community-provided GitHub Action that abstracts Docker CLI. I don't think it is needed though if you know Docker. Some of the commands you might want to reuse also during local development, like image building and have them behind npm script like `npm run docker-build`.

```yaml
- name: Release to Docker
  if: steps.initversion.outputs.version != steps.extractver.outputs.version
  run: | 
    echo ${{secrets.DOCKER_PASSWORD}} | docker login -u ${{secrets.DOCKER_USERNAME}} --password-stdin
    npm run docker-build
    docker tag asyncapi/generator:latest asyncapi/generator:${{ steps.extractver.outputs.version }}
    docker push asyncapi/generator:${{ steps.extractver.outputs.version }}
    docker push asyncapi/generator:latest
```

#### Bump version in package.json

A common practice is that once during release you bump package version in `package.json`, you should also commit the modified file to release branch. It is all fine but good practices in the project are:

- Do not commit directly to the release branch, all changes should go through pull requests with proper peer review.
- Branches should have basic protection enabled, simple rules that will block pull request before it is merged.

Release workflow instead of committing to the release branch, should commit to a new branch and create a pull request. Seems like an overhead? no, you can also automate it, just read further.

```yaml
- name: Create Pull Request with updated package files
  if: steps.initversion.outputs.version != steps.extractver.outputs.version
  uses: peter-evans/create-pull-request@v2.4.4
  with:
    token: ${{ secrets.GH_TOKEN }}
    commit-message: 'chore(release): ${{ steps.extractver.outputs.version }}'
    committer: asyncapi-bot <info@asyncapi.io>
    author: asyncapi-bot <info@asyncapi.io>
    title: 'chore(release): ${{ steps.extractver.outputs.version }}'
    body: 'Version bump in package.json and package-lock.json for release [${{ steps.extractver.outputs.version }}](https://github.com/${{github.repository}}/releases/tag/v${{ steps.extractver.outputs.version }})'
    branch: version-bump/${{ steps.extractver.outputs.version }}
```

#### Conditions and sharing outputs

GitHub Actions has two awesome features:
- You can set conditions to specific steps
- You can share the output of one step with another

These features are used in the release workflow to check the version of the package before and after the GitHub and NPM release. To share output you must assign an `id` to the step and declare a variable and assign any value to it.
```yaml
- name: Get version from package.json after release step
  id: extractver
  run: echo "::set-output name=version::$(npm run get-version --silent)"
```

You access the shared value by the `id` and the variable name like `steps.extractver.outputs.version`. We use it for example in the condition that specifies if further steps of the workflow should be triggered or not. If the version in `package.json` changed after GitHub and NPM step, this means we should proceed with Docker publishing and pull request creation:

```yaml
if: steps.initversion.outputs.version != steps.extractver.outputs.version
```

#### Full workflow

Below you can find the entire workflow file:

```yml
name: Release

on:
  push:
    branches:
      - master

jobs:
  release:
    name: 'Release NPM, GitHub, Docker'
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repo
        uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v1
        with:
          node-version: 13
      - name: Install dependencies
        run: npm ci
      - name: Get version from package.json before release step
        id: initversion
        run: echo "::set-output name=version::$(npm run get-version --silent)"
      - name: Release to NPM and GitHub
        id: release
        env:
          GITHUB_TOKEN: ${{ secrets.GH_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
          GIT_AUTHOR_NAME: asyncapi-bot
          GIT_AUTHOR_EMAIL: info@asyncapi.io
          GIT_COMMITTER_NAME: asyncapi-bot
          GIT_COMMITTER_EMAIL: info@asyncapi.io
        run: npm run release
      - name: Get version from package.json after release step
        id: extractver
        run: echo "::set-output name=version::$(npm run get-version --silent)"
      - name: Release to Docker
        if: steps.initversion.outputs.version != steps.extractver.outputs.version
        run: | 
          echo ${{secrets.DOCKER_PASSWORD}} | docker login -u ${{secrets.DOCKER_USERNAME}} --password-stdin
          npm run docker-build
          docker tag asyncapi/generator:latest asyncapi/generator:${{ steps.extractver.outputs.version }}
          docker push asyncapi/generator:${{ steps.extractver.outputs.version }}
          docker push asyncapi/generator:latest
      - name: Create Pull Request with updated package files
        if: steps.initversion.outputs.version != steps.extractver.outputs.version
        uses: peter-evans/create-pull-request@v2.4.4
        with:
          token: ${{ secrets.GH_TOKEN }}
          commit-message: 'chore(release): ${{ steps.extractver.outputs.version }}'
          committer: asyncapi-bot <info@asyncapi.io>
          author: asyncapi-bot <info@asyncapi.io>
          title: 'chore(release): ${{ steps.extractver.outputs.version }}'
          body: 'Version bump in package.json and package-lock.json for release [${{ steps.extractver.outputs.version }}](https://github.com/${{github.repository}}/releases/tag/v${{ steps.extractver.outputs.version }})'
          branch: version-bump/${{ steps.extractver.outputs.version }}
```

## Automated merging workflow

Your first question here should be:

> _Why automated approving and merging is handled in a separate workflow and not as part of release workflow_

The reason is that time between pull request creation and its readiness to be merged is hard to define. Pull requests always include some automated checks, like testing, linting, and others. These are long-running checks. You should not make such an asynchronous step a part of your synchronous release workflow. 

Another reason is that you can also extend such an automated merging flow to handle not only pull request coming form release bot but also other bots, that for example update your dependencies for security reasons. 

Automation can be divided into separate jobs that enable you to define job dependencies. There is no point to run **automerge** job until the **autoapprove** job is finished, and GitHub actions allow you to define this with `needs: [autoapprove]`

Below you can find the entire workflow file:

```yaml
name: Automerge release bump PR

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

  autoapprove:
    runs-on: ubuntu-latest
    steps:
      - name: Autoapproving
        uses: hmarr/auto-approve-action@v2.0.0
        if: github.actor == 'asyncapi-bot'
        with:
          github-token: "${{ secrets.GITHUB_TOKEN }}"

  automerge:
    needs: [autoapprove]
    runs-on: ubuntu-latest
    steps:
      - name: Automerging
        uses: pascalgn/automerge-action@v0.7.5
        if: github.actor == 'asyncapi-bot'
        env:
          GITHUB_TOKEN: "${{ secrets.GH_TOKEN }}"
          GITHUB_LOGIN: asyncapi-bot
          MERGE_LABELS: ""
          MERGE_METHOD: "squash"
          MERGE_COMMIT_MESSAGE: "pull-request-title"
          MERGE_RETRIES: "10"
          MERGE_RETRY_SLEEP: "10000"
```

For a detailed reference, you can look into [this pull request](https://github.com/asyncapi/generator/pull/242) that introduces the above-described workflow in the [generator](https://github.com/asyncapi/generator/).

## Conclusions

Automate all the things, don't waste time. Automate releases, even if you are a purist that for years followed a rule of using [imperative mood](https://chris.beams.io/posts/git-commit/#imperative) in commit subject and after looking on prefixes from Conventional Commits you feel pure disgust :laughing:. In the end, you can always use something different, custom approach, like reacting to merges from pull requests with the specific label only.

> Cover photo by [Franck V.](https://unsplash.com/@franckinjapan) taken from Unsplash
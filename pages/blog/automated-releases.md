---
title: 'Full automation of release to NPM and Docker Hub with GitHub Actions and Conventional Commits'
date: 2020-03-20T06:00:00+01:00
type: Engineering
tags:
  - GitHub Actions
  - Release
cover: /img/posts/robot.webp
authors:
  - name: Lukasz Gornicki
    photo: /img/avatars/lpgornicki.webp
    link: https://twitter.com/derberq
    byline: AsyncAPI Maintainer and Dev Comm Keeper
excerpt: Repetitive tasks are tedious. If what you do manually can be automated, then what are you waiting for!
---

> tl;dr
> from now on, we release [generator](https://github.com/asyncapi/generator/) in an automated way. We roll-out this setup to the rest when we see it is needed.

Repetitive tasks are tedious. If what you do manually can be automated, then what are you waiting for!

> _But these tasks take only a couple of minutes from time to time, gimme a break_

A couple of minutes here, a couple of minutes there and all of a sudden you do not have time on more important things, on innovation. Automation makes it easier to scale and eliminates errors. Distractions consume time and make you less productive.

We kick ass at [AsyncAPI Initiative](https://www.asyncapi.com/) at the moment. We started to improve our tooling regularly. We are now periodically sharing project status in our [newsletter](https://www.asyncapi.com/newsletter), and host [bi-weekly open meetings](https://github.com/asyncapi/asyncapi/issues/115), but most important is that we just recently updated our roadmap.

Am I just showing off? It sounds like, but that is not my intention. I wish to point out we are productive, and we want to continue this trend and automation helps here a lot. If you have libraries that you want to release regularly and you plan additional ones to come, you need to focus on release automation.

## What full automation means

Full automation means that the release process if fully automated with no manual steps. What else did you think?

<iframe src="https://giphy.com/embed/6uGhT1O4sxpi8" width="480" height="240" frameBorder="0" className="giphy-embed" allowFullScreen />

Your responsibility is just to merge a pull request. The automation handles the rest.

You might say: _but I do not want to release on every merge, sometimes I merge changes that are not related to the functionality of the library_.

This is a valid point. You need a way to recognize if the given commit should trigger the release and what kind of version, PATCH, or MINOR. The way to do it is to introduce in your project [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.

## Conventional Commits

At [AsyncAPI Initiative](https://www.asyncapi.com/) we use [Semantic Versioning](https://semver.org/). This is why choosing [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification was a natural decision.

Purpose of Conventional Commits is to make commits not only human-readable but also machine-readable. It defines a set of commit prefixes that can be easily parsed and analyzed by tooling.

This is how the version of the library looks like when it follows semantic versioning: `MAJOR.MINOR.PATCH`. How does the machine know what release you want to bump because of a given commit? Simplest mapping looks like in the following list:

- Commit message prefix `fix: ` indicates `PATCH` release,
- Commit message prefix `feat: ` indicates `MINOR` release,
- Commit message prefix `{ANY_PREFIX}!: ` so for example `feat!:` or even `refactor!: ` indicate `MAJOR` release.

It other words, assume your version was 1.0.0, and you made a commit like `feat: add a new parameter to test endpoint`. You can have a script that picks up `feat: ` and triggers release that eventually bumps to version 1.1.0.

## Workflow design

At [AsyncAPI Initiative](https://www.asyncapi.com/) where we introduced the release pipeline for the very first time, we had to do the following automatically:

- Tag Git repository with a new version
- Create GitHub Release
- Push new version of the package to [NPM](https://www.npmjs.com/)
- Push new version of Docker image to [Docker Hub](https://hub.docker.com/)
- Bump the version of the package in `package.json` file and commit the change to the repository

This is how the design looks like:

![npm docker release workflow](/img/posts/release-workflow.webp)

There are two workflows designed here.

The first workflow reacts to changes in the release branch (`master` in this case), decides if release should be triggered, and triggers it. The last step of the workflow is a pull request creation with changes in `package.json` and `package-lock.json`. Why are changes not committed directly to the release branch? Because we use branch protection rules and do not allow direct commits to release branches.

You can extend this workflow with additional steps, like:

- Integration testing
- Deployment
- Notifications

The second workflow is just for handling changes in `package.json`. To fulfill branch protection settings, we had to auto-approve the pull request so we can automatically merge it.

## GitHub Actions

Even though I have [my opinion about GitHub Actions](https://dev.to/derberg/github-actions-when-fascination-turns-into-disappointment-4d75), I still think it is worth investing in it, especially for the release workflows.

We used the GitHub-provided actions and the following awesome actions built by the community:

- [Create Pull Request](ttps://github.com/marketplace/actions/create-pull-request)
- [Auto Approve](https://github.com/marketplace/actions/auto-approve)
- [Merge Pull Request](https://github.com/marketplace/actions/merge-pull-requests-automerge-action)

### Release workflow

Release workflow triggers every time there is something new happening in the release branch. In our case, it is the `master` branch:

```yaml
on:
  push:
    branches:
      - master
```

#### GitHub and NPM

For releases to GitHub and NPM, the most convenient solution is to integrate [semantic release](https://github.com/semantic-release/semantic-release) package and related plugins that support Conventional Commits. You can configure plugins in your `package.json` in the order they should be invoked:

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

Conveniently, functional automation uses a [technical bot rather than a real user](https://www.thinkautomation.com/bots-and-ai/what-are-software-bots/). GitHub actions allow you to encrypt the credentials of different systems at the repository level. Referring to them in actions looks as follows:

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

Aside from automation, the bot also comments on every pull request and issue included in the release notifying subscribed participants that the given topic is part of the release. Isn't it awesome?

![pr info about release](/img/posts/pr-indicator.webp)

#### Docker

For handling Docker, you can use some community-provided GitHub action that abstracts Docker CLI. I don't think it is needed if you know Docker. You might also want to reuse some commands during local development, like image building, and have them behind an npm script like `npm run docker-build`.

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

A common practice is to bump the package version in `package.json` on every release. You should also push the modified file to the release branch. Be aware though that good practices in the project are:

- Do not commit directly to the release branch. All changes should go through pull requests with proper peer review.
- Branches should have basic protection enabled. There should be simple rules that block pull requests before the merge.

Release workflow, instead of pushing directly to the release branch, should commit to a new branch and create a pull request. Seems like an overhead? No, you can also automate it. Just keep on reading.

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

GitHub Actions has two excellent features:

- You can set conditions for specific steps
- You can share the output of one step with another

These features are used in the release workflow to check the version of the package, before and after the GitHub/NPM release step.

To share the output, you must assign an `id` to the step and declare a variable and assign any value to it.

```yaml
- name: Get version from package.json after release step
  id: extractver
  run: echo "::set-output name=version::$(npm run get-version --silent)"
```

You can access the shared value by the `id` and a variable name like `steps.extractver.outputs.version`. We use it, for example, in the condition that specifies if further steps of the workflow should be triggered or not. If the version in `package.json` changed after GitHub and NPM step, this means we should proceed with Docker publishing and pull request creation:

```yaml
if: steps.initversion.outputs.version != steps.extractver.outputs.version
```

#### Full workflow

Below you can find the entire workflow file:

```yaml
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

You may be asking yourself:

> _Why automated approving and merging is handled in a separate workflow and not as part of release workflow_

One reason is that the time between pull request creation and its readiness to be merged is hard to define. Pull requests always include some automated checks, like testing, linting, and others. These are long-running checks. You should not make such an asynchronous step a part of your synchronous release workflow.

Another reason is that you can also extend such an automated merging flow to handle not only pull requests coming from the release-handling bot but also other bots, that, for example, update your dependencies for security reasons.

You should divide automation into separate jobs that enable you to define their dependencies. There is no point to run the **automerge** job until the **autoapprove** one ends. GitHub Actions allows you to express this with `needs: [autoapprove]`

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
          github-token: '${{ secrets.GITHUB_TOKEN }}'

  automerge:
    needs: [autoapprove]
    runs-on: ubuntu-latest
    steps:
      - name: Automerging
        uses: pascalgn/automerge-action@v0.7.5
        if: github.actor == 'asyncapi-bot'
        env:
          GITHUB_TOKEN: '${{ secrets.GH_TOKEN }}'
          GITHUB_LOGIN: asyncapi-bot
          MERGE_LABELS: ''
          MERGE_METHOD: 'squash'
          MERGE_COMMIT_MESSAGE: 'pull-request-title'
          MERGE_RETRIES: '10'
          MERGE_RETRY_SLEEP: '10000'
```

For a detailed reference, you can look into [this pull request](https://github.com/asyncapi/generator/pull/242) that introduces the above-described workflow in the [generator](https://github.com/asyncapi/generator/).

## Conclusions

Automate all the things, don't waste time. Automate releases, even if you are a purist that for years followed a rule of using [imperative mood](https://chris.beams.io/posts/git-commit/#imperative) in commit subject and now, after looking on prefixes from Conventional Commits you feel pure disgust.

<iframe src="https://giphy.com/embed/8PmTor9XVnD3sxXHRe" width="480" height="435" frameBorder="0" className="giphy-embed" allowFullScreen />

In the end, you can always use something different, custom approach, like reacting to merges from pull requests with the specific label only. If you have time to reinvent the wheel, go for it.

_Cover photo by [Franck V.](https://unsplash.com/@franckinjapan) taken from Unsplash._

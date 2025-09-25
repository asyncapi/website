---
title: Utilizing GitHub Actions
weight: 80
---

## Overview

[GitHub Actions](https://docs.github.com/actions) is a continuous integration and continuous delivery (CI/CD) platform that automates software development workflows directly within a GitHub repository.

At AsyncAPI, GitHub Actions is crucial for maintaining consistency, efficiency, and quality across our projects by handling repetitive tasks automatically.

This document outlines how AsyncAPI utilizes GitHub Actions to automate and optimize workflows. It provides a comprehensive guide for maintainers and contributors, explaining global and local workflows, common commands, repository setup, and best practices.

## Types of GitHub Actions workflows

At AsyncAPI, there are two types of workflows: [local](#local-workflows) and [global](#global-workflows).

### Local workflows

Local workflows are specific to a repository. They are stored in the `.github/workflows` directory and typically handle:

- Running tests on pull requests (PRs).
- Linting code.
- Building and deploying applications.

A few key points about local workflows in AsyncAPI:

- Multiple workflows can be triggered for a single PR.
- Not all workflows are required to pass for a PR to be merged.  
- Some workflows are marked as required; if these fail, the PR will be blocked.  
- External workflows can sometimes affect local checks.

You can view these workflows under the **Actions** tab or at the bottom of each PR page.

### Global workflows

Global workflows are shared across multiple repositories and maintained centrally in the [AsyncAPI `.github` repository](https://github.com/asyncapi/.github).

They help:

- Enforce consistent configurations.
- Automate releases.
- Synchronize files across repositories.

Changes made to global workflows can automatically propagate to opted-in repositories.

#### How to understand global workflows

AsyncAPI maintains a set of global GitHub Actions workflows inside the [`.github`](https://github.com/asyncapi/.github/tree/master/.github/workflows) repository. These workflows are shared across many repositories and automate common tasks such as issue labeling, automerging, Slack notifications, and more.

Each workflow is self-documented with comments inside its `.yml` file, so the best way to learn what a workflow does is to read it directly.

For example, say you want to understand what the `PTAL Command` workflow does. Here's how you can explore it:

1. Go to the [`please-take-a-look-command.yml`](https://github.com/asyncapi/.github/blob/master/.github/workflows/please-take-a-look-command.yml) file in the `.github/workflows` directory.
2. Read the top comments to learn:

   * When the workflow is triggered (e.g., on `/ptal` or `/please-take-a-look` comments),
   * What problem it solves (e.g., reminding unresponsive reviewers),
   * Any conditions or repository limitations.

This structure makes workflows easier to maintain and allows contributors to understand them directly from their local copies without jumping to external docs.

#### Global replicator workflow

The [global replicator workflow](https://github.com/asyncapi/.github/blob/master/.github/workflows/global-replicator.yml) is a central GitHub Actions workflow that helps keep essential files and workflows consistent across all AsyncAPI repositories.

This workflow automatically replicates things like:

* Community health files (e.g., `CODE_OF_CONDUCT.md`, `CONTRIBUTING.md`)
* Language-specific test and release workflows (e.g., for Go, Node.js, Docker)
* Common automation scripts and workflows (e.g., auto-merge, stale issue handling, update notifications)

Each job in the YAML file is scoped to specific topics, paths, or files, and often uses GitHub Topics (like `golang`, `nodejs`, or `docker`) to decide which repositories should receive what.

Rather than duplicating the logic here in the docs (which can get outdated quickly), we recommend reviewing the comments and job names directly in the [global-replicator.yml file](https://github.com/asyncapi/.github/blob/master/.github/workflows/global-replicator.yml). Each job is clearly labeled and annotated to explain what it does and why.

> If you're unsure why a certain workflow or file exists in your repository, check if it's managed globally through this replicator and look for its corresponding job in the YAML file.

#### Basic requirements to use global workflows

Before a repository can start using the global workflows managed through the `.github` repository, a few setup steps are required. This ensures that bots can properly push and merge workflow files. Without these steps, the automation will not work as expected.

The basic requirements are:

- **Add the `@asyncapi/bots` team as maintainers**: In the repository settings, under *Collaborators and Teams*, add the `@asyncapi/bots` team with maintainer permissions.
- **Add `@asyncapi-bot-eve` to CODEOWNERS**: In the `.github/CODEOWNERS` file, include `@asyncapi-bot-eve` to make the Eve bot a code owner. This allows automatic approval of pull requests it generates, as GitHub treats code owners as authorized reviewers.
- **Trigger initial setup**: Reach out to the maintainers of the `.github` repository and ask them to manually run the "Global Workflow to Rule Them All" action, providing your repository name.
- **Manually approve initial PRs**: The first set of workflow-related pull requests must be manually merged, as the automation for merging only becomes available after the necessary workflows are installed.

Once these steps are complete, the repository will start automatically receiving and merging global workflow updates as expected.

#### How to opt in or out of global workflows

**Opt-in**

To opt in to a global workflow managed in the AsyncAPI `.github` repository, you can either add a specific topic to your repository (via GitHub settings or the GitHub CLI) or ask a maintainer to trigger it manually for you.
  
To do this, reach out on Slack or open an issue, and a maintainer can run the “Global workflow to rule them all” from the **Actions** tab, optionally targeting your repo by name.

**Opt-out**

Some workflows are applied automatically to all repositories. If you’d like to opt out of one of those, your repository must be added to the `repos_to_ignore` list in the relevant job. This change has to be made in the global workflow by a maintainer, so just ask in Slack or open an issue if you'd like to be excluded.
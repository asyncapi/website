---
title: Following Conventional Commits
description: This guide teaches you how to write clear and structured commit messages using the Conventional Commits standard.
weight: 60
---

When you contribute to a project, you're not just adding code or docs but also context. Your changes become part of the project's history, and your commit messages explain why the changes were made.

In this guide, you'll explore how to write effective commit messages that follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) standard. This standard helps you create clear, consistent, and semantically meaningful commit messages that are easy to understand and navigate.

## TL;DR

- **Why**: *Explain* the impact of the change and *how* it benefits users or the project.
- **Types**: Prefix with `feat`, `fix`, etc. (PR titles too).
- **How**: Use imperative, clear text. Keep it short, standalone, and in plain English. Use the body for additional details if needed.

## Overview

A clear, well-crafted commit message is like a signpost that guides us through the project's evolution. It helps us understand the context of your change, why you made it, and how it fits into the bigger picture.

Since this is a message that others will read, it is important to provide enough context to understand the change. Therefore, you should avoid vague messages like "fixed bug." Instead, try to be specific.

For example:

> **Bad:** `fixed bug`  

> **Good:** `fix: resolve timeout issue on login by renewing session tokens`

### Choosing the right commit type

A set of commit types helps communicate the nature of a change clearly. Using these types makes it easier to understand the impact of a commit at a glance.

The following are some of the most commonly used commit types:

- **feat:** Choose `feat` for new features. If your change adds functionality or improves our project in some way, use this type.
- **fix:** This type is for bug fixes. If your change corrects an issue or resolves a problem, you should use the `fix` type.
- **docs:** `docs` is for documentation changes. If you update a README, add comments, or make other documentation changes, use this type.
- **style:** The `style` type is for changes that don't affect the code's meaning. For example, white-space, formatting, missing semi-colons, etc.
- **refactor:** Use the `refactor` type for code changes that neither fix a bug nor add a feature. If you reorganize code, rename variables, or make other changes that don't affect the code's behavior, use this type.
- **test:** If your change adds or modifies tests, use the `test` type.
- **chore:** The `chore` type is for changes that don't affect the codebase. If you update build scripts, make tooling changes, or perform other maintenance tasks, use this type.

To maintain a clear and structured commit history, all PR titles must follow the Conventional Commits format. This ensures that commit messages and PRs are semantically meaningful and easy to understand.  

A PR title that does not follow this format will be rejected by our [Linting bot](https://github.com/asyncapi/community/blob/master/.github/workflows/lint-pr-title.yml), preventing the PR from being merged.  

Therefore, you can use the following examples to guide you:

| Bad | Good |
| --- | --- |
| `Add user avatar upload feature` | `feat: add user avatar upload feature` |
| `Fix login issue` | `fix: resolve timeout issue on login by renewing session tokens` |

If you're not sure which type to use, ask yourself what the main *purpose* of your change is. That should help you pick the right type.

### Use the commit body for additional context

Most times, a one-liner is all you need. But when you need to provide more context, use the commit body to explain the reasoning behind the change, how it was implemented, or any nuances that might help others understand the decision.

To add the commit body, add one blank line after the commit message and then specify the details you want to communicate about the commit.

**Example:**

> feat: add user avatar upload feature to improve user experience on profile pages
> (blank line)
> Adds a form field, validation checks, and an API endpoint for avatar uploads. Enhances profile customization. 

Some additional tips to keep in mind when writing commit messages include:

- **Be concise:** Keep your messages brief but informative.
- **Check for consistency and completeness:** Make sure your message stands alone and provides enough context.
- **Use English and avoid jargon:** Stick to plain English to make your messages accessible to everyone.

For more information on Conventional Commits, please refer to the [official website](https://www.conventionalcommits.org/en/v1.0.0/). If you have any questions or need help, feel free to reach out to any maintainer or fellow contributor.
---
title: AsyncAPI Code Contributor Guide
description: A guide for new contributors looking to contribute code to the AsyncAPI project.
weight: 70
---
# AsyncAPI Code Contributor Guide  

Welcome to the AsyncAPI community! We're excited to have you here. Think of AsyncAPI as a collaborative puzzle - your contributions are essential to completing it. This guide will help you get started smoothly.  

## Understanding AsyncAPI  
[AsyncAPI](https://www.asyncapi.com/en) is an open-source initiative for defining and building event-driven architectures. Our repositories house tools, specifications, and generators that make event-driven systems easier to work with. Each repo has a purpose, detailed in its `README.md`.  

## Prerequisites
 Before you begin contributing code, make sure you're familiar with the following:

- [Git Workflow Guide](git-workflow): Learn how to fork, branch, commit, and open pull requests.
- [Git](https://git-scm.com) and [GitHub](https://github.com): These are your primary tools for version control and collaboration. Learn the basics [here](https://docs.github.com/en/get-started).  
- Code Editor: Your tool to work with the source code of our repositories and version control. For example, [VS Code](https://code.visualstudio.com), [Sublime Text](https://www.sublimetext.com), [JetBrains IDEs](https://www.jetbrains.com/ides/), or any other tool you prefer.
- [Node.js & npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm): AsyncAPI relies on JavaScript/TypeScript, so ensure these are installed and configured.  

## Contribution Etiquette  
1. Follow the [Code of Conduct](https://github.com/asyncapi/.github/blob/master/CODE_OF_CONDUCT.md)
2. Stick to the [Contributing guidelines](https://github.com/asyncapi/community/blob/master/CONTRIBUTING.md)
3. Document the "why" of your contribution(s). Make sure that someone who opens the code for the first time understands the changes you've made.
4. Communicate openly through discussions on GitHub or designated Slack channels.

## Submit Your First Pull Request (PR)  

Once you've made and committed your changes (following the Git Workflow guide), you need to create a Pull Request (PR) to propose merging your work into the official AsyncAPI repository. Make sure to use the [conventional commit style](../010-contribution-guidelines/conventional-commits) while creating PRs and follow these steps:  

### Create a Pull Request (PR)

Now, go to your forked repository on GitHub (ex.- `https://github.com/your-username/generator`):

1. You’ll see a notification about your recently pushed branch. Click the "Compare & pull request" button.
2. Make sure the base repository is `asyncapi/generator` (upstream) and the head repository is your fork (`your-username/generator`).
3. Add a clear title and description explaining your changes.
4. Click "Create pull request" to submit your PR for review.

That's it! You've successfully submitted your first Pull Request. 

### Wait for Review & Merge
- The maintainers will review your PR.
- If needed, respond to their comments and make changes.
- Once approved, a maintainer will merge your PR into the official AsyncAPI repository! 

Every contribution matters, no matter how small. Dive in and let’s build something amazing together!
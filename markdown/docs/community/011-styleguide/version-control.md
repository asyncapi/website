---
title: Version Control
description: A guide to using version control in AsyncAPI
weight: 150
---
## Version Control

At AsyncAPI, version control is used to keep track of what has changed, who made the change, and why. This helps maintainers, contributors, and users understand how the documentation has evolved, making it easier for everyone to contribute.

### How Documentation Versions Work

Think of AsyncAPI documentation like a library with different editions of the same book:

* Each AsyncAPI version (like 2.0.0 or 3.0.0) gets its own documentation
* When reading the docs, check the version number at the top to make sure it matches the one being used
* Look for the "Last Updated" date to see how current the information is

### Contributing to Documentation

Ready to help improve the docs? Here's how to get started:

#### Step 1: Choose Your Branch Name

Pick a clear name that tells others what you're working on:

* **Adding new content?** Use `docs/feature/your-topic` (like `docs/feature/kafka-tutorial`)
* **Fixing something?** Use `docs/fix/what-youre-fixing` (like `docs/fix/broken-links`)
* **General improvements?** Use `docs/your-topic` (like `docs/getting-started-clarity`)

#### Step 2: Write Clear Commit Messages

 Commit messages are like leaving notes for future contributors. Make them helpful by:

* **Describe the changes:** `docs(tutorials): add step-by-step Kafka examples`
* **Keep it short:** Aim for under 50 characters in the first line
* **Add details if needed:** Use the description area for more context
* **Link to issues in pull requests:** Add "Fixes #123" or "Related to #456" so maintainers & others can track the connection between the contribution & issue it solves

#### Step 3: Update the Changelog

Help others understand what changed by updating `CHANGELOG.md` in the following ways:

* Add the changes under the right version: `## Version X.Y.Z (2024-01-15)`
* Use clear categories: "Added," "Changed," "Fixed," "Removed"
* Include issue numbers: "Added Kafka tutorial examples (#123)"

### Understanding the Branch Setup

AsyncAPI organizes the work by using different branches (think of them as different workspaces). Here is what they are:

* **`master`** - The live documentation that everyone sees
* **`release-X.Y.Z`** - Documentation for specific AsyncAPI versions
* **`docs/*`** - Where all documentation improvements happen
* **`feature/*`** - For changes that include both code and documentation
* **`hotfix/*`** - For urgent fixes that can't wait

### When Submitting  Changes

When writing a pull request, consider doing the following to make it easier for maintainers to review and merge it:

1. **Describe the changes clearly** - Explain what is being changed and why it helps solve the issue.
2. **Ask for the right reviewers** - Tag maintainers & other contributors who are knowledgeable about the topic that the contribution pertains to
3. **Link to related issues** - Use "Closes #123" to automatically link the pull request
4. **Be patient** - Good reviews take time, and feedback makes everything better

### Dealing with Old Content

Sometimes information gets outdated. Here's how it is handled at AsyncAPI :

* **Not all old information is deleted** - Someone might still need that information
* **Mark it clearly** - Look for [DEPRECATED] tags on outdated content
* **We provide alternatives** - Deprecated content includes links to current recommendations
* **We keep it accessible** - Old versions stay available for people who need them

### Keeping Track of Changes

For important documents, a "Version History" section is maintained and shows the following information:

* What is changed and when
* Who made the changes
* Why the changes were needed
* Links to discussions that led to the changes

This creates a story of how AsyncAPI’s documentation evolved, making it easier for others to understand decisions and learn from the past.

### Quick Tips for Success

When contributing to documentation, keep the following in mind:

* **Update the fork correctly** - Be sure to update the right version of the docs
* **Update multiple versions when needed** - If the change helps everyone, apply it broadly
* **Ask questions** - Use GitHub issues or the `#11_contributing` channel in Slack when facing problems with contributing
* **Preview before submitting** - Test the pull request’s changes locally to make sure they look right
* **Be consistent** - Follow the patterns shown  in existing documentation

### Need Help?

Need more assistance with contributing to documentation, check out the [AsyncAPI contribution flow guidelines](../010-contribution-guidelines/contribution-flow).

---
title: Holopin Badge Workflow for Maintainers
description: Learn how to set up and use Holopin digital badges to recognize contributors in your repository.
weight: 30
---

## Introduction

**Holopin badges** (stickers) are digital rewards to recognize contributors. By following this guide, you'll learn how to:

1. Enable Holopin badges for repositories within the AsyncAPI Github organization.
2. Issue Holopin badges to contributors.
3. Request new badges or get support.

## Prerequisites

Before proceeding with the guide, make sure to:

1. Create a Holopin account.
2. Join the AsyncAPI Holopin organization to issue badges
3. Link your GitHub account.

Find more information about each of the steps below in the section.

### Create a Holopin Account

1. Visit [holopin.io](https://holopin.io) and create an account
2. Complete your profile setup

### Join the AsyncAPI Holopin Organization

Repository maintainers must be members of the AsyncAPI Holopin organization to issue badges.

**To get added to the organization:**

1. Contact one of the following administrators to request membership in the AsyncAPI Holopin organization:

    - **@thulieblack** (GitHub)
    - **@derberg** (GitHub)

### Link Your GitHub Account

If you created your Holopin account using "Sign up with GitHub", your accounts are already linked. Otherwise:

1. Go to your [Holopin Account Settings](https://holopin.io/account)
2. Link your Holopin account to your GitHub profile
3. This enables the `@holopin-bot` to work in your repositories

## Setting Up the Badge Workflow

### Add the Repository Topic

**Steps to add the topic:**

1. Navigate to your repository on GitHub
2. Click on the gear icon next to the "About" section, or click on the topics area
3. In the topics field, add `get-global-holopin`
4. Press Enter or click outside the field to save

The `holopin.yml` file will be automatically created in your repository's `.github` directory with all the necessary configuration replicated from the [AsyncAPI `.github` repository](https://github.com/asyncapi/.github).

> **Note:** For more information about this automation, see the [`replicate_holopin_file` job](https://github.com/asyncapi/.github/blob/master/.github/workflows/global-replicator.yml#L271) within the global replicator workflow.

## How to Issue a Badge

1. Navigate to any **Issue** or **Pull Request** in your repository
2. Add a comment with the following format:

```
// Format
@holopin-bot @username sticker-alias

// Example
@holopin-bot @johndoe contributor-badge
```

Once submitted, the `@holopin-bot` responds to the user `@johndoe` with a unique URL to claim the `contributor-badge` badge within their Holopin profile. After claiming, the badge appears on the Holopin profile and can also be [displayed in their GitHub profile](https://blog.holopin.io/posts/github-readme-tutorial).

## Getting New Badges

If you need new badge types created for the AsyncAPI organization:

1. Contact **@thulieblack** or **@derberg** to request new badge designs
2. Once created, new badge id(s) will be added to the main `holopin.yml` file in the `.github` repository
3. The updated configuration will be populated to all repositories with the `get-global-holopin` topic

## Additional Resources

- [Holopin GitHub Integration Documentation](https://docs.holopin.io/integrations/github)
- [Holopin Issuing Rewards Guide](https://docs.holopin.io/issuing-rewards/regular-badges)
- [AsyncAPI Holopin Configuration](https://github.com/asyncapi/.github/blob/master/.github/holopin.yml)

## Troubleshooting

### Bot Not Responding

- Make sure you're commenting in an Issue or Pull Request (not a discussion)
- Ensure you've added the `get-global-holopin` topic to your repository
- Verify the `holopin.yml` file exists in your `.github` directory (it should be automatically created)
- Check that your GitHub account is linked to your Holopin account
- Verify you're a member of the Holopin organization

### Badge Not Issued

- Verify the sticker alias exists in the `holopin.yml` file (check the [main configuration](https://github.com/asyncapi/.github/blob/master/.github/holopin.yml))
- Check that the username is correct (starts with the `@` symbol)
- Ensure the bot has access to the repository
- Confirm the `get-global-holopin` topic is present on your repository

### Need Help?

If you encounter issues or need assistance:
- Open an issue in a relevant AsyncAPI repository (for example, `asyncapi/community`) and mention **@thulieblack** or **@derberg** in the description so they’re notified
- Reach out in the [AsyncAPI Slack](https://asyncapi.com/slack-invite) community
- Check the [Holopin support documentation](https://docs.holopin.io)


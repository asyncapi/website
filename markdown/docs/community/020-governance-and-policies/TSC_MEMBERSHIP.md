---
title: Become a Technical Steering Committee (TSC) Member
weight: 30
---

# Become a Member of the Technical Steering Committee (TSC)

This article walks you through the journey of becoming a member of the AsyncAPI Technical Steering Committee (TSC). This journey includes:
* Actively contributing to the AsyncAPI Initiative projects
* Becoming a maintainer
* Becoming a TSC member

This article also explains the benefits of being a TSC member.

## Contents
* [What is the Technical Steering Committee?](#what-is-the-technical-steering-committee)
* [Why was the TSC formed?](#why-the-tsc-was-formed)
* [Benefits of becoming a TSC member](#benefits-of-becoming-a-tsc-member)
* [How to become a TSC member](#how-to-become-a-tsc-member)
* [How to reach out to the TSC](#how-to-reach-out-to-the-tsc)

If you prefer video, watch our [YouTube video on becoming a TSC member](https://www.youtube.com/watch?v=MfVUUbW2aos).

**Common terms**:
* **Contributors**: Anyone in the community who contributes code, documentation, pull request reviews, designs, or other technical artifacts to the Project ("Contributors");
* **Maintainers**: Contributors who have earned the ability to modify ("commit") source code, documentation, or other technical artifacts in a project's repository ("Committers"). They are also referred to as CODEOWNERS on [GitHub][code-owners].

  Depending on the project's size and complexity, Maintainers may possess additional roles, like `triager` and `committer`, responsible only for specific project areas, such as documentation or code. The level of granularity depends on the project's needs. For example, check the detailed breakdown of the `triager` and `committer` roles in the [website project](https://github.com/asyncapi/website/blob/master/CONTRIBUTING.md#maintainers-setup).

## What is the Technical Steering Committee?
The Technical Steering Committee is a group of maintainers that:
* Contributes to the maintenance of the AsyncAPI Initiative.
* Helps make decisions that affect the entire initiative, not just a single project.
* Commits to participating in the voting process.
* Provides volunteers for various initiatives.
* Has the highest priority to choose people from whenever there is a need for new committees.
## Why the TSC was formed
The concept of the TSC was formed when AsyncAPI joined the Linux Foundation in 2021 to guarantee a system of open governance that promotes ownership and neutrality of all participants in the initiative.

The TSC is the core of the AsyncAPI Initiative's governance model. [Read the Finding a Good Open Governance Model for AsyncAPI article](https://www.asyncapi.com/blog/governance-motivation) to learn why we chose it.

## Governance principles
* The Executive Director and the TSC help manage the project. The Executive Director role is temporary and will eventually disappear after the conclusion of the Startup Period. See the [Technical Steering Committee section](CHARTER#2-technical-steering-committee) in the CHARTER for more information.
* Membership is unlimited. As long as you maintain a repository, you'll remain a TSC member.
* Only 1/4 of the company can participate. For example, if there are 20 TSC members, only 5 can be from the same company to prevent a majority vote based on active contributions.
* Radical transparency:
  * All official meetings are public.
  * No secret or private channels for decision-making. If a decision was made privately, it is not valid and a subject for change.
  * Decision-making is asynchronous. Public meetings end with a summary and a proposed topic for a decision, allowing non-participants to decide and influence it.
* Inclusivity: TSC welcomes people hired by companies to work on the project, as well as individuals from other companies or contributors that are not affiliated with any company willing to help the AsyncAPI Initiative.

Check [this article](https://www.asyncapi.com/blog/radical-transparency) to learn more on why do we want to be that transparent.

## Duties

TSC members have two primary duties:
1. Regularly participate in TSC discussions and voting.
2. Always behave with respect to [AsyncAPI Code of Conduct](https://github.com/asyncapi/.github/blob/master/CODE_OF_CONDUCT.md).

As TSC doesn't override maintainers' decisions, they are involved in topics affecting the entire organization.

Possible topics:
* Accept new projects - when an existing open-source project wants to join the AsyncAPI umbrella (owner wants to donate the project to the AsyncAPI Initiative). The process is about informing TSC members about the project's purpose, why it is donated, and who will maintain it so that TSC can decide if the project can be accepted.
* Archive inactive projects without regular maintenance.
* Programs organization that affect the whole organization, not a single repository:
  * Ambassador program
  * Bounty program
* Budget approval to allocate sponsorship funds for different initiatives.
* Conflicts resolution - TSC resolves tech-related conflicts, while a dedicated committee handles personal conflicts related to the Code of Conduct.

The voting process is automated using [gitvote](https://github.com/cncf/gitvote) to enhance TSC’s voting efficiency. Whenever you need to participate in a discussion or vote, you can use three emojies:
* 👍 (vote for)
* 👎 (vote against)
* 👀 (no opinion about a particular topic. So you may, for example, acknowledge a topic if you're not experienced in some area being voted/discussed).

### Get notified about TSC discussions and voting
* Slack:
  - `#95_bot-tsc-members-mentioned` - the bot alerts TSC members to voting or discussion requirements.
  - `TSC Voting Reminder`: (voting only) - the bot reminds TSC members who haven't voted yet to review the voting topic and share their opinion.
* Email: [Subscription form on the website](https://www.asyncapi.com/community/tsc) - to receive email whenever `@asyncapi/tsc_members` is mentioned in GitHub.
* GitHub Notifications: `@asyncapi/tsc_members`.

## Benefits of becoming a TSC member
As a TSC member, you will enjoy the following benefits:
* Recognition from the AsyncAPI community
  * TSC members can apply for free conference tickets before anyone else.
  * TSC members are first asked for help with the Master ceremony, exposing them to the community and assisting with questions.
  * TSC members are promoted at https://www.asyncapi.com/community/tsc
* Exposure of your portfolio to potential employers as recognition facilitates career advancement.
* Involvement in the voting process on topics concerning the entire Initiative
* Being a part of key decision-making for the Initiative. Especially related to finance.
* A unique experience in shaping the initiative's future and open-source development.
* TSC is the most trusted group in the community and it is the first group of people to choose from when forming [Working Groups](WORKING_GROUPS).

## How to become a TSC member
To become a TSC member, you must be a project maintainer within the AsyncAPI Initiative.

You can become a maintainer by either:
1. Initiating a new repository or project and becoming its maintainer.
2. Donating to an existing repository or project and continuing to maintain it.
3. Supporting and committing to existing projects and being invited by other maintainers to join them as a maintainer. For more information, refer to [Become a maintainer in an existing project](../010-contribution-guidelines/Become-maintainer-in-existing-project).

There's no invitation flow to join the TSC; it's something that you are allowed to do as a maintainer by default, as described in the [charter signed with the Linux Foundation when AsyncAPI joined the foundation](CHARTER). Instead, there is an automation flow in place that adds a new maintainer to the [`community/MAINTAINERS.yaml`](https://github.com/asyncapi/community/blob/master/MAINTAINERS.yaml) list every time the [CODEOWNERS][code-owners] file is updated in any project. And the only thing you need to do is to find your name in the `MAINTAINERS.yaml` list and change `isTscMember` from `false` to `true` along with updating other missing information like, for example, your `slack` ID.

Check the current list of [TSC members](https://www.asyncapi.com/community/tsc) on the AsyncAPI website.

## How to reach out to the TSC
There are several ways to reach out to the TSC members:
* Join the [AsyncAPI Slack](https://www.asyncapi.com/slack-invite) and ping the `@tsc` group to ask questions or share your thoughts.
* Mention the `@asyncapi/tsc_members` GitHub team in any issue, discussion, or pull request. This will also send a message in the `95_bot-tsc-members-mentioned` channel in Slack.

> [!IMPORTANT]
> Please remember that the TSC members are volunteers and may not respond immediately.
> Please be patient and respectful. Also, it will be helpful if there is as little spam as possible. For more information, please refer to the [Slack Etiquette](../060-meetings-and-communication/slack-etiquette) document.


[code-owners]: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners

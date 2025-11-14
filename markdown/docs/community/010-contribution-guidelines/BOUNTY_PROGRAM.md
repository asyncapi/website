---
title: AsyncAPI Bounty Program
weight: 160
---

# AsyncAPI Bounty Program


## Preface

The main motivation behind the AsyncAPI Bounty Program at its time was to create a sustainable model for [redistributing sponsor-contributed funds](https://github.com/orgs/asyncapi/discussions/541) directly to maintainers, ensuring they are financially rewarded for their work. The Program's approach helps provide at least a little compensation for the rendered selfless service and meaningful contributions.


## Overview

The AsyncAPI Bounty Program is a specification of the software development process customized to meet the needs of the AsyncAPI Initiative.

The AsyncAPI Bounty Program operates exclusively on donated funds, does not seek financial profit, uses publicly and freely available tools only, and has as its main purpose rewarding individual open source maintainers and contributors of **Middle** and **Senior** professional levels while creating an artificial set of time constraints to make the schedule for achieving assigned targets predictable.

Anyone may implement this specification of the software development process with or without any modification in any way they find suitable.


## Budget

The budget of the Bounty Program per calendar year is twenty thousand US dollars and 00 cents (USD 20,000.00), which is five thousand US dollars and 00 cents (USD 5,000.00) per calendar quarter (three calendar months).

The reward for completion of the Bounty Issue of Complexity Level `Medium` is two hundred US dollars and 00 cents (USD 200.00).

The reward for completion of the Bounty Issue of Complexity Level `Advanced` is four hundred US dollars and 00 cents (USD 400.00).

The approximate maximum quantity of Bounty Issues per calendar quarter round varies from thirteen to twenty-five (from ((12 * 400) + (1 * 200)) to (25 * 200)).


## Prioritization Of Participants

Bounty Program Participants are prioritized in the following order:

1. AsyncAPI Maintainers (from the Bounty Issue's repository or from other AsyncAPI repositories who have a prior agreement with the Bounty Issue repository's Maintainers to work on the Bounty Issue), checked at [MAINTAINERS.yaml](../../MAINTAINERS.yaml)

2. Regular contributors (GitHub users who have three or more Pull Requests merged throughout the AsyncAPI GitHub Organization, checked with https://github.com/search?q=org%3Aasyncapi+is%3Apr+is%3Amerged+author%3Agh_username).

3. Other (if a GitHub user doesn't fall under the above categories, the AsyncAPI Maintainer can determine the criteria, i.e., regular volunteers, etc.)

Assignment of the Bounty Issue on GitHub to users that fall under the first category can be performed immediately after the addition of the GitHub label `bounty` according to GitHub's timestamp.

Assignment of the Bounty Issue on GitHub to users that fall under the second and third categories is performed not earlier than three calendar days after the addition of the GitHub label `bounty` according to GitHub's timestamp.


## Bounty Issues' Numbering

To ensure ease of referencing, searching, and automation, a strictly defined format of Bounty Issues' numbering is used:

1. In submissions of GitHub issues for the Bounty Program: `[repo]#[issue]` (`cli#38`)

2. In invoices claiming reward: invoice's subject `Bounty [repo]#[issue]` (e.g., `Bounty cli#38`), tag `bounty` (two rewards can be joined into one sum, in this case a comma and a space must be used in the invoice's subject as a separator for Bounty Issues' numbers, e.g., `Bounty cli#38, cli#361`)


## Clarification Of Time Periods

Due to the asynchronous nature of the AsyncAPI Initiative itself and thus its Bounty Program, UTC offset in Bounty Program Issues' starting and ending dates is used. Starting dates should be considered to have started at `00:00:00 UTC+12:00`, and ending dates should be considered to have ended at `23:59:59 UTC-12:00` (inclusive.)


## Bounty Issue's Submission

GitHub issues for participation in the upcoming calendar quarter round of the Bounty Program that are candidates to become Bounty Issues, and are agreed upon for participation in the Bounty Program by all active Maintainers of the given repository, are submitted during the first and second full (seven-day) calendar weeks of the last month of the current calendar quarter after the call for such submission, in the comments of the dedicated [AsyncAPI Organization's Discussion](https://github.com/orgs/asyncapi/discussions), by an AsyncAPI Maintainer who will be responsible for the resolution of the given Bounty Issue from the AsyncAPI's side, containing the following five fields:

1. Number: `cli#361`

2. Full GitHub link: https://github.com/asyncapi/cli/issues/361

3. Scope: `We need to extend the functionality of '--version' flag in AsyncAPI CLI to include info about versions of other AsyncAPI libraries used in the project`

4. Complexity Level: `Medium` | `Advanced`

5. Type: `Coding` | `DevOps` | `Docs` | `Design`

Submitted GitHub issues undergo public pre-moderation by the AsyncAPI Community to ensure adherence to the values of the AsyncAPI Initiative. In case a GitHub issue does not pass pre-moderation, it is not accepted for participation in the upcoming calendar quarter round of the Bounty Program.

In case documentation must be provided together with the solution requested in the Bounty Issue, such requirement should be explicitly stated in the Scope.

In case two Bounty Issues are inextricably linked and cannot be completed separately from each other, such connection must be explicitly stated in the Scope.

In case the total reward for all submitted Bounty Issues exceeds the budget allocated for the upcoming calendar quarter round of the Bounty Program, a full list of submitted Bounty Issues undergoes randomization using the randomization service provided by [random.org](https://random.org). Inextricably linked Bounty Issues, in this case, get joined into one generic issue (e.g., `cli#361-cli#38`) for the sake of randomization. After randomization, the resulting randomized list is crawled from the beginning until the total reward for the Bounty Issues reaches the amount of the budget allocated for the upcoming calendar quarter round of the Bounty Program.

In case the reward for the last Bounty Issue in the resulted randomized list generates an excess of the budget, this and all following issues until the end of the resulted randomized list are excluded from participation in the upcoming calendar quarter round of the Bounty Program. Such Bounty Issues are allowed to be submitted during the submission of Bounty Issues for the next calendar quarter round of the Bounty Program.

All GitHub issues selected as Bounty Issues get labels on GitHub:

- GitHub label `bounty`

- text label indicating calendar quarter round of the Bounty Program in which Bounty Issue participates (e.g., `bounty/2024-Q3`)

- text labels `bounty/medium` | `bounty/advanced` according to the Complexity Level of the Bounty Issue

- text labels `bounty/coding` | `bounty/devops` | `bounty/docs` | `bounty/design` according to the Type of the Bounty Issue

GitHub issues selected as Bounty Issues can be viewed with GitHub's Project View tool at https://github.com/orgs/asyncapi/projects/36
This project view is also visible to non-logged-in/non-GitHub users.


## Bounty Issue's Timeline

The start date in the Bounty Program is counted from Monday of the next week when assignment of the Bounty Issue on GitHub happened.

In case the Bounty Issue on GitHub was assigned during the third or fourth full (seven-day) calendar week of the last month of the calendar quarter, the start date in the Bounty Program is counted from the first Monday of the new calendar quarter round.

For Bounty Issues of Complexity Level `Medium`:

- Draft Pull Request, [linked to the Bounty Issue using a keyword](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue) if applicable, must be submitted no later than Sunday of the second week from the start date and updated every week no later than Sunday, until submission of Final Pull Request and the start of its merging process

- Final Pull Request must be submitted, and its merging process must start no later than Sunday of the fourth week from the start date, with the merging process' successful ending no later than Sunday of the sixth week from the start date

For Bounty Issues of Complexity Level `Advanced`:

- Draft Pull Request, [linked to the Bounty Issue using a keyword](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue) if applicable, must be submitted no later than Sunday of the third week from the start date and updated every week no later than Sunday, until submission of Final Pull Request and the start of its merging process

- Final Pull Request must be submitted, and its merging process must start no later than Sunday of the sixth week from the start date, with the merging process' successful ending no later than Sunday of the eighth week from the start date

Updates to the Draft Pull Request are determined by:

- activity in the `Commits` section of the Draft Pull Request

- activity of the automated code analysis service that runs on every commit (`SonarCloud`)

If no Pull Request is involved, updates on the Bounty Issue are determined by:

- activity in the Bounty Issue's comments

In case the Bounty Program Participant has not provided a weekly update to the Draft Pull Request and/or on the Bounty Issue (on Monday, the last activity of any of the abovementioned types was four or more calendar days before, e.g., on `2024-05-20`, the last activity of any type was on `2024-05-16` or earlier,) they are pinged as a reminder to do so.

In case the Bounty Program Participant has not provided an update to the Draft Pull Request and/or on the Bounty Issue after two pings over two consecutive Mondays, on the third consecutive Monday it is assumed that the task cannot be completed within the rest of the time, and that the Bounty Program Participant has silently dropped the Bounty Issue. Suspension rules are applied to such Bounty Program Participants, and the End Of Life rules are applied to such Bounty Issues.

In case the Bounty Program Participant has not provided the critical fixes required to make the Final Pull Request merging possible during the last week of the Timeline, they are pinged on Thursday, four days before the last day of the Timeline, to do so.

In case the Bounty Program Participant has not provided critical fixes during the next four days, on Monday, after the last day of the Bounty Issues' Timeline, it is considered that the Bounty Program Participant did not complete the Bounty Issue within the assigned Timeline due to their own misperformance. Suspension rules are applied to such Bounty Program Participants and the End Of Life rules to such Bounty Issues.


### Bounty Issue's Timeline Example

|Complexity Level|Assignment Date (by GitHub)|Start Date (by BP Rules)|End Date (by BP Rules)|Draft PR Submission|Final PR Merge Start|Final PR Merge End|
|----------------|---------------------------|------------------------|----------------------|-------------------|--------------------|------------------|
|Medium          |2024-06-21                 |2024-07-01              |**2024-08-11**        |2024-07-14         |2024-07-28          |**2024-08-11**    |
|Advanced        |2024-06-25                 |2024-07-01              |**2024-08-25**        |2024-07-21         |2024-08-11          |**2024-08-25**    |


## Extension Of Bounty Issue's Timeline

In case a response critical for the technical resolution of the Bounty Issue is delayed in [GitHub](https://github.com) and/or [Slack](https://asyncapi.slack.com) for a period of three or more consecutive working days, all remaining target dates of the Bounty Issue's Timeline are shifted by one calendar week per each of the three consecutive working days the critically important response was delayed. 'Working days' are weekdays, from Monday through Friday, with any holidays regarded as standard weekdays. Friday and Monday are considered consecutive weekdays.

In case of unpredicted [force majeure](https://iccwbo.org/wp-content/uploads/sites/3/2020/03/icc-forcemajeure-hardship-clauses-march2020.pdf) and/or circumstances that could not be foreseen and/or that are beyond the control of both the Bounty Program Participant and the AsyncAPI Maintainer, the Bounty Issue Timeline can be extended by a fixed or indefinite amount of time, with a fair explanation provided in the Bounty Issue's or Pull Request's comments.

Communication on the necessity of the Bounty Issue Timeline extension should happen prior to any current milestone of the Bounty Issue's Timeline approaching, with a reflection of the start of such communication in the Bounty Issue's or Pull Request's comments, in case a communication platform other than GitHub is used.


## Bounty Issue's Reclassification

Upon request of the AsyncAPI Maintainer, who is responsible for the resolution of the given Bounty Issue from the AsyncAPI's side in the Bounty Issue's comments in the process of resolution, the Complexity Level of the Bounty Issue can be reclassified in any direction (both lowered to `Medium` and heightened to `Advanced`), with corresponding changes to the Bounty Issue's Timeline in case of a need.

Reclassified Bounty Issue gets one of the historical text labels `bounty/downgraded` or `bounty/upgraded` accordingly.


## Bounty Issue's Completion

To avoid half-merges, unmet dependencies on the completion of other (inextricably linked) issues, waiting for merges of other separate PRs that provide critically important functionality for the given task, etc., and to avoid situations where AsyncAPI has already acquired an obligation to pay but factually the conditions of the Bounty Issue completion are not met yet, a system of double control with separation of concerns is exercised on the Bounty Issues:

- After the Bounty Issue's closure on GitHub, the AsyncAPI Maintainer, who was responsible for the resolution of the given Bounty Issue from the AsyncAPI's side, confirms the Bounty Issue's technical resolution by posting a separate confirming comment in this Bounty Issue's comments (followed by another confirming comment from the AsyncAPI Maintainer of this specific repository, if these were two different persons.)

- The Bounty Program Participant proceeds with the process of claiming the reward only after the second comment from the Bounty Program Coordinator, confirming the Bounty Issue completion and readiness to perform the payout.


## Bounty Issue's End Of Life

GitHub issue participates in the Bounty Program and is considered a Bounty Issue starting from the second of addition of the GitHub label `bounty` according to GitHub's timestamp until the Bounty Issue's End Of Life, which starts after the last second of the last day of the first calendar month since the start of the calendar quarter round of the Bounty Program it was introduced in, inclusive.

In case a Bounty Issue gets an assignee before the End Of Life and continues to have an assignee after the End Of Life, it continues to be a Bounty Issue until completion.

In case a Bounty Issue does not get an assignee before the End Of Life, after reaching End Of Life, it gets the historical text label `bounty/unpicked` and is considered the one that reached End Of Life.

In case a Bounty Issue gets an assignee before the End Of Life and is dropped after the End Of Life, it gets the historical text label `bounty/dropped` and is considered the one that reached the End Of Life.

In case a Bounty Issue gets an assignee before the End Of Life and does not get completed within the assigned Timeline after the End Of Life due to the Bounty Program Participant's misperformance, it gets the historical text label `bounty/misperformed` and is considered the one that reached End Of Life.

In case a Bounty Issue gets an assignee before the End Of Life and, during its technical resolution, it becomes clear that this Bounty Issue cannot be completed due to unpredicted [force majeure](https://iccwbo.org/wp-content/uploads/sites/3/2020/03/icc-forcemajeure-hardship-clauses-march2020.pdf) and/or circumstances that could not be foreseen and/or that are beyond the control of both the Bounty Program Participant and the AsyncAPI Maintainer, it gets the historical text label `bounty/canceled` and is considered the one that reached End Of Life.

Bounty Issue that reached End Of Life gets the historical text label `bounty/eol`, the reward for this Bounty Issue gets excluded from the budget allocated for the corresponding calendar quarter round of the Bounty Program, and this Bounty Issue becomes a regular GitHub issue, which can be submitted again as a Bounty Issue Candidate.

A dropped Bounty Issue can not be assigned again to the same Bounty Program Participant who dropped it in the next calendar quarter rounds of the Bounty Program.


## Additional Conditions

The Bounty Program operates on a mutual-exclusion basis: during the time of participation of a GitHub issue in the Bounty Program, contributions (code, documentation, design, and other solutions) are accepted only from the assigned Bounty Program Participants.

AsyncAPI Maintainers are allowed to work on Bounty Issues submitted by themselves.

Bounty Program Participant is allowed to choose up to two Bounty Issues of any Complexity Level for simultaneous resolution.

Two or more GitHub issues (each of which individually has a Complexity Level lower than `Medium` or those that are coupled tightly but not inextricably) can be aggregated to form one Bounty Issue with a Complexity Level `Medium`, which is then submitted for participation in the Bounty Program. Aggregated Bounty Issues have the prefix `[BOUNTY]`.

The Bounty Program Participants that fall under the second and third categories should explain in meaningful words how they are going to approach the resolution process when expressing a desire to work on a Bounty Issue.

All Bounty Program-related activities of the Bounty Program Participants that fall under the second and third categories (expression of a desire to work on a Bounty Issue, explanation of the presumed approach to the resolution of the Bounty Issue, etc.) are taken into consideration only if they occurred after the addition of the GitHub label `bounty` to the GitHub issue.

GitHub label `bounty` has hex code `#0E8A16`.


## Claiming The Reward

Claiming the reward for the completed Bounty Issue is done via the submission of an invoice at the dedicated [AsyncAPI Bounty Program 2025 page on Open Collective](https://opencollective.com/asyncapi/projects/asyncapi-bounty-program) (button '`ACTIONS`', dropdown option '`Submit expense`').

**Before the submission of the invoice, the Bounty Program Participant MUST ensure that the account they will use for the payout is VERIFIED by their financial institution, fully operational, and able to receive payments.**

Requirements for the invoice:

- Make sure that your `Full Name` on GitHub, as well as `Legal Name` and `Full name of the account holder` on the invoice, **are the same** and are YOUR REAL LEGAL NAME according to the passport/ID (on Open Collective, nicknames are allowed only in `Settings / Public profile / Display name`, and it is **this** name that will be displayed publicly throughout all https://opencollective.com if you have privacy concerns)

- **Expense title**: '`Bounty [repo]#[issue]`' (e.g., '`Bounty cli#38`' or '`Bounty cli#38, cli#361`' in case of two rewards being joined into one sum)

- **Tag**: '`bounty`'

- **Set invoice details / Description**: mention the full URL of the GitHub issue which served as the Bounty Issue

AsyncAPI does not perform financial transactions itself and relies on Open Collective's Fiscal Host 'Open Source Collective' to service payments and, thus, [comply with global sanctions](https://docs.oscollective.org/how-it-works/basics/expense-policies-and-limitations#permitted-countries-ofac-checks-and-payments-to-certain-countries). However, it has been empirically proven that even if the Bounty Program Participant is a citizen of a sanctioned jurisdiction, they can still receive the financial payment made to a payee in a non-sanctioned jurisdiction. Taking this into account, **potential Bounty Program Participants must [check themselves](https://wise.com/help/articles/2978049/which-countries-can-i-use-wise-in) to see whether they will be able to receive payment prior to starting participation in the Bounty Program**. AsyncAPI will not take any action if Open Source Collective refuses to relay the payment due to US or global sanctions imposed on a jurisdiction or an individual.

Also, note that if a Bounty Program Participant submits invoice expenses for more than six hundred US dollars and 00 cents (USD 600.00) per calendar year to a Collective at Open Collective with a Fiscal Host in the US (AsyncAPI fits this description,) they will be asked to fill out an IRS tax information form, which will be either a `W-8BEN` or a `W-8BEN-E` depending on whether the Bounty Program Participant has the legal status of an individual or of a sole proprietor, **supplying a local Tax ID**, **regardless** of their US citizenship status.

At the time of writing (2023-10-01), Open Collective supports `ACH`, `International SWIFT through Wise` (limitations of financial technology company 'Wise' are applied), and `PayPal` as automated payout methods. In rare cases (once per calendar year), Bounty Program Participant in personal communication with Open Collective can request them to perform a payout using a custom payment method to a non-sanctioned jurisdiction.


## Suspension

Each new Bounty Program Participant starts participation in the Bounty Program with a quantity of Suspensions equal to zero.

In case a Bounty Program Participant stops rendering services directed toward resolution of the (**one**) Bounty Issue without any communication on the subject ('silently dropped') and/or fails to complete the (**one**) Bounty Issue within the assigned Timeline due to their own misperformance, for the **first time**, they receive a **First Suspension** and will be prohibited from participating in the Bounty Program **starting from the current moment and during two calendar months from the beginning of the next full (three-month) calendar quarter**. After this period, the First Suspension expires.

In case a Bounty Program Participant stops rendering services directed toward resolution of the (**one**) Bounty Issue without any communication on the subject ('silently dropped') and/or fails to complete the (**one**) Bounty Issue within the assigned Timeline due to their own misperformance, for the **second time** during five calendar months from the beginning of the next full (three-month) calendar quarter after the expiration of the First Suspension, they receive a **Second Suspension** and will be prohibited from participating in the Bounty Program **starting from the current moment and during eight calendar months from the beginning of the next full (three-month) calendar quarter**. After this period, the Second Suspension expires.

In case a Bounty Program Participant stops rendering services directed toward resolution of **one of two** Bounty Issues, chosen for simultaneous resolution, without any communication on the subject ('silently dropped') and/or fails to complete **one of two** Bounty Issues chosen for simultaneous resolution within the assigned Timeline due to their own misperformance, for the **first time**, they receive a **First Suspension** and will be prohibited from participating in the Bounty Program **during two calendar months from the beginning of the next full (three-month) calendar quarter**. After this period, the First Suspension expires.

In case a Bounty Program Participant stops rendering services directed toward resolution of **one of two** Bounty Issues, chosen for simultaneous resolution, without any communication on the subject ('silently dropped') and/or fails to complete **one of two** Bounty Issues chosen for simultaneous resolution within the assigned Timeline due to their own misperformance, for the **second time** during five calendar months from the beginning of the next full (three-month) calendar quarter after the expiration of the First Suspension, they receive a **Second Suspension** and will be prohibited from participating in the Bounty Program **during eight calendar months from the beginning of the next full (three-month) calendar quarter**. After this period, the Second Suspension expires.

In case a Bounty Program Participant stops rendering services directed toward resolution of **two** Bounty Issues, **simultaneously** without any communication on the subject ('silently dropped'), or fails to complete **two** Bounty Issues within the assigned Timeline due to their own misperformance **simultaneously**, or engages in any combination of the above actions, including scenarios such as misperforming one Bounty Issue and silently dropping another  **simultaneously**, they receive a **Second Suspension** immediately and will be prohibited from participating in the Bounty Program **starting from the current moment and during eight calendar months from the beginning of the next full (three-month) calendar quarter**. After this period, the Second Suspension expires.

The reward for the completed Bounty Issue (Bounty Issues) is not paid to the Bounty Program Participant who was assigned Suspension for this Bounty Issue (Bounty Issues) even in the case of its (their) voluntary completion.

After the expiration of the Second Suspension or after five calendar months from the beginning of the next full (three-month) calendar quarter after the expiration of the First Suspension, if no Second Suspension was received during this time, their Suspension history is considered clean, and the quantity of Suspensions is reset to zero.

A dedicated list is used for the purpose of tracking current Suspension history.


## Sources

This document is the consolidated and formalized version of all information publicly available in free form at

##### https://github.com/orgs/asyncapi/discussions/541#discussioncomment-5462792
##### https://github.com/orgs/asyncapi/discussions/877#discussioncomment-6970799
##### https://docs.opencollective.com/help/expenses-and-getting-paid/tax-information
##### https://asyncapi.slack.com/archives/C05UHTSEHE2/p1699433566459269
##### https://github.com/asyncapi/community/pull/897#discussion_r1390778779
##### https://github.com/asyncapi/community/issues/1072

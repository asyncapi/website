---
title: 'AsyncAPI Bounty Program Summary - 2024'
date: 2024-09-12T00:00:00+00:00
type: Community
tags:
  - Community
cover: /img/posts/bounty-program/photo-from-starship-cockpit.jpeg
authors:
  - name: Viacheslav Turovskyi
    photo: /img/avatars/aeworxet.webp
    link: https://github.com/aeworxet
    byline: Bounty Program Coordinator
excerpt: 'Annual update on the quarterly published set of tasks that are currently in demand among AsyncAPI Maintainers, targeted at engineers of Middle and Senior professional levels.'
---

## AsyncAPI Bounty Program

Since ancient times, sponsors furiously wanted to support Open Source. AsyncAPI addressed that need by starting to quarterly publish for Middle and Senior engineers a set of tasks that are currently in demand among AsyncAPI Maintainers and rewarding their completion using accumulated donated funds.

During one year of existence of the [AsyncAPI Bounty Program](https://github.com/orgs/asyncapi/projects/36/?pane=info):

- 32 GitHub issues were resolved, [16 of which](https://github.com/orgs/asyncapi/projects/36/views/4?filterQuery=-no%3Alevel+-round%3A%22bounty%2F2023-pilot%22&sliceBy%5BcolumnId%5D=77803059&sliceBy%5Bvalue%5D=advanced) had complexity level `Advanced`;

- [50+ PRs](https://github.com/orgs/asyncapi/projects/36/views/4?sliceBy%5BcolumnId%5D=78904519&filterQuery=no%3Aresponsible+-round%3A%22bounty%2F2023-pilot%22+) were merged in total;

- [8000+ USD](https://opencollective.com/asyncapi/expenses?limit=30&tag=bounty&period=2023-09-30T21%3A00%3A00.000Z%E2%86%92all&collectiveSlug=asyncapi&status=PAID) were paid out as rewards.

### Benefits for FOSS Community
- At least [one issue](https://github.com/springwolf/springwolf-core/issues/820#issuecomment-2257879523) was closed in a third-party project due to a fixed bug in AsyncAPI's software.


### Benefits for AsyncAPI GitHub Organization
Thanks to the Bounty Program Participants, AsyncAPI got:

- [Automation in Technical Steering Committee voting process](https://github.com/orgs/asyncapi/projects/36/views/4?sliceBy%5BcolumnId%5D=78904519&sliceBy%5Bvalue%5D=community%231093&filterQuery=) ([Aayush Saini](https://github.com/AayushSaini101)): New automation and the [process around voting](https://github.com/asyncapi/community/blob/master/voting.md) have been introduced, as well as [transparent summaries](https://github.com/asyncapi/community/blob/master/TSC_VOTING_OVERVIEW.md) of each voting activity.

- New monorepo setup in [generator](https://github.com/orgs/asyncapi/projects/36/views/4?filterQuery=&sliceBy%5BcolumnId%5D=78904519&sliceBy%5Bvalue%5D=generator%231044) and [parser-js](https://github.com/orgs/asyncapi/projects/36/views/4?filterQuery=&sliceBy%5BcolumnId%5D=78904519&sliceBy%5Bvalue%5D=parser-js%23963) ([Ayush Nautiyal](https://github.com/ayushnau)): Consolidation of smaller repositories into these two larger projects helped unify the dispersed community within the organization, fostering collaboration in a single location and accelerating development.

- Saving of costs on DigitalOcean ([Ashish Padhy](https://github.com/shurtu-gal)): AsyncAPI was running out of credits too fast, and with [proper deployment changes](https://github.com/asyncapi/server-api/issues/317), it's not the case anymore.

- GitHub Action refactored from scratch to use CLI ([Ashish Padhy](https://github.com/shurtu-gal)): Simplification is always a driver for innovation. Now official GitHub Action from AsyncAPI supports not only AsyncAPI Generator but also 1:1 all features from the CLI.

- Not just any but AMAZING [cheat sheet poster](https://github.com/asyncapi/website/issues/425#issuecomment-2121214509) ([Aishat Muibudeen](https://github.com/Mayaleeeee)): It is not only available [for download](https://asyncapi.com/cheatsheet), but is also used at AsyncAPI conferences.

![](/img/posts/bounty-program/362263381-acc75432-0f58-4c96-a65f-f172d34ee4ec.jpg)


### Benefits for AsyncAPI Maintainers

The Bounty Program gives AsyncAPI Maintainers the possibility:

- To announce a financial reward for GitHub issues that are currently in demand by the maintained project or the AsyncAPI Initiative as a whole, on which AsyncAPI Maintainers can either work and get rewarded themselves or delegate those issues to regular contributors who have more time and/or the necessary expertise.


### Benefits for Bounty Program Participants

Typical benefits of the Bounty Program for its Participants who are in the early stages of their career are:

- Development of a better approach to the evaluation of issues (it's fun reading messages from two months ago saying, '1-2 weeks left'.)

- First/differing working experience (fully asynchronous distributed teams are still rare, unlike partially asynchronous distributed ones.)

- Development of the possibility to showcase to the potential employer real-world work not obscured by an NDA.


With all that said, join a finally sure way to directly sponsor (and get rewarded for) FOSS development.

Giggly thing as a finishing touch: [PR](https://github.com/asyncapi/website/pull/3111/files) for a bug due to which several lines were output incorrectly to the front end.

Co-authored-by: [Lukasz Gornicki](https://github.com/derberg)

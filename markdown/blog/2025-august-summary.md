---
title: "Monthly Community Update: August 2025"
date: 2025-09-04T06:00:00+01:00
type: Communication
tags:
  - Project Status
cover: /img/posts/2025-blog-banner/banner-aug.webp
authors:
  - name: Thulisile Sibanda
    photo: /img/avatars/thulieblack.webp
    link: https://www.linkedin.com/in/v-thulisile-sibanda/
    byline: Community Builder and Open Source Fanatic!
excerpt: 'AsyncAPI community and project updates for August 2025'
featured: true
---

As summer vacation comes to an end and we welcome everyone back from their holidays, it has been a busy season for some community builders and maintainers. Many have been actively pushing various initiatives and working on their projects. We have also been focusing on achieving our goals and improving existing initiatives. Let’s take a look at the community updates from August.

## Sponsors
We are excited to share that [Aklivity](https://www.aklivity.io) has renewed again this year as our Silver Sponsor. Thank you to Leonid Lukyanov for his continued support.

<a href='https://www.aklivity.io' target='_blank'>
<img src='/img/sponsors/aklivity_logo.png' alt='Aklivity' width='500px' />
</a>


## AsyncAPI Conferences 2025
We still have a few Call for Speakers opportunities available for our upcoming conferences. Please help us share these, and also encourage the community to submit proposals. We want to hear and learn from you. 

We have the:
- [AsyncAPI Online Conference](https://conference.asyncapi.com/venue/Online) submissions are closing on **7th September.**
- [AsyncAPI Paris Edition submissions](https://conference.asyncapi.com/venue/Paris) are closing on **5th October** (*make sure to select the "**AsyncAPI**" track when submitting your proposal*).
- [AsyncAPI Summit at DeveloperWeek 2026](https://confengine.com/conferences/asyncapi-summit-at-developerweek2026) is closing on **7th November**.

### London 2025

We have less than three weeks until the AsyncAPI London Edition, and we are excited to share that we have **FREE Community Tickets** to give to our community members.

This year's conference features an impressive lineup of speakers; be sure to [check the agenda on the conference website](https://conference.asyncapi.com/venue/London) soon (*we are still finalising the scheduling*).

To redeem your ticket, please follow these simple steps:

1. Click on the [ticket link](https://ticket.apidays.global/event/apidays-london-2025/72d72730-dbf4-47d0-aa07-aa9da87d28ca).
2. Select one ticket from the **Apidays London Regular Tickets**.
3. Use the code "**AsyncAPIVIP**" to redeem your free ticket.
4. Fill in your details, and we’ll see you at the event!

### Bangalore 2025

[The first batch of speakers for the AsyncAPI Bangalore Edition is now live on the conference website](https://conference.asyncapi.com/#speakers). We are currently working with the organisers to secure additional speaker slots for the AsyncAPI track. Once finalised, we will update the conference website with the agenda.

Please keep an eye on the [`#07_events` channel on Slack](https://asyncapi.slack.com/archives/C023A76SV2Q) for announcements on the progress, scheduling, and ticket updates.

## Spec x Tooling
As I mentioned, some maintainers have been working to improve their projects. One of the initiatives undertaken by the AsyncAPI Generator team is to improve the contribution guide and introduce multiple maintainer roles.

They added various maintainer roles on the repository, including triagers, champions, and committers, each with different scopes and responsibilities. Be sure to check out the [AsyncAPI Generator Contribution Guide](https://github.com/asyncapi/generator/blob/master/CONTRIBUTING.md) to learn more about the changes happening in the repository.


## AsyncAPI Documentation Report 2025

Over the past few months, I have been working together with docs contributors to improve the AsyncAPI community documentation, complete the pending style guide documentation, and improve the structure of the community repository.

And I'm very excited to share what we have achieved so far.

1. **Community to Website Repo Workflow**: To achieve our goal of integrating community documentation onto the website, we needed a workflow that automatically pushes all merged documents from the community repository to the website and deploys them live. [Animesh Kumar](https://github.com/animeshk923) led this contribution, [and we now have a functioning workflow in place](https://github.com/asyncapi/community/blob/master/.github/workflows/update-docs-in-website.yml).
2. **Expand Community Documentation**: We lacked enough onboarding materials for diverse roles we have in the community, such as documentation contributors, code contributors, ambassadors, maintainers, etc, it made the onboarding experience not efficient, and to reduce the number of onboarding calls, [Anton Zolotukhin](https://www.linkedin.com/in/mister-gold) and I co-mentored as part of the 2024 Mentorship Program. The hard work of [Ezinne Anne Emilia](https://github.com/ezinneanne) and [Prince Onyeanuna](https://github.com/Aahil13), is now part of the [community content bucket, live on the AsyncAPI website](https://www.asyncapi.com/docs/community/000-onboarding).
3. **Complete the AsyncAPI Style Guide**: As an Open-Source community with diverse contributors, maintaining consistency in our work is crucial. We needed to ensure clarity, uniformity, and consistency in the voice and tone of our documentation. Having all technical writers follow the same guidelines allows readers to find the information more easily and understand how to use our specifications and tooling. We couldn't have done it without our amazing contributors [Karuna Tata](https://github.com/starlightknown), [Rohit T](https://github.com/TRohit20), [Bhaswati Roy](https://github.com/BhaswatiRoy), [Thulisile Sibanda](https://github.com/thulieblack), [Christine Belzie](https://github.com/CBID2), and [Ezinne Anne Emilia](https://github.com/ezinneanne). You can check out [the AsyncAPI Style Guide docs](https://www.asyncapi.com/docs/community/011-styleguide) live on our website.
4. **Community Repo Reorg**: With the growth and new documents being authored, it was essential to bring structure, accessibility, and discoverability to the community repo. We needed to improve navigation and consistency. As part of the AsyncAPI Bounty Program, [Anton Zolotukhin](https://www.linkedin.com/in/mister-gold) worked on restructuring and rearranging the page weights.


These efforts demonstrate the importance of documentation and its contribution to the overall AsyncAPI ecosystem. This is attested by the fact that we have garnered over **68 036 sessions** and **22 456 new users** from January to August 2025.

Our tutorials and reference content bucket have the highest number of new visitors. 

| Content Bucket   | Sessions | New Users |
|------------------|----------|--------------|
| `/docs/concepts` | 12 909   | 2 898 |
| `/docs/tutorials`| 18 576   | 7 435 |
| `/docs/tools`    | 9 728    | 2 647 |
| `/docs/guides`   | 1 881    | 548   |
| `/docs/reference`| 18 331   | 7 034 |
| `/docs/migration`| 891      | 253   |
| `/docs/community`| 329      | 131   |

We can also see below the analytics of the onboarding and style guide docs, after completing the reorganisation work on the community repository from August 5, 2025, to August 29, 2025.

| Community Bucket | Page Views | Users|
|------------------|------------|------|
|`/community/onboarding` | 783   | 280  |
|`/community/styleguide` | 641   | 331  |


## Maintainership Program
We are officially on the road to Maintainership after recently completing the AsyncAPI Mentorship Program 2024. As part of our preparation, [we are currently creating a set of documentation](https://github.com/asyncapi/community/issues/1766) to ensure that the program is well-documented and serves as a valuable resource for both our mentors and mentees. 

To understand how we have transitioned on this path, you can read about it in the [Mentorship Program 2024 wrap-up summary](https://www.asyncapi.com/blog/2024-mentorship-program-summary), as well as explore the metrics outlined in the [Mentorship Program Metrics article](https://www.asyncapi.com/blog/2024-mentorship-metrics).

## TSC x Ambassadors

We are excited to welcome [Adi Boghawala](https://www.linkedin.com/in/adi-boghawala) as our newest addition to the AsyncAPI TSC members.

<Profiles profiles={[
  {
    name: 'Adi Boghawala',
    avatar: 'https://avatars.githubusercontent.com/u/114283933?v=4',
    link: 'https://www.github.com/Adi-204'
  }
]} />

## Coming in September
- **AsyncAPI Community Updates Newsletter** - The September Edition will be making its way to your inbox on the 5th. [Please subscribe to the AsyncAPI Newsletter](https://www.asyncapi.com/newsletter); don't miss the updates.
- **AsyncAPI Conference London Edition** - Get your **Free Tickets** to the London Conference, and we can't wait to see you there. Be sure to also catch us at the `API Standards Booth`, where you'll find some of our AsyncAPI experts and maintainers.

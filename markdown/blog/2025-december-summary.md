---
title: "Monthly Community Update: November & December 2025"
date: 2025-12-22T06:00:00+01:00
type: Communication
tags:
  - Project Status
cover: /img/posts/2025-blog-banner/banner-dec.webp
authors:
  - name: Thulisile Sibanda
    photo: /img/avatars/thulieblack.webp
    link: https://www.linkedin.com/in/v-thulisile-sibanda/
    byline: Community Builder and Open Source Fanatic!
excerpt: 'AsyncAPI community and project updates for November and December 2025'
featured: true
---

Well, believe it or not, we are in the final weeks of 2025! It's been a great year as we navigated crucial growth in the community and, of course, some challenges along the way. Most importantly, we have new experiences that continuously make us better.

As this is the last summary of the year, I'll keep it short, highlight some of the details that happened in November and December, and give a quick glimpse of what to expect next year.


## AsyncAPI Conferences

### Paris

Paris hosted the last conference of the year, which spanned three busy days. The biggest highlight of the conference was the API Standards booth, which we shared with friends from GraphQL, JSON Schema, and OpenAPI. It was a busy moment with attendees interested in our work, and many ever surprised by our focus on promoting Open Source.

On the third day, we had the AsyncAPI track, which included a variety of talks, with the ambassador panel as the highlight of the event.

<Figure
  src="/img/posts/2025-blog-banner/ambassadors.webp"
  caption="AsyncAPI Ambassadors Panel"
  className="text-center"
/>

A huge thank you to our speakers, TSC members, and Ambassadors for volunteering at the booth, delivering presentations, and sharing their valuable insights.

<Profiles profiles={[
  {
    name: 'Daniel Kocot',
    avatar: 'https://avatars.githubusercontent.com/u/466609?v=4',
    link: 'https://github.com/danielkocot'
  },
  {
    name: 'Florence Njeri',
    avatar: 'https://avatars.githubusercontent.com/u/40742916?v=4',
    link: 'https://github.com/Florence-Njeri'
  },
  {
    name: 'Fran Méndez',
    avatar: 'https://avatars.githubusercontent.com/u/242119?v=4',
    link: 'https://github.com/fmvilas'
  },
  {
    name: 'Dale Lane',
    avatar: 'https://avatars.githubusercontent.com/u/1444788?v=4',
    link: 'https://github.com/dalelane'
  },
  {
    name: 'Hugo Guerrero',
    avatar: 'https://avatars.githubusercontent.com/u/1001939?v=4',
    link: 'https://github.com/hguerrero'
  },
  {
    name: 'Jonas Lagoni',
    avatar: 'https://avatars.githubusercontent.com/u/13396189?v=4',
    link: 'https://github.com/jonaslagoni'
  },
  {
    name: 'Ludovic Dussart',
    avatar: 'https://avatars.githubusercontent.com/u/5501911?v=4',
    link: 'https://github.com/M3lkior'
  },
  {
    name: 'Samir Amzani',
    avatar: 'https://avatars.githubusercontent.com/u/554438?v=4',
    link: 'https://github.com/Amzani'
  },
  {
    name: 'Naresh Jain',
    avatar: 'https://avatars.githubusercontent.com/u/38799?v=4',
    link: 'https://github.com/nashjain'
  },
  {
    name: 'Laurent Broudoux',
    avatar: 'https://avatars.githubusercontent.com/u/1538635?v=4',
    link: 'https://github.com/lbroudoux'
  }
]} 
/>

### Developer Week 2026
Planning for the AsyncAPI Conference at DeveloperWeek 2026 is underway. Speakers are selected, and final confirmation emails have also been sent. 
The agenda is being finalized, and the conference tickets will be shared at the beginning of January.

### AsyncAPI Conference 2026

We're exploring new venues or partners who would love to host us for 2026. If you or your company can host us, or know conference organizers who would be open to have an AsyncAPI track, please share your thoughts and insights in the [AsyncAPI conference venues for 2026 discussion](https://github.com/asyncapi/community/issues/2133).

## AsyncAPI NPM Packages Security Update

Several AsyncAPI NPM packages were compromised after an attacker injected a worm into specific versions. [Charlie Eriksen](https://www.linkedin.com/in/charlie-eriksen-a318578) first identified and reported the compromised packages, while [Łukasz Górnicki](https://www.linkedin.com/in/lukasz-gornicki-a621914) led the efforts to deprecate affected versions and worked through challenges with the NPM review process.

[Ashish Padhy](https://www.linkedin.com/in/ashish-padhy3023) supported the investigation into a GitHub Actions workflow vulnerability that likely enabled the credential theft, and [Fran Méndez](https://www.linkedin.com/in/fmvilas) rotated all secrets to secure our ecosystem moving forward.

Thanks to their quick action, the issue was contained and resolved. We’re grateful to each of them for their fast, transparent, and collaborative response.
[You can also read about the full incident details update](https://www.asyncapi.com/blog/shai-hulud-postmortem) written by [Ashish Padhy](https://www.linkedin.com/in/ashish-padhy3023) and [Florence Njeri](https://www.linkedin.com/in/florencenjeri).


## Spec x Tooling

### Official MIME types

The AsyncAPI media types are now officially registered under iana.org:
- [`application/asyncapi+json`](https://www.iana.org/assignments/media-types/application/asyncapi+json)
- [`application/asyncapi+yaml`](https://www.iana.org/assignments/media-types/application/asyncapi+yaml)

This transition from informal conventions to a globally recognized standard improves interoperability and strengthens tooling capabilities. Detailed information on this registration can be found in the [original specification issue](https://github.com/asyncapi/spec/issues/936).

### Spec Triage Meetings

We started doing public meetings about the specification, where we triage backlog and discuss proposals. Keep an eye [on the spec meeting issue if you're interested in joining](https://github.com/asyncapi/spec/issues/1131).

As [a result of the last meeting](https://github.com/asyncapi/community/issues/2187#issuecomment-3671287512), we scheduled the next AsyncAPI v3.1 release for January 2026. At the moment, we know that [ROS 2](https://github.com/asyncapi/spec/pull/1109) binding is scheduled for this release.

Stay tuned. We will for sure organize the third meeting in January. Three meetings in three months means we are getting regular and might transform into an official working group.

### Adding `AND` Logic In Security Section

We are seeking community input on [the proposal to change the `security` field type](https://github.com/asyncapi/spec/issues/1129) under the [`Server Object`](https://www.asyncapi.com/docs/reference/specification/v3.0.0#serverObject)

Specifically, we would like to understand use cases where there is a technical requirement for multiple authentication methods to be fulfilled simultaneously. Please share your experiences, especially if you can provide:

- Publicly known use cases involving simultaneous authentication.
- Example AsyncAPI documents where you have implemented workarounds to support this.
- Technical stories explaining why a single security requirement was insufficient for your needs.

## Final Remarks

I want to thank the community for taking the time to read the AsyncAPI monthly summary and for the consistent support. It has been amazing to contribute to our shared efforts throughout the year.

As we head to the holiday season, I wish everyone and your family a joyful time and a great 2026 ahead.

I'll be back next year with another detailed summary, including key insights and numbers.

**Until then, stay safe and happy holidays!**
---
title: "2024 Google Summer Of Code Wrap Up"
date: 2024-12-18T06:00:00+01:00
type: Community
tags:
  - Mentorship
  - GSoC
  - AsyncAPI
  - OSS
cover: /img/posts/gsoc.webp
authors:
  - name: Azeez Elegbede
    photo: /img/avatars/ace.webp
    link: https://twitter.com/_acebuild
    byline: AsyncAPI Preacher 
---

For the first time in our history with Google Summer of Code (GSoC), AsyncAPI proudly participated as an independent organization. In previous years, we had joined the program under Postman’s umbrella due to the challenges of being selected as a participating organization. With Postman’s higher chances of acceptance, they graciously allowed us to include some of our projects under their organization. This year, however, marked a significant milestone as AsyncAPI stepped into the spotlight on its own. 

The goal of this post is to share our GSoC journey and offer valuable insights for future organizations and contributors. By reflecting on what went well, the challenges we encountered, and the lessons learned, we hope to help others make the most of this incredible program.

Now, let’s dive into the key achievements and challenges of our participation this year.

## Key Achievements

Without a doubt, our biggest achievement this year has been participating in GSoC as an individual organization. For several years, AsyncAPI applied as a standalone organization but was never selected.

So, what changed this time? We took a step back to analyse potential reasons for our previous rejections and used those insights to refine our approach. One significant change was starting our preparation well ahead of the deadline. Special thanks go to [Azeez Elegbede](https://github.com/AceTheCreator), who led the effort by curating project ideas, crafting our organization application, reaching out to potential mentors, and engaging with interested contributors. Azeez worked closely with the incredible [Quetzalli](https://github.com/quetzalliwrites), whose expertise played a significant role in reviewing the application and project ideas, providing valuable guidance and support throughout the process.

To showcase the impact of this year’s participation, let’s look at some key community accomplishments achieved during GSoC 2024.

- This year, we achieved our highest number of project idea slots in the history of our GSoC participation, with a total of **7 slots**.
- For the first time, we had **4 ex-GSoC participants** return to the program as mentors, marking a significant milestone in building a cycle of mentorship and growth within our community.
- We received an impressive **77 project proposals**, the most we've ever had in our GSoC journey.
- Over **100 new contributors** joined our community from GSoC, showcasing the growing interest and engagement with AsyncAPI.
- AsyncAPI proudly participated as an organization at the **GSoC Summit in San Francisco**, where [Lukasz Gornicki](https://github.com/derberg), one of our community members, delivered a lightning talk. His presentation focused on fostering a system that guides GSoC contributors toward becoming maintainers with mentor support, showcasing our commitment to strengthening the open-source ecosystem.

We had a range of successful contributions that significantly advanced AsyncAPI projects such as:

- **[Ashmit Jagtap](https://github.com/ashmit-coder)** who contributed extensively to the AsyncAPI Conference website by addressing existing issues and bugs, adding testing capabilities with Cypress to improve the contributor experience, and implementing support for call for speakers registration for the online edition of the conference. Additionally, Ashmit reviewed pull requests, mentored potential contributors, and ultimately became a project maintainer.

- **[Vishvamsinh Vaghela](https://github.com/vishvamsinh28)** enhanced the stability of scripts on the AsyncAPI website by ensuring all scripts functioned as expected and writing comprehensive unit tests to ensure smooth operations on the website, particularly as the number of contributors grew and more people worked on critical parts of the website.

- **[Ankit Dash](https://github.com/helios2003)** added dynamic preview image generation for AsyncAPI documents shared via the AsyncAPI Studio website. Ankit also shared his GSoC journey and contributions during the online edition of the [AsyncAPI Conference](https://conference.asyncapi.com/venue/Online).
<YouTube id="B9xI8BziM94" />

- **[Mintu Gogoi](https://github.com/Gmin2)** and **[Yuan Yuan](https://github.com/lmgyuan)** focused on the AsyncAPI Generator project, resolving existing issues and bugs, triaging new ones, improving code through refactoring, and writing tests. Yuan shared their GSoC experience during the online edition of the [AsyncAPI Conference](https://conference.asyncapi.com/).
<YouTube id="ap2ZiRN8MDs" />

- **[Ashmit JaiSarita Gupta](https://github.com/devilkiller-ag)** developed a UI kit for the AsyncAPI website, based on the stunning designs by **[Aishat Muibudeen](https://github.com/mayaleeeee)**. By using Storybook, Ashmit ensured brand visual consistency and created a modular, easy-to-maintain design system that streamlined further development.

- **[Esther Xiao](https://github.com/FelicixAwe)** is making significant improvements to the AsyncAPI VS Code extension by introducing an autofix feature. This enhancement helps streamline the editing process by automatically resolving common Spectral linting errors directly within the IDE.

Each of these project ideas tackles key challenges within their respective repositories, bringing the initiative closer to its mission of fostering exponential community growth.

We’re also beginning to see promising signs of these projects attracting long-term contributors, not only from this year’s GSoC participants but also from the broader AsyncAPI community.

## An Unexpected Turn of Event

Sometimes, things happen that are beyond your control, and that’s exactly what happened during the final phase of this year’s program.

At AsyncAPI, we recognize that a project's final pull request may not always be merged within the program’s duration. This often serves as an opportunity to encourage participants to stay engaged and contribute beyond the program timeline.

Here’s what happened: after successfully passing the final evaluation, one of our contributors announced on social media that their project was complete. However, their pull request was still under review by the mentor. While the mentor had passed the contributor during the evaluation due to the program’s deadlines and acknowledged their consistent hard work, they found the announcement to be unprofessional.

Thanks to the mentor’s awareness, the contributor quickly removed the post and issued a heartfelt apology to both the mentor and the organizers.

In light of this, we’d like to remind future GSoC participants and contributors in similar programs to avoid declaring your project “complete” until your final pull request has been merged and your mentor has confirmed the project’s completion. Let’s strive for professionalism and clarity in our contributions.

## The Sad Story

Every year, when applying for GSoC, we’ve taken a two-way approach which is, applying as an independent organization while also submitting some AsyncAPI project ideas under Postman’s application just in case we weren’t selected. This year was no different, but we were fortunate enough to have both organizations accepted, giving us the flexibility to push all seven of our project ideas forward.

Now, you might be wondering how is this even possible. Well, a few of us were employed by Postman specifically to work on AsyncAPI, which allowed us to coordinate participation for both organizations. With Postman’s higher likelihood of being selected, it made sense to submit some AsyncAPI ideas under their umbrella.

What we didn’t foresee, however, was the sudden change of things. Postman unexpectedly laid off the entire AsyncAPI team, which not only marked the end of our roles there but also brought Postman’s participation in GSoC to a halt(possibly for future years as well). In light of this, GSoC organizers transferred all AsyncAPI-related projects from Postman to AsyncAPI, ensuring they continued under our banner.

This turn of events means that moving forward, our participation in GSoC rests entirely on our ability to be selected as an independent organization. What if we don’t get selected next year? While that’s a possibility, I choose to remain optimistic. If we make it this year, we can do it again. And even if we aren’t selected, we have the AsyncAPI Mentorship Program, a program we created for moments like this. You can read more about why we started our mentorship program [here](https://www.asyncapi.com/blog/beyond-boundaries).

This sudden change has made us face unexpected challenges as individuals, but we’re stronger, more determined, and deeply committed to our mission of fostering growth in the AsyncAPI community.

## Tips for further participants 

While I believe that reaching for the stars is just the beginning for us as an open-source community, and with even more exciting project ideas lined up for future GSoC programs at AsyncAPI, here are some valuable tips for contributors aspiring to participate in GSoC with us:

- **Start Early and Engage with the Community:** Over the years, contributors who actively engage with the AsyncAPI community before GSoC even begins tend to have better chances of being selected. Early engagement allows you to build connections, understand the community’s needs, and showcase your commitment. It also helps you stand out to potential mentors and other contributors.

- **Respect Maintainers’ Time:** Remember, maintainers and mentors are often juggling multiple responsibilities, including their professional roles. Be mindful of their time by doing your homework before asking questions. Read available documentation, search for existing discussions, and ask clear questions when you need help. This respectful approach makes a strong impression.

- **Focus on Quality Over Quantity:** Avoid making superficial contributions just to show activity. Mentors value meaningful, impactful contributions over sheer numbers. It doesn’t matter if you’ve only contributed to the website repo instead of the generator repo, what counts is the thoughtfulness and effort behind your work.

- **Participate Beyond Code Contributions:** Being a successful GSoC contributor isn’t just about writing code. Engage in discussions, provide feedback on other contributions, and help answer questions from community members. Demonstrating your willingness to contribute in diverse ways shows your dedication to the community.

- **Set Clear Project Timelines and Deliverables:** When preparing your GSoC proposal, ensure your timeline is realistic and achievable. Break your project into smaller milestones with clear deliverables for each phase. This demonstrates your organizational skills and helps mentors see your plan for success.

- **Communicate Clearly and Effectively:** Good communication is key. Keep your mentors and the community updated on your progress, ask thoughtful questions, and don’t hesitate to seek guidance. Be proactive in addressing issues and responsive to feedback. Helping others in the community can also set you apart as a standout contributor.

- **Seek and Act on Feedback:** Throughout the program, regularly request feedback from mentors and implement it into your work. Showing that you can learn, adapt, and improve is a critical skill that mentors highly value.

By following these tips, you’ll not only increase your chances of being selected but also leave a lasting positive impact on the AsyncAPI community.

## Special Shoutouts

<Profiles profiles={[
  {
    name: 'Pavel Bodiachevskii',
    avatar: 'https://avatars.githubusercontent.com/Pakisan',
    link: 'https://github.com/Pakisan'
  },
  {
    name: 'Sambhav Gupta',
    avatar: 'https://avatars.githubusercontent.com/sambhavgupta0705',
    link: 'https://github.com/sambhavgupta0705'
  },
  {
    name: 'Ansh Goyal',
    avatar: 'https://avatars.githubusercontent.com/anshgoyalevil',
    link: 'https://github.com/anshgoyalevil'
  },
  {
    name: 'Lukasz Gornicki',
    avatar: 'https://avatars.githubusercontent.com/derberg',
    link: 'https://github.com/derberg'
  },
  {
    name: 'Iván García Sainz-Aja',
    avatar: 'https://avatars.githubusercontent.com/ivangsa',
    link: 'https://github.com/ivangsa'
  },
  {
    name: 'Aishat Muibudeen',
    avatar: 'https://avatars.githubusercontent.com/Mayaleeeee',
    link: 'https://github.com/Mayaleeeee'
  },
  {
    name: 'Akshat Nema',
    avatar: 'https://avatars.githubusercontent.com/akshatnema',
    link: 'https://github.com/akshatnema'
  },
  {
    name: 'Thulisile Sibanda',
    avatar: 'https://avatars.githubusercontent.com/thulieblack',
    link: 'https://github.com/thulieblack'
  }, 
  {
    name: 'Sergio Moya',
    avatar: 'https://avatars.githubusercontent.com/smoya',
    link: 'https://github.com/smoya'
  }, 
  {
    name: 'Azeez Elegbede',
    avatar: 'https://avatars.githubusercontent.com/AceTheCreator',
    link: 'https://github.com/AceTheCreator'
  },
]} />

We want to take a moment to extend our gratitude to the mentors above, whose dedication to the program made them go above and beyond to support and pass on their knowledge and forge meaningful relationships with our mentees. This program would not be possible without their unwavering support. 

A special shoutout goes to Postman, who has always allowed us to push some of our project ideas under their umbrella over the last few years, while it's sad to see this come to an end, we love and appreciate the opportunities, and the community as a whole will never take it for granted. 

A special thanks to Google for their belief in Free and Open Source Software (FOSS), for making this program possible every year as a show of their support to the open source ecosystem, and for allowing organizations like ours to bring passionate contributors and mentors to collaborate on a project all for the love of opensource.

Finally, a wonderful shout to [Stephanie Taylor](https://www.linkedin.com/in/stephaniertaylor/), the incredible program manager of Google Summer of Code, for her unwavering support during the transition of our projects after Postman’s departure. Her assistance with transferring mentor stipends to our preferred account was phenomena, and we truly appreciate her dedication and guidance!


## Closing Remark 

If you’re considering joining GSoC with AsyncAPI next year, we encourage you to hop into our [Slack community](https://asyncapi.com/slack-invite) and say hello in the **#mentorship** channel. We’re always excited to welcome new contributors and mentors into our growing family.

We’re already looking forward to next year’s program and are committed to using this year’s lessons to make the experience even better.

Until then, see you all next year, and stay connected! ✌🏾
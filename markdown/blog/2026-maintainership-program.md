---
title: "AsyncAPI Maintainership Program: Volunteer Edition"
date: 2026-06-23T06:00:00+01:00
type: Community
tags:
  - Project Kickoff
  - Mentorship
  - Maintainership
cover: /img/posts/2026-blog-banner/jackson-sophat-unsplash.webp
authors:
  - name: Azeez Elegbede
    photo: /img/avatars/ace.webp
    link: https://aelegbede.com/
    byline: AsyncAPI Preacher!
excerpt: 'We Got Rejected by GSoC, So We Built Something Better'
---

Most open-source contributors disappear.

They show up, merge a few PRs, maybe close some issues, and then you never hear from them again. It's less their fault and more the program's structure.

Most programs just hand contributors a task, watch them complete it, and send them on their way, with no ownership, leaving them with no reason to stay.

We thought we had the fix, but Google thought otherwise.

## The rejection that started everything

Last year, we were participating in Google Summer of Code when a question kept coming up in our conversations: *Why do contributors leave after the program ends?*

Once we sat down to think about it, the answer was, to our surprise, obvious.

Most GSoC projects are built around completion, not ownership. So, a contributor is assigned a feature or a bug list, they do the work, and once summer is over, they're gone.

They leave with no stake in what they helped build, therefore, with no reason to come back.

So we ran an experiment.

We proposed two project ideas structured entirely around maintainership, everything from issue triaging to PR reviews, documentation, and contributor onboarding. Basically, the full picture of what it means to maintain a project.

Both contributors became maintainers. Not one, both.


## Google said no, we said fine

This summer, we went all in; every single project idea we submitted to GSoC was built around maintainership.

Google rejected us.

Which raised an uncomfortable question: *Does that mean this idea isn't worth pursuing?*

We sat with that for about five minutes (kidding, took us longer than that :/ ). Then we built the **Maintainership Program** anyway.

The difference between this and GSoC is that we don't give contributors a project to finish, but rather, we give them something to own.

So that, by the time the program is over, contributors aren't just done; they remain part of the project as triagers or reviewers.

This strategy produces an entirely different outcome, and it changes what open-source means for the people who go through it.

## So, who's in this cycle?

Unfortunately (for those who missed it), applications are closed, and contributors have been selected. So, let's introduce you to the contributors in this cycle:

### Selected contributors

- [**Ishita Sati: AsyncAPI React**](https://github.com/Ishita-190)

Ishita Sati is a B.Tech sophomore at Indira Gandhi Delhi Technical University for Women, India, and a full-stack developer with experience across multiple tech stacks.

She began contributing to open-source during the 2025 Girl Script Summer of Code (GSSoC) and has since honed her skills through active contributions, including work with AsyncAPI and MoFA Org on testing, regression monitoring, and CI/CD improvements. 

She is passionate about building robust systems and seeks to further strengthen her expertise by continuing to contribute to open-source projects such as the AsyncAPI React component infrastructure.

- [**TUSHAR ANAND: AsyncAPI CLI**](https://github.com/neoandmatrix)

Tushar Anand is a pre-final year student at IIIT Bhubaneswar, India, and a developer passionate about learning, collaboration, and exploring new technologies. 

He has worked on multiple team-based open-source projects at his college and enjoys building scalable, reliable software that can benefit a wide range of users. He is also interested in long-term involvement with the AsyncAPI community and aspires to grow into a maintainer role within its ecosystem.

- [**Varshitha Besthavemula: AsyncAPI Generator**](https://github.com/batchu5)

Varshitha Besthavemula is a full-stack developer with experience in MERN, TypeScript, and Next.js, and a strong interest in building reliable developer tools and open-source systems. She has been actively contributing to the AsyncAPI Generator repository, where she has worked across documentation improvements, error handling, and extensive testing of generator components and templates, including Python WebSocket client features and core rendering flows.

Through her work, she has developed a solid understanding of the AsyncAPI Generator internals, including template resolution, document validation, rendering workflows, and hook execution within the CLI generation pipeline. She has also explored template development in depth, including building a Python client generator and improving documentation around template usage and structure.
### Mentors

These mentors are people who've already walked the road from contributor to maintainer and chose to come back and make it easier for the next person.

They are:

- **[Aayush Saini](https://github.com/AayushSaini101) & [Ashish Padhy](https://github.com/Shurtu-gal): AsyncAPI CLI**

Aayush maintains the AsyncAPI CLI, a command-line tool for working with your AsyncAPI files directly from the terminal. This year, he flips the role, guiding contributors into maintainership on the same project he maintains. Ashish is right there with him.

The CLI demands something specific from contributors: you have to understand how a real tool fits into real workflows. It's not a training ground. It's production.

- **[Prince Rajpoot](https://github.com/princerajpoot20): AsyncAPI Website**

Prince has shaped the AsyncAPI Website long enough to know exactly where the gaps are, the undocumented decisions, the content that quietly confuses newcomers, the pages that turn people away before they ever get started.

- **[Adi Boghawala](https://github.com/Adi-204): AsyncAPI Generator**

Adi maintains the AsyncAPI Generator, the toolchain that turns your AsyncAPI definitions into working code and documentation. This cycle, he's mentoring contributors into the same depth of ownership he's built up on the project.

What the Generator asks of contributors is comprehension. You can't meaningfully contribute to a code generation toolchain without understanding how the pieces fit together. Adi's mentee won't just be adding features; they'll learn to think about a project that other developers can build on top of.

- **[Azeez Elegbede](https://github.com/AceTheCreator) & [Mohammed Mehdi](https://github.com/catosaurusrex2003): AsyncAPI React Component**

Azeez and Mohammed both know the React Component from the inside, the design decisions baked into it, the tradeoffs that aren't obvious from the outside, the things that only become clear once you've spent real time in the codebase.

Together, they're mentoring contributors into a project that sits right at the edge of tooling and developer experience. If you've ever used an AsyncAPI playground or rendered an AsyncAPI document in a UI, you've interacted with what their mentees will be owning.

## The projects

There are four projects in this cycle. Each one is chosen because it offers a good enough scope for long-term ownership.

- **[AsyncAPI CLI](https://github.com/asyncapi/cli)**: The command-line interface for working with AsyncAPI files.

- **[AsyncAPI Generator](https://github.com/asyncapi/generator)**: Generates code and documentation from AsyncAPI definitions.

- **[AsyncAPI React Component](https://github.com/asyncapi/asyncapi-react)**: The rendering component for AsyncAPI documents, used across playgrounds and tooling in the ecosystem.

- **[AsyncAPI Website](https://github.com/asyncapi/website)**: Documentation, content, and the first thing most people see when they encounter AsyncAPI.
  
  > The AsyncAPI Website project has been withdrawn from this cohort due to unforeseen timing constraints affecting mentor availability. The project is expected to be resubmitted for consideration in the LFX cohort of the Maintainership Program this fall.

## How does the program run?

Every cycle follows a structured timeline, designed to keep things transparent and fair for everyone involved, from the mentors proposing projects to the contributors hoping to land one.

Below is what the full cycle looks like:

- **Program Announcement - February 1**: Coordinators publish the program details, including the goals, structure, and participation guidelines. Then, outreach to potential volunteers begins.

- **Call for Mentors & Project Proposals - March 10 to April 30**: Mentors sign up, get reviewed for eligibility, and propose project ideas. Organizers approve or reject proposals. Selected mentors go through a short onboarding session and put together task lists for contributors.

- **Contributor Applications - May 10 to May 30**: Contributors apply, choosing one or more projects they want to work on. Organizers begin reviewing.

- **Contributor Selection - June 1 to 12**: Applicants hear back, whether selected or not. Mentors' task lists go out to the contributors who made it in. Selected mentees are announced publicly.

- **Program Kickoff - June 15**: Mentees join project Slack channels, meet their mentors and cohort, and align on weekly goals. A welcome call kicks off the whole cycle.

- **Midterm Evaluations - August 12 to 22**: Mentors and mentees fill out evaluation forms, and organizers run check-in calls to catch blockers early. Anyone at risk of falling behind gets flagged for extra support, not for the purpose of penalizing them, but to keep them going in the program

- **Final Evaluations - October 6 to 17**: Mentors assess contributions and growth. Mentees assess their mentors. Everyone reflects through self-assessments and feedback sessions. Final project submissions go in for review.

- **Recognition - October 24**: Successful mentees get digital certificates, a spot in the community spotlight, and letters of recommendation. This is also where the conversation about actual maintainership invitations starts.

- **Post-Program Pathways - Late October onwards**: The program doesn't just end. Mentees are invited to join working groups, continue contributing, or return as mentors for the next cohort. Speaking opportunities at AsyncAPI conferences and open-source leadership resources are also shared here.

If you want the full breakdown, the [Maintainership Program documentation](https://www.asyncapi.com/docs/community/maintainership-guide) has everything laid out in detail.

## You missed this cycle, so now what?

If you didn't apply in time, don't just wait.

The contributors who stood out in this cycle weren't the ones with the most impressive GitHub profiles. They were the ones already acting like they had skin in the game. Filing issues. Leaving comments and showing up in discussions without being asked.

That's what the road to maintainership looks like before anyone hands you the title.

Start walking it now. The next cycle will notice.

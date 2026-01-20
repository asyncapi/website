---
title: "2025 Google Summer of Code: Summary"
date: 2026-01-20T18:00:00+01:00
type: Community
tags:
  - Mentorship
  - GSoC
  - AsyncAPI
  - OSS
cover: /img/posts/gsoc-25.webp
authors:
  - name: Azeez Elegbede
    photo: /img/avatars/ace.webp
    link: https://www.linkedin.com/in/aelegbede/
    byline: AsyncAPI Preacher 
---

**Celebrating real impact, strong mentorship, and a growing community**

AsyncAPI participated in Google Summer of Code (GSoC) for the fourth time in 2025, a significant milestone that speaks to our commitment to nurturing the next generation of open source contributors. Seven contributors invested months building meaningful projects within the AsyncAPI ecosystem. As with previous years, project timelines varied, with some wrapping up in early October and others extending into late November.

We're thrilled to report that **6 out of 7 projects were successfully completed**, with the remaining one still actively progressing. Each project brings its own story of growth, collaboration, and impact.

We worked with an incredible group of contributors, connecting regularly through group video calls to discuss their GSoC projects and tackle blockers together, helping ensure a smooth and productive summer for everyone. Throughout their time with AsyncAPI, contributors picked up new skills, made meaningful improvements to our tooling, and helped shape our ecosystem. We’re deeply grateful for their contributions and the energy they brought to the program.

**Fun news:** some of our GSoC 2025 contributors have continued working on their projects even after the program concluded. Even more exciting, two former GSoC contributors have stepped into [Technical Steering Committee](https://www.asyncapi.com/community/tsc) roles, highlighting both the impact of their work and the level of responsibility and ownership they’ve grown into.

<Figure
  src="/img/posts/asyncapi-bangalore.webp"
  caption="AsyncAPI Bangalore"
  className="text-center"
/>


Google Summer of Code was a big success for AsyncAPI this year, with a higher number of projects, an encouraging sign of what’s ahead in the coming years. GSoC has consistently proven to be a great entry point into the AsyncAPI community, something we know firsthand from participating in the program over multiple years. We’re excited to continue taking part in GSoC this year and in many more to come.

If you’re interested in becoming a GSoC contributor, check out our [**GSoC project ideas list**](https://github.com/asyncapi/community/blob/master/docs/050-mentorship-program/summerofcode-2025-asyncapi-gsoc-ideas-page.md) and our [**guide for new contributors**](https://github.com/asyncapi/community/blob/master/docs/010-contribution-guidelines/contribution-flow.md) to get started.

## Project Highlight

Below, we’ve put together a brief summary of all our GSoC projects to give you insight into each project’s goals and the current status of any unfinished work. You can find more details about the original project objectives in the linked resources.

### AsyncAPI Generator Maintainership
- **Contributor:** [Adi Boghawala](https://github.com/Adi-204)
- **Mentor:** [Lukasz Gornicki](https://github.com/derberg)
- **Final report:** [Read here](https://gist.github.com/Adi-204/a4040124ed8cb510465e8e38b1fd422d)

One of the ongoing challenges at AsyncAPI is the shortage of maintainers across some of our most widely used tools, including the [**AsyncAPI Generator**](https://github.com/asyncapi/generator). The Generator plays a critical role in the ecosystem: it enables developers to generate a wide range of outputs directly from an AsyncAPI specification and ships with a rich set of officially supported templates. Several other core tools within the initiative, such as the CLI and Studio, are built on top of it, making its long-term maintainability essential.

This made bringing in new maintainers a priority, and Adi proved to be an excellent fit for the role.

During GSoC, Adi made impactful contributions that addressed both architectural and ecosystem-level challenges:

- **Unified Integration Testing for WebSocket Clients:** Adi tackled a major scalability issue in our WebSocket client testing setup, where over 80% of the integration test code was duplicated across Dart, Python, and JavaScript clients. He introduced a unified and flexible integration test suite powered by shared helpers and a scalable structure that cleanly separates common and client-specific logic. This work eliminated duplicate test files and cleanup scripts, centralized test setup, and significantly improved maintainability across clients.

- **A New Message Validation Library – [`@asyncapi/keeper`](http://npmjs.com/package/@asyncapi/keeper):**  Recognizing the need for robust and developer-friendly message validation, Adi initiated the development of `@asyncapi/keeper`. This new library provides reusable and extensible utilities for validating message payloads against JSON Schema Draft-07 and AsyncAPI specifications, built on top of `@hyperjump/json-schema` and the AsyncAPI parser. It fills a critical gap in the ecosystem by offering a clearer and more accessible validation experience.

Adi’s contributions throughout GSoC went far beyond writing code. He actively engaged in community discussions, contributed to process improvements, and demonstrated strong ownership of the tools he worked on. This growth and commitment ultimately led to Adi joining the **Technical Steering Committee**, reflecting both the impact of his work and the responsibility he took on within the initiative.

We’d like to sincerely thank Adi for his outstanding contributions and congratulate him on becoming a Technical Steering Committee member.

### VS Code Extension Maintainership

- **Contributor:** [Ruchi Pakhle](https://github.com/Ruchip16)
- **Mentor:** [Iván García Sainz-Aja](https://github.com/ivangsa)
- **Final report:** [Read here](https://github.com/Ruchip16/website/blob/new_blog/markdown/blog/vsasyncapi-preview-extension.md)

The [AsyncAPI VS Code Extension](https://github.com/asyncapi/vs-asyncapi-preview) is the official tool for previewing AsyncAPI documents directly within VS Code. Prior to GSoC, the extension was close to entering maintenance mode due to a lack of active maintainers. During the program, Ruchi stepped in as a co-maintainer alongside Iván and quickly took ownership of a critical new feature that significantly expanded the reach of the tool.

Historically, previewing an AsyncAPI document required a locally configured VS Code environment. Ruchi’s work removed this limitation by making the extension **web-compatible**, enabling AsyncAPI documents to be previewed directly in web-based IDEs such as GitHub and GitLab. This means contributors and reviewers can now view `YAML` files straight from repositories, without cloning code or setting up a local environment, greatly improving accessibility and developer experience.

Ruchi delivered this functionality through a series of thoughtful and impactful improvements:

- **Removed Node.js-specific modules** such as `fs`, `path`, and other runtime dependencies that are incompatible with browser environments, unblocking support for VS Code Web.
- **Introduced lightweight browser-friendly utilities** (`pathUtils`) to replace Node-based file handling, ensuring consistent behavior across desktop and web-based IDEs.
- **Removed the EDAVisualizer integration**, which was unmaintained and incompatible with web mode, simplifying the extension’s architecture and reducing technical debt.
- **Updated core VS Code dependencies** (`vscode` and `@types/vscode`) to align with modern extension APIs and ensure long-term compatibility with VS Code Web.

Through this work, Ruchi not only helped keep the VS Code extension actively maintained but also unlocked a new class of usage for the AsyncAPI ecosystem. Her contributions meaningfully improved accessibility, reduced friction for contributors, and strengthened the long-term sustainability of one of AsyncAPI’s most important tools.

Ruchi’s impactful work on the VS Code extension led to her joining the Technical Steering Committee. We were truly impressed by what she accomplished and greatly enjoyed working with her throughout the summer. Thank you for all your contributions, Ruchi!

### Extending AsyncAPI’s Generator Java Templates with Quarkus

- **Contributor:** [Shuaib Salad](https://github.com/ssala034)
- **Mentors:** [Aayush Saini](https://github.com/AayushSaini101) [Souvik De](https://github.com/Souvikns)
- **Final report:** [Read here](https://gist.github.com/ssala034/4f90f4695a34d0e6bb897d2551aea973)

Shuaib’s work during GSoC was nothing short of outstanding. He was not only the first contributor to complete his project for the summer, but he also delivered a highly impactful contribution that significantly extends AsyncAPI’s suite of production-ready templates. His project focused on designing, building, and maintaining a [**Java Quarkus template**](https://github.com/asyncapi/generator/tree/master/packages/templates/clients/websocket/java/quarkus) within the AsyncAPI Generator, bringing first-class support for Kubernetes-native, event-driven Java applications.

Throughout the program, Shuaib introduced a scalable and modular template architecture inside the Generator monorepo, making it easier to extend, maintain, and evolve Java-based templates over time. His work added support for **AsyncAPI v3 specifications**, enabling developers to generate modern event-driven applications directly from their AsyncAPI documents.

Key highlights of Shuaib’s contributions include:

- **Java Quarkus Template Infrastructure:** Built a production-ready template with Maven-based builds, Docker support for JVM mode, Kubernetes manifest generation, and a clean package structure, laying a strong foundation for future Java templates.
- **WebSocket Client Generation:** Enabled generation of WebSocket-based microservices capable of connecting to dynamic endpoints defined in AsyncAPI schemas, improving flexibility for real-time use cases.
- **Kafka Protocol Support:**  Added Kafka-based microservice generation with built-in producer and consumer templates, topic configuration, and support for event-driven architectures.
- **Acceptance & Contract Testing:**  Implemented automated acceptance tests using Podman Compose and Microcks to validate generated code against AsyncAPI contracts, ensuring correctness and real-world readiness.

Beyond feature development, Shuaib tackled complex architectural challenges such as modular component design, AsyncAPI schema parsing, and dynamic endpoint and topic configuration. His work makes reuse of existing Generator components while extending them to support framework-specific and role-based logic, helping improve consistency across templates.

Shuaib’s contributions meaningfully strengthened the AsyncAPI Generator ecosystem, expanded its Java and cloud-native capabilities, and set a solid foundation for future template development. We’re incredibly grateful for his dedication, technical depth, and early delivery, and we’re excited to see how this work continues to evolve within the community.

### AsyncAPI Conference Website UI Kit Development

- **Contributor:** [TenzDelek](https://github.com/TenzDelek)
- **Mentors:** [Azeez Elegbede](https://github.com/AceTheCreator)  [Ashmit Jagtap](https://github.com/ashmit-coder)
- **Final report:** [Read here](https://gist.github.com/TenzDelek/a6e653cfaae6eb2bca793374ce1695a9)

The goal of this project was to develop a Storybook-based UI component library for the conference website to ensure design consistency, modularity, and maintainability. 

Tenzin has been a long-term contributor to the conference website before GSoC, and it was a no-brainer for him to work on the Storybook implementation of the conference website.

Over the coding period, Tenzin methodically built out the UI Kit through multiple pull requests, establishing foundational patterns that will significantly streamline future development. He did some amazing work, such as:

- **Design System Foundation:** Tenzin started by establishing the architectural backbone of the entire design system. He built the initial Storybook setup, configured the design system infrastructure, and documented the comprehensive color palette and typography system.
  
- **Component Development & Reusability:** The real impact came through systematic component work... Tenzin modernized the Button component with significant architectural improvements, refactoring it to accept flexible props (including text, outline, and, crucially, icon positioning), and then created comprehensive Storybook stories showcasing all variations. He systematically updated all Button usage across the codebase; in forms, headers, and CTAs. 
  
- **Infrastructure & Tooling Excellence:** Tenzin executed a Storybook 9 migration while simultaneously introducing a comprehensive icon system as React components. Rather than relying on image files scattered throughout the codebase, he created modular icon components (Github, LinkedIn, X, YouTube social icons, map pointers, arrows, and more). This refactor touched 24 files, replacing all image-based icons with clean, scalable React component equivalents, a subtle but significant improvement to maintainability and performance.

Each PR wasn't just about adding features; it was about establishing patterns. By making the Dropdown generic, he created a blueprint for component reusability across different data types. 

In Tezin's words... "Working with AsyncAPI during GSoC has been a transformative experience. Beyond the code, I gained a profound understanding of what open source really is. It’s about the incredible community and the chance to learn alongside people who share the same passions." Thank you for your great work!

### Redesign the AsyncAPI Website and Implement Dark Theme

- **Contributor:** [Shriya Chauhan](https://github.com/Shriya-Chauhan)
- **Mentors:** [Ashmit JaiSarita Gupta](https://github.com/devilkiller-ag) & [Aishat Muibudeen](https://github.com/Mayaleeeee)
- **Final report:** [Read here](https://gist.github.com/Shriya-Chauhan/d4ef9904b83cf88d3d9554b8afa1903e)

This GSoC project tackled one of the most visible aspects of the AsyncAPI community, the website itself. The scope was ambitious: redesign the entire website with a modern visual language, extend designs across all pages, and implement full dark mode support.

And Shriya is doing just that while following the [design implementation](https://www.figma.com/design/ZDmqYdLfqbW4Jj4yxzhgQH/GSoc-25-website-redesign?node-id=7801-3660&p=f). She made meaningful contributions to several parts of the implementation. Starting with only the homepage and community page designs, the contributor expanded the redesign to 10 pages in Figma, meticulously creating both light and dark mode variants. This wasn't simply applying a color scheme; it required rethinking layouts, typography, component hierarchies, and icon systems for both themes. The work spanned the entire site: navbar, homepage, docs, case studies, blog, roadmap, TSC, ambassadors, events, newsroom, tools dashboard, and community page.

Shriya's contribution can be categorized into two:

- **Implementation at Scale:** The code work translated these designs into 12 implemented pages across three major pull requests. Beyond pixel-perfect implementation, the contributor built reusable component patterns, refactored redundant code, and ensured accessible contrast ratios throughout. Key additions included an interactive "Sneak Peek" showcase on the Docs page, redesigned member profile cards for TSC, responsive blog pagination and category filters, and a completely rebuilt Ambassadors page with improved card layouts.
  
- **Managing Complexity:** What became clear early on was that the project scope extended far beyond initial estimates. Juggling both design and development simultaneously, managing design approvals, iterating on feedback, implementing changes, and maintaining consistency across 12+ pages proved demanding. The extended review cycle with limited maintainer availability added complexity, but the contributor adapted by continuing post-GSoC through November 30th to ensure quality.

As of now, the [final implementation](https://github.com/asyncapi/website/pull/4553) remains under review. Remaining work includes dark mode refinements on the CLI page, sponsor logo contrast fixes, icon reviews, and design updates to the board members page to match the new theme.

Thanks to Shriya, the website will have a refined, fresh look, and we can't wait to have the implementation merged into `master`. 

### Refactor the Scripts inside the website and add Integration tests

- **Contributor:** [Sagar Kori](https://github.com/sagarkori143)
- **Mentor:** [Akshat Nema](https://github.com/akshatnema)
- **Final report:** [Read here](https://docs.google.com/document/d/1gx7uGdJvUEM5M8KgPV1V-eC_bPSoj8Y8pJ80e0VHaQs/edit?usp=sharing)

Sagar took on a critical challenge: modernizing the AsyncAPI website's build infrastructure. The website relied on Node.js and TypeScript scripts to generate static .mdx and .json files during builds and scheduled cron jobs, but it had become fragile and difficult to maintain.

When Sagar started, the script system had multiple pain points: scripts executed immediately upon import (making testing nearly impossible), paths were hardcoded throughout, error handling was inconsistent, and there were zero integration tests to verify real behavior. Debugging was risky, and refactoring was dangerous.

Sagar's contribution to modernizing the website's build spanned three main areas:

- **Script Refactoring & Architecture:** Sagar systematically refactored 10+ scripts to remove direct execution patterns, converting them into pure functions that accept configuration through parameters instead of relying on hardcoded paths. This separation of business logic from execution logic made everything reusable, testable, and maintainable, laying the foundation for the entire system redesign.
  
- **The Runner System: Centralized Execution:** With a new `npm/runners` folder containing 10 runner files, Sagar introduced a consistent script execution layer. Each runner provides sensible production defaults while allowing configuration overrides, uses a shared error handling pattern based on CustomError, executes safely from the command line, and crucially, doesn't auto-run during tests. Existing npm scripts were updated to use these runners internally, making the system the single source of truth for how scripts execute.
  
- **Integration Tests & CI Integration:** Sagar built 10+ integration test suites that run real runners, verify files are generated correctly on disk, validate content and structure, test error scenarios and path handling, and manage concurrency between tests. He updated GitHub Actions so integration tests run automatically on pull requests, ensuring script changes don't break the build system. Jest configuration was refined to support running unit and integration tests separately and together.
  
Sagar's work represents crucial foundational progress for AsyncAPI's build infrastructure. By successfully refactoring the script system and establishing a comprehensive testing framework, he has positioned the codebase for safe, confident development moving forward. His architecture and testing patterns will undoubtedly influence how the AsyncAPI team maintains and extends this critical system as it continues to grow. Thank you very much, Sagar!

## Conclusion 

We want to extend our heartfelt gratitude to every contributor who dedicated their summer to AsyncAPI through Google Summer of Code 2025. Your energy, creativity, and commitment have left a lasting impact on our community. We're already excited about the innovations you'll bring in future seasons.

A huge thank you to Google for making GSoC possible and granting us a spot. Your investment in open source mentorship continues to shape the next generation of developers.

Finally, to our mentors... your patience, guidance, and unwavering support were the backbone of every contributor's success. You went above and beyond, spanning time zones and challenges, to help bring these projects to life. AsyncAPI's GSoC journey simply wouldn't exist without you.

Here's to an incredible summer of code, collaboration, and community. We can't wait to see what's next.
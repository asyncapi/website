---
title: "Migration of AsyncAPI Website to Next.js v14 and TypeScript"
date: 2024-06-04T12:00:00+05:30
type: Engineering
tags:
  - Website
  - Migration
  - TypeScript
cover: /img/posts/asyncapi-website-migration.webp
authors:
  - name: Ashmit JaiSarita Gupta
    photo: /img/avatars/ashmit-jaisarita-gupta.webp
    link: https://ashmit.dev/
    byline: Modelina Website Maintainer
excerpt: 'Migration journey of the AsyncAPI Website, features introduced, and future plans.'
---

We're thrilled to announce the successful migration of the AsyncAPI website from JavaScript and Next.js v12 to TypeScript and Next.js v14! This exciting upgrade unlocks a new chapter for the website, paving the way for improved scalability, streamlined feature implementation, and the powerful capabilities of Next.js. As a bonus, this migration also enabled a well-documented codebase and streamlined our testing process by reducing the reliance on Cypress tests. In this blog post, we'll delve into the exciting journey behind the migration and share what's new on the website. I'll share insights into our team's efforts, the research and planning involved, the challenges we tackled, the valuable lessons learned, and what exciting plans lie ahead for the AsyncAPI website.

This migration journey spanned from February to May 2024, and it involved a dedicated team of contributors and maintainers passionate about the AsyncAPI Initiative and the ecosystem of tools it provides. We'd like to give a shout-out to our amazing team: [Lukasz Gornicki](https://www.linkedin.com/in/lukasz-gornicki-a621914/), [Rohit T](https://www.linkedin.com/in/rohit-t-0124a4242?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app), [Akshat Nema](https://www.linkedin.com/in/akshat-nema/), [Ansh Goyal](https://www.linkedin.com/in/thisisanshg/), [Ashish Padhy](https://www.linkedin.com/in/ashish-padhy3023/), [Sambhav Gupta](https://www.linkedin.com/in/sambhavgupta0705/), [Vishvamsinh Vaghela](https://www.linkedin.com/in/vishvamsinh-vaghela-591695217/), and myself, [Ashmit JaiSarita Gupta](https://ashmit.dev). Their expertise and commitment were instrumental in achieving this exciting upgrade for the AsyncAPI website.

## What's new on the website?
The migration to Next.js v14 and TypeScript brought several significant transformations to the AsyncAPI website. These changes paved the way for a more performant, scalable, and developer-friendly experience.

**Streamlined Development Workflow:** TypeScript integration introduces static typing to the codebase, enhancing code maintainability, reducing errors, and providing better autocompletion. This simplifies the development process and promotes cleaner code.

**Component Refactoring:** Much of the migration involved meticulously refactoring website components within the Next.js framework. This ensures optimal performance and lays the groundwork for future feature development.

**Improved Testability:** Moving to TypeScript also enhances our testing capabilities. Static type checking helps identify potential issues early in the development cycle, leading to a more robust and reliable website.

**Improved Code Clarity with JSDoc:** For developers diving deeper into the codebase, we've added comprehensive JSDoc documentation for all components and their parameters. This documentation clearly explains each component's purpose and function, along with detailed information about the parameters it accepts. This enhanced clarity simplifies understanding of the website's code structure and functionality, making it easier for developers to contribute. This will also help generate proper docs for UI components in the UI Kit, which I am currently developing as a part of my Google Summer of Code project.

**Enhanced Documentation and Blog Structure:** We've introduced a new directory structure to streamline content management and leverage Next.js capabilities. Previously housed in the `pages/docs` and `pages/blog` directories, our documentation and blog now reside in the `markdown/docs` and `markdown/blog` directories, respectively. This change allows for better organization and integration with Next.js's built-in features for handling static content.

**Consistent Code Formatting:** We've implemented well-defined Prettier and ESLint rules to enforce consistent code formatting and style across the entire codebase. This not only improves code readability and maintainability but also simplifies collaboration among developers.

**Improved Static Data Management:** Static data that was previously hardcoded directly within components and pages is now housed in dedicated `data` folders. This separation of concerns promotes cleaner code, simplifies maintenance, and facilitates data reusability across the website.

**Refined Configuration Management:** The `config` folder now strictly stores configuration-related data. Static data previously stored within the configuration folder has been relocated to the `data` folders.

## Choosing the Right Framework for the AsyncAPI Website
A crucial step in our migration journey was selecting the most suitable framework. Given the current website setup and limited use of server-side rendering, we initially considered React with Vite.js. Vite offers advantages like faster development, improved performance, and a user-friendly development server. However, browser support and a less mature plugin ecosystem presented potential challenges.

Next.js emerged as the preferred choice due to its focus on scalability, SEO, and developer experience. Features like server-side rendering (SSR), static site generation (SSG), and automatic routing contribute to these benefits. Additionally, Next.js offers built-in functionalities for image, font, and script optimization, streamlining the development process. While Next.js has a steeper learning curve, its comprehensive feature set and strong community support ultimately aligned best with our vision for the AsyncAPI website's future growth and feature expansion.

## Planning the Migration: A Stepwise Approach
To manage the complexity of migrating the AsyncAPI website's codebase, which included various directories like components, pages, scripts, and configurations, we devised a structured plan. This plan involved dividing the codebase into manageable subdirectories, focusing heavily on dependencies between them. Key areas like contexts, utility functions (lib), and Netlify serverless functions required specific attention during the migration process. It's important to note that existing Node.js scripts used for build tasks fell outside the scope of the migration and would be covered in the upcoming GSoC 2024 project: [Script Stability Enhancement for AsyncAPI Website](https://summerofcode.withgoogle.com/programs/2024/projects/8UtMfDDl). We also updated configurations related to tools like Git, Docker, and Prettier as needed within the TypeScript environment. 

Our migration strategy involved a meticulously planned, five-phase approach. Each phase tackled crucial aspects of the website's modernization:

- **Basic Setup:** This initial phase focused on establishing the new project's infrastructure. We configured a fresh package.json file, managing all dependencies. We set up the Next.js application, integrated Google Analytics and SEO functionalities, and made a production-ready build for deployment on Netlify.

- **Setup Context:** The second phase involved establishing contexts for elements like blogs, docs, and the tool filter system. 

- **Migrating Components:** This was the longest migration phase in which we migrated over 250 components compromising icons, navigation, layout, buttons, dashboard, typography, tools, etc. Additionally, this phase involved the strategic elimination of any redundant components and optimizing the website's overall structure. It took us around the whole of March and April to complete this phase.

- **Migrating Pages:** In this phase, we migrated the pages of our website. Since all the components were migrated, this step was easy and quick for us.

- **Final Touches and Launch:** In the final step, we migrated Netlify functions, updated the readme, conducted a manual comparison between the old and new websites to address any UI discrepancies, resolved bugs, and took feedback from the community. Finally, we integrated the migrated website onto the main branch and deployed it to production.

## Challenges we faced
No significant project is without its hurdles, and our migration journey was no exception. Here are some of the challenges that we faced:

**Challenge:** How do you manage PRs that will be opened during the migration? <br></br>
**Solution:** We tried to merge all PRs to the migrated website instead of the production website. However, the urgent changes were merged into the master branch and then pulled into the migrate-ts branch.


**Challenge:** Handling the redundancy of the same type of specifications in multiple PRs and files. <br></br>
**Solution:** We decided to have a common types folder and defined all the types inside it that were being used at multiple places.


**Challenge:** Multiple structures of the TypeScirpt components by different team members. <br></br>
**Solution:**  We decided and created a coding guideline to be followed by all team members.


**Challenge:** Encountering usage of a `lowlight` package that wasn’t installed as a dependency. More interestingly, there's nothing like `lowlight.registerLanguage` as per their API docs, which were on the old website. <br></br>
**Solution:** This was the funniest part; the old codebase used `lowlight.registerLanguage`, which was not provided by the lowlight API. We noticed the codebase worked fine without `lowlight`, so we removed every usage.


**Challenge:** Error in rendering custom JSX components inside .md files. <br></br>
**Solution:** This was the most annoying error that we faced, and it remained unresolved for several weeks. Finally, we all assembled in a huddle call to fight with this and got the solution. It required to be converted into mdx file with proper format. We used prettier and eslint rules to get the proper format after converting all .md files.


## What’s next?
The migration of the AsyncAPI website to Next.js and TypeScript before the start of the Google Summer of Code 2024 coding phase marks a significant step forward. This upgrade unlocks a new era of scalability, streamlined feature implementation, and enhanced developer experience. We're incredibly proud of the collaborative effort that brought this project to fruition, and we extend a heartfelt thank you to our dedicated team and the invaluable community feedback. As we move forward, we're excited to witness the contributions of our Google Summer of Code mentees and the exciting new features they'll bring to life. Vishvamsinh Vaghela will be working on the [script stability enhancement of the website](https://summerofcode.withgoogle.com/programs/2024/projects/8UtMfDDl) and I will be developing a [UI kit for the AsyncAPI website](https://summerofcode.withgoogle.com/programs/2024/projects/S49Gon9W) using the Storybook and Chromatic. These advancements will streamline future development and elevate the developer experience of the AsyncAPI website. We invite you to explore the revamped website and share your feedback! Your continued support inspires us to continuously improve the AsyncAPI ecosystem. Stay tuned for further updates on our progress!

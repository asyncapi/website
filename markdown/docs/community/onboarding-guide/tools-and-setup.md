---
title: Tools and setup
weight: 60
---

## Tools for technical writers

Technical writer contributors need the following tools to contribute to AsyncAPI documentation effectively:

- A laptop or desktop computer capable of running the tools necessary to contribute to the project.
- Stable internet access to clone the project repository, submit contributions, and stay updated on project changes.
- A [GitHub](https://github.com) account. AsyncAPI hosts all its project's source code and documentation on GitHub. You'll need a GitHub account to create issues, fork the repository, submit pull requests, and more. If you're new to GitHub, familiarize yourself with [basic GitHub functionalities and workflows](https://docs.github.com/en/get-started).
- A code editor, such as [VS Code](https://code.visualstudio.com), capable of handling Markdown files.
- [Git](https://git-scm.com), a version control system.

## Setup your AsyncAPI local environment
1. Fork the repository by clicking the `Fork` option on the top right of the main repository.

2. Open Command Prompt on your local computer.

3. Clone the forked repository by adding your GitHub username instead of `<username>`.
   For multiple contributions, follow the [proper configuration of a forked AsyncAPI repo](https://github.com/asyncapi/community/blob/master/git-workflow.md).

```bash
    git clone https://github.com/<username>/website/
```

4. Navigate to the website directory.

```bash
    cd website
```

5. Install all website dependencies. 

```bash
    npm install
```

6. Run the website locally.

```bash
    npm run dev
```

7. Access the live development server at [localhost:3000](http://localhost:3000).

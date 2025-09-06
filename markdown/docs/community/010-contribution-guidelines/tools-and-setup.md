---
title: Recommended Tools and Setup
weight: 30
---

These are the recommended tools for contributors, as well as instructions for setting up the AsyncAPI website in your local environment.

## Recommended Tools
- [Git](https://git-scm.com) to work with the organization's repositories.
- [A GitHub account](https://github.com) to fork AsyncAPI repositories, create issues, submit pull requests, and participate in discussions. If you're new to GitHub, familiarize yourself with [basic GitHub functionalities and workflows](https://docs.github.com/en/get-started).
- A code editor, such as [VS Code](https://code.visualstudio.com) to work on your changes.
- Command-line terminal, such as the one included in your OS, or the terminal integrated in your code editor or IDE, to run commands.
- [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to build and run the website locally.
- A web browser, such as Google Chrome, Firefox or Microsoft Edge to preview your changes. 
- To preview minor changes in Markdown documents without spinning up a dev server, you can use out-of-the-box capabilities of your code editor, or install the corresponding extension. For more information, please consult your code editor's documentation.

## Setup your AsyncAPI local environment
1. Fork the repository by clicking the `Fork` option on the top right of the main repository.

2. Open Command Prompt on your local computer.

3. Clone the forked repository by adding your GitHub username instead of `<username>`.
    For multiple contributions, follow the [proper configuration of a forked AsyncAPI repo](git-workflow).

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

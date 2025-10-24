---
title: AsyncAPI VS Code Preview Goes Web: Now Available in Your Browser 🚀
date: 2025-10-14T3:45:29+05:30
type: Community
canonical:
tags: ['vscode-extension','webview']
cover: /img/posts/may-2021-at-asyncapi/cover.webp
authors:
  - name: Ruchi Pakhle
    photo: /img/avatars/lpgornicki.webp
    link: https://twitter.com/Ruchicodess
    byline: AsyncAPI Maintainer
excerpt: We’re excited to announce that the AsyncAPI VS Code Preview extension is now compatible with the web version of Visual Studio Code. This means you can preview AsyncAPI files directly in your browser, whether you’re using vscode.dev, github.dev, or a local web extension host.
---

For years, the AsyncAPI VS Code Preview extension has been helping developers visualize and work with AsyncAPI documents directly inside VS Code. But until now, you needed a full desktop installation of VS Code to use it.

With this release, the extension is now fully web-compatible. That means:

✨ **Open any GitHub repo in vscode.dev or github.dev**, and you can instantly preview AsyncAPI files in your browser.
🌐 **No local setup required** — just your browser and an internet connection.
🔄 **Works consistently across desktop and web**, providing the same preview experience.

## What Changed Under the Hood?

Making the extension web-compatible required several technical improvements:

- **Removed Node.js-specific modules** like `fs`, `path`, and external dependencies that are incompatible with browsers
- **Introduced lightweight browser utilities** (`pathUtils`) for cross-platform file handling
- **Removed EDAVisualizer** (unmaintained, not compatible with webmode)
- **Updated VS Code dependencies** (`vscode` and `@types/vscode`) to ensure web extension compatibility

## Why Does This Matter?

AsyncAPI adoption is growing quickly, and many contributors explore specs directly from GitHub repositories. Web compatibility lowers the barrier for:

📖 **Contributors reviewing AsyncAPI specs on GitHub** - No need to clone repos locally just to preview files  
🚀 **Teams adopting AsyncAPI in cloud-first workflows** - Work entirely in the browser  
💡 **New users experimenting** without needing to install VS Code  

This is a **huge usability improvement** that makes AsyncAPI more accessible to everyone. Whether you're working with public repositories or have access to private ones, you can now preview AsyncAPI files directly from GitHub with just a few clicks!

## How to Try It Out

1. Open any repo with AsyncAPI files on [vscode.dev](https://vscode.dev)
2. Install the AsyncAPI Preview extension (now web-compatible)
3. Open a `.yaml` or `.json` file and run **AsyncAPI: Preview Document** from the Command Palette
4. That's it! Your AsyncAPI docs will render beautifully in your browser 🚀

## See It in Action

*[Video demo section - placeholder for showcasing the web extension in action]*

<!-- TODO: Add video demo showing:
- Opening a GitHub repo in vscode.dev
- Installing the AsyncAPI Preview extension
- Previewing an AsyncAPI file in the browser
- Highlighting the seamless experience -->

## Spreading the Word

This web compatibility represents a significant step forward for AsyncAPI tooling accessibility. Here's how we can make the community aware of this improvement:

- **Share your experience** on social media when you try the web extension
- **Demonstrate it during team meetings** to show how easy AsyncAPI adoption can be
- **Contribute to discussions** in the AsyncAPI community Slack about web-based tooling
- **Write about your use cases** and how web compatibility improves your workflow

## Maintenance Mode

This extension is now in maintenance mode:

- We'll continue updating dependencies and ensuring compatibility
- No new major features are planned at the moment
- Community contributions for bug fixes and improvements are welcome

## What's Next?

We're excited to bring AsyncAPI Preview into the browser, making it even easier for developers to adopt and explore AsyncAPI. This web compatibility opens up new possibilities for:

- **Educational content** - Easier to demonstrate AsyncAPI concepts
- **Open source contributions** - Lower barrier for reviewing and contributing to AsyncAPI projects
- **Remote collaboration** - Teams can work with AsyncAPI files without local setup requirements

Give it a try on [vscode.dev](https://vscode.dev) today, and let us know what you think in the [AsyncAPI community Slack](https://www.asyncapi.com/slack-invite). Your feedback helps us continue improving the AsyncAPI developer experience! 🚀
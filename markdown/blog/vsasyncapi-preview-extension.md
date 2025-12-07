---
title: 'AsyncAPI VS Code Preview Goes Web: Now Available in Your Browser'
date: 2025-12-07T06:00:00+01:00
type: Community
tags:
  - vscode-extension
  - webview
cover: /img/posts/vs-asyncapi-preview/image.webp
authors:
  - name: Ruchi Pakhle
    photo: /img/avatars/ruchip16.webp
    link: https://twitter.com/Ruchicodess
    byline: AsyncAPI Maintainer & TSC Member
excerpt: 'AsyncAPI VS Code Preview extension is now web-compatible. Preview AsyncAPI files directly in your browser using vscode.dev or github.dev.'
---

For years, the AsyncAPI VS Code Preview extension has been helping developers visualize and work with AsyncAPI documents directly inside VS Code. But until now, you needed a full desktop installation of VS Code to use it.

With this release, the extension is now fully web-compatible. That means:

✨ **Open any GitHub repo in vscode.dev or GitHub.dev**, and you can instantly preview AsyncAPI files in your browser.
🌐 **No local setup required** — just your browser and an internet connection.
🔄 **Works consistently across desktop and web**, providing the same preview experience.

## What Changed Under the Hood?

Making the extension web-compatible required several technical improvements:

- **Removed Node.js-specific modules** like `fs`, `path`, and external dependencies that are incompatible with browsers
- **Introduced lightweight browser utilities** (`pathUtils`) for cross-platform file handling
- **Removed EDAVisualizer integration** (unmaintained, incompatible with web mode)
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
4. That's it! Your AsyncAPI docs will render beautifully in your browser

## Demo

Watch the AsyncAPI VS Code Preview extension working seamlessly in your web browser. This demonstration shows how to install the extension in VS Code web, open an AsyncAPI document, and use the preview functionality to render beautiful documentation directly in the browser without needing a local VS Code installation.

<div id="demo-description" style="margin-bottom: 1rem;">
<p><strong>Demo Overview:</strong> The video demonstrates opening a GitHub repository in vscode.dev, installing the AsyncAPI Preview extension, opening a sample AsyncAPI YAML file, and executing the preview command to generate interactive documentation in the web browser.</p>
</div>

<iframe 
  width="560" 
  height="315" 
  src="https://www.youtube.com/embed/JcS1VRyYmhE?si=DlqqYs3PmJtROTvF" 
  title="AsyncAPI VS Code Preview Web Demo - Browser Extension Walkthrough" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
  referrerpolicy="strict-origin-when-cross-origin" 
  allowfullscreen
  aria-label="Video demonstration of AsyncAPI VS Code Preview extension working in web browser"
  aria-describedby="demo-description">
</iframe>

<p style="margin-top: 0.5rem; font-size: 0.9rem; color: #666;">
<strong>Accessibility Note:</strong> This video includes visual demonstrations of the AsyncAPI extension interface. For a text-based description of the steps shown, please refer to the "How to Try It Out" section above. <a href="#how-to-try-it-out">Jump to written instructions</a>.
</p>

## Spreading the Word

This web compatibility represents a significant step forward for AsyncAPI tooling accessibility. Here's how we can make the community aware of this improvement:

- **Share your experience** on social media when you try the web extension
- **Demonstrate it during team meetings** to show how easy AsyncAPI adoption can be
- **Contribute to discussions** in the AsyncAPI community Slack about web-based tooling
- **Write about your use cases** and how web compatibility improves your workflow

## Maintenance Mode

This extension is now in maintenance mode:

- We'll continue updating dependencies and ensuring compatibility
- No new major features are planned currently
- Community contributions for bug fixes and improvements are welcome

## What's Next?

We're excited to bring AsyncAPI Preview into the browser, making it even easier for developers to adopt and explore AsyncAPI. This web compatibility opens up new possibilities for:

- **educational content** - Easier to demonstrate AsyncAPI concepts
- **open-source contributions** - Lower barrier for reviewing and contributing to AsyncAPI projects
- **remote collaboration** - Teams can work with AsyncAPI files without local setup requirements

Give it a try on [vscode.dev](https://vscode.dev) today, and let us know what you think in the [AsyncAPI community Slack](https://www.asyncapi.com/slack-invite). Your feedback helps us continue improving the AsyncAPI developer experience!

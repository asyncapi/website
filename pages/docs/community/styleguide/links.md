---
title: Links style guide
description: This style guide outline the guideline's for designing links in text, assets, and external references.
weight:
---

## Links style guide

### Introduction
Links are an essential part of any written content, as they allow readers to quickly navigate to other related information. A well-designed link structure can greatly enhance the user experience, while a poorly designed one can be confusing and frustrating. In this style guide, we will outline the guidelines for designing links in text, assets, and external links.

### Link Text 

The Link Text heading is about making your links more effective and user-friendly. Following these guidelines will make your links more informative and engaging for your readers.

- Use descriptive and concise text that accurately reflects the content of the linked page. For example: `Learn more about AsyncAPI` instead of `click here`.
- Avoid using general words such as `click here`, `Learn more` or `check this out` etc.

### External Link 

Linking to external websites is a common practice, but it can be tricky to do it in a way that's user-friendly. By following these guidelines, you'll make it easier for your readers to navigate between your content and external resources without losing their place.

- Use target = `_blank` attribute to open external links in a new tab. This makes it easier for the user to return to the original page.
- Good external links take readers to the resources that are **relevant, and widely trusted**. 
- Below code block is the general example of linking to external source.

```
<a href="https://www.example.com" title="External link: Takes you to the Example website">external link</a>
```

### Link Assets

Linking to assets such as images, videos, and documents is an important part of web design. Proper linking can enhance the user experience, make content more accessible, and improve the overall design of a website.

- Use descriptive file names for all assets to improve accessibility and help users understand the content of the link before clicking on it. For example:
Instead of using `image.jpg`, you can use `Link-structure.jpg`. 
- Always use `alt` text for images and other assets to make them accessible to users with disabilities. The alt text should describe the content of the asset. 
For example: Instead of using `<img src="assets/Link-structure.jpg">`, you can use `<img src="assets/Link-structure.jpg" alt="A workflow of how link should be structured">`
- Use `Target="_blank"` carefully to open the asset in a new window only when necessary. This can be helpful for certain file types, such as PDFs or external links, but should be used judiciously.
> The decision to use `Target="_blank"` should be made carefully because not all users may prefer to have links open in a new tab or window.  whether or not to open a link in a new tab or window ultimately depends on the specific needs and preferences of the website and its users.

### Link Structure 

Use a consistent link structure throughout your content and avoid using too many links in one section. By doing so, you can make your content more organized and easier to read, while also avoiding distractions or confusion.

- Make sure that the links are easily distinguishable from the rest of the text. You can use different colors for links so that links can be easily separated.
- Avoid using too many links in one section, as it can be distracting and overwhelming for the reader. For example, having only 2-3 links in a section of text.

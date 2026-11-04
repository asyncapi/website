---
title: Links
description: This style guide gives advice on creating effective text, internal, external, and asset links in AsyncAPI content.
weight: 120
---



Links serve as pathways through resources referenced in AsyncAPI's content, and their design directly impacts how users navigate and engage with it.

## Text Links

Here are some ways to effectively design links when referencing sources in a tutorial, blog post, or making an update to AsyncAPI's documentation:

- **Be clear and concise**: Make sure the link text accurately describes the destination or action, so users know what to expect when clicking.
- **Be descriptive**: Using common phrases like "Click Here" or "Read More" makes it harder for users, especially those who use screen readers to navigate the web, to understand what will happen.
- **Be relevant**:  It's best to ensure that the link's text describes the source in a way that connects to the content's topic. This helps users gain a better understanding of the material they are reading.
- **Be unique**: Avoid using the same text for sources' links. This helps screen reader users distinguish between different navigation options and prevent confusion for all readers.

## Asset Links

Consider using the following tips to format links for files, images, and other forms of multimedia in AsyncAPI's content:

- **Use absolute paths**: When linking to assets, use the full path to the asset file rather than a relative path. This ensures that the link will work correctly regardless of where the content is accessed from.
- **Use recent version files**:  Check that the assets used in the content are up-to-date. This ensures that readers get the correct information.
- **Use meaningful names for files**:  Make sure the file names for assets correspond to what they describe. This makes the tutorial, blog post, or documentation-related update more accessible, especially for users who use screen readers to navigate the site.  

## External Links

When referencing sources that will take users outside AsyncAPI, refer to the following tips:

- **Use absolute URLs:** Always include the full URL, starting with `https://`, for external resources. This helps users understand where they are going and prevents confusion. For example: `https://www.asyncapi.com/docs/community/000-onboarding/github-actions`, not `docs/000-onboarding/github-actions.md`.
- **Let users know when a link goes to another website:** Tell readers if clicking a link will take them away from the AsyncAPI site. This helps them know what to expect before they click.
- **Use link text that fits the sentence:** Place links within sentences so the link text clearly tells users where the link goes. This helps readers understand what to expect and makes the content easier to follow.

## Internal Links

When it comes to referring to other sections within the content being created for AsyncAPI, consider using the following methods:

- **Use full rendered URLs**: When linking to another documentation page, use its full URL on the AsyncAPI website. Do not use a relative path to its repository source.
- **Preserve heading fragments**: When linking to a specific heading, retain the fragment after the page URL.
- **Use same-page anchors**: Links to headings within the current page can use a fragment such as #getting-started.

## Examples

### Example of a Text Link

`For more information, visit the [AsyncAPI website](https://www.asyncapi.com).`

### Example of an Asset Link

`![Lightbulb](https://www.asyncapi.com/img/illustrations/icons/icon.svg)`

### Example of an Internal Link

`Read the [GitHub Actions guide](https://www.asyncapi.com/docs/community/000-onboarding/github-actions).`

### Example of an External Link

`For more details, visit the [AsyncAPI Blog](https://www.asyncapi.com/blog){:target="_blank" rel="noopener"}.`

## Additional Resources

 For more tips on creating effective links, consider consulting the following sources:

- [Creating Links](https://anvilproject.org/guides/content/creating-links)
- [Markdown Hacks: Link Targets](https://www.markdownguide.org/hacks/#link-targets)
- [Mastering Markdown: Your Ultimate Guide to Creating Links](https://www.devzery.com/post/mastering-markdown-your-ultimate-guide-to-creating-links)

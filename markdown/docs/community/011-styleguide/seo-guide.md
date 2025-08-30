---
title: SEO
description: This guide gives advice on how to implement SEO when creating tutorials and other forms of content for AsyncAPI.
weight: 130
---

## What is SEO?

Search Engine Optimization (SEO) encompasses various techniques and strategies to improve a website's visibility in search engine results. Effective SEO can increase organic traffic by ensuring relevant content reaches the intended audience.

## Why is SEO important in technical documentation?

Integrating SEO practices into technical documentation makes it easier for users and contributors to discover valuable resources and ultimately fosters community engagement and collaboration, enhancing the overall knowledge base.

## SEO best practices  

### Headings?

Headings are HTML tags that create a structured hierarchy in content, making it easier for readers to navigate and for search engines to index.

#### Strategies for making SEO-friendly headings

- **Use Hierarchical Order:** Begin with the `<h1>` tag for the main title, followed by `<h2>` for major subsections, `<h3>` for sub-subsections, and so forth, ensuring a clear structure throughout the documentation.
- **Incorporate Relevant Keywords:** Utilize keywords strategically, particularly within `<h1>` and `<h2>` tags, as these are among the first elements users engage with.

### Examples of SEO-friendly headings from AsyncAPI's documentation

```md
# Server
## What is a Server?
## What is the purpose of servers?
### Client and Server
```

### What are URLS?

URLs serve as the addresses for web pages and other online resources. An SEO-friendly URL structure improves user experience and enhances discoverability.

#### Strategies for making SEO-friendly URLs

- **Keep It Short:** Short URLs are simpler for users to remember and share.
- **Include Keywords:** Effective keyword incorporation helps search engines index the URL successfully.
- **Avoid Special Characters and Spaces:** Use hyphens (-) instead of underscores (_) to separate words, as search engines interpret hyphens as spaces.

Here are some examples of SEO-friendly URLs from AsyncAPI's documentation:

- `https://www.asyncapi.com/docs/concepts/application`
- `https://www.asyncapi.com/docs/concepts/server`
- `https://www.asyncapi.com/docs/concepts/message`

These URLs are concise and relevant to the documentation's topics, avoiding special characters.

### What is Anchor Text?

Anchor text refers to the clickable text in a hyperlink, providing context about the linked webpage's content.

#### Strategies for making SEO-friendly anchor texts

- **Use Descriptive Phrases:** Ensure the anchor text is relevant to the linked content, incorporating keywords without overstuffing.
- **Consider User Intent:** Tailor the anchor text based on what users will likely search for within the documentation.
- **Update Regularly:** As AsyncAPI evolves, it is important to refine the anchor text regularly to match updated content.

### Examples of SEO-friendly anchor texts from AsyncAPI's documentation

- [AsyncAPI](https://github.com/asyncapi)
- [Server Object](https://www.asyncapi.com/docs/reference/specification/latest#serverobject)
- ["The many meanings of Event-Driven Architecture"](https://www.youtube.com/watch?v=STKCRSUsyP0)

These links include relevant keywords such as "AsyncAPI", "Server Object", and "the many meanings of Event-Driven Architecture", which accurately describe the content they are linked to.

### What is Internal Linking?

Internal linking involves creating hyperlinks within a document that connect to other sections or relevant resources. The practice enhances navigation within AsyncAPI's content.

#### Strategies for making SEO-friendly internal links

- **Develop an internal link structure**: Consider deciding the types of internal links to use when writing a blog post or documentation for AsyncAPI. Doing so would help increase the chances of the content appearing in the search results. To learn more about the different styles of internal links, check out the [Types of Internal Links section in "Internal Links for SEO: An Actionable Guide"](https://ahrefs.com/blog/internal-links-for-seo/#types-of-internal-links).
- **Create unique anchor texts:** Use distinct text for different links to avoid user confusion and clarify the destination content.
- **Include keywords in your anchor text**: Including relevant keywords in internal links helps search engines understand the content's focus.

### Examples of SEO-friendly anchor texts from AsyncAPI's website

- "In this case, in your AsyncAPI file, you describe the `server`, and therefore, the [Server Object](https://www.asyncapi.com/docs/reference/specification/latest#serverObject) holds information about the actual server, including its physical location."
- "JSON Schema Draft 07 is 100% compatible with AsyncAPI schemas. You can also use other standards to describe payload schema, such as [Avro](https://github.com/asyncapi/avro-schema-parser#usage)."
- "Furthermore, the [Pub/sub](/docs/tutorials/getting-started/event-driven-architectures#publishersubscriber) is appealing for IoT use cases due to two key features: support for flexible coupling between publishers/subscribers and inherent support for point-to-multipoint transmission."  

### What are meta descriptions?

Meta descriptions are short snippets of HTML that briefly summarize a web page's content. They appear below the page title in search results and can influence click-through rates.

>[!NOTE]
> Meta descriptions are often written in YAML format for AsyncAPI's documentation.

#### Strategies for making SEO-friendly meta descriptions

- **Be Concise and Informative:** Summarize the content, keeping it under 160 characters to ensure it displays fully in search results.
- **Include Keywords:** Use relevant keywords to improve search visibility while accurately reflecting the page content.
- **Engage the Reader:** Write compelling descriptions encouraging search engine results clicks.

### Examples of SEO-friendly meta descriptions from AsyncAPI's website

- `title: Kafka bindings
description: Learn how to configure Kafka bindings in your AsyncAPI document.`
- `title: "Validate AsyncAPI documents"
description: In this guide, you'll learn multiple ways to validate AsyncAPI documents.`
- `title: Generate code
description: In this tutorial, you'll learn how to generate code from your AsyncAPI document.`

In addition to having information that correlates to the content's topic, these meta descriptions are concise and contain keywords.

### Why is mobile-friendliness important to technical documentation when making it SEO-friendly?

With most online content consumed on smartphones, tablets, and computers, ensuring that AsyncAPI's mobile-friendly content is essential. Research shows that **users are more likely to return to and positively view a website if it is mobile-friendly**. Additionally, technical documentation that is optimized for mobile devices tends to rank higher in search results.

#### Strategies for making mobile and SEO-friendly content

Here are some ways to make blog posts and documentation for AsyncAPI's website mobile and SEO-friendly.

- **Use Smaller Images and Videos**: Large media files can slow down page loading times, leading to a poor user experience. Opt for smaller, optimized files whenever possible.

- **Select Mobile-Friendly Fonts**: Some fonts can be difficult to read on smaller screens. Choose adaptable font styles for body text, and it should ideally be between 14-16 points for headings and 12 points for body text.
- **Create Individual Pages or Sections for Each Topic**: Providing dedicated pages or sections for different topics and links to related content will enhance navigation and usability.

### Why is quality important when making technical documentation that is SEO-friendly?

Search engines prioritize content that delivers real value to users. Therefore, ensuring that your content is of high quality is crucial.

#### Strategies for making high-quality and SEO-friendly content

When writing for AsyncAPI's blog or documentation, ask yourself the following questions to ensure your content meets quality standards:

- Is the content interactive and engaging?
- Is the information presented accurate?
- Is the content too technical for its intended audience?

### Images

How images are incorporated into technical documentation can significantly impact search engine rankings. Therefore, it is vital to optimize images effectively.

### Strategies for making images SEO-friendly

To make SEO-friendly images, it is recommended to use the following methods:

- **Create Descriptive Alt Text**: Ensure each image has alt text that accurately describes its context and purpose. It helps with SEO and improves accessibility for users who may not see the image.
- **Use Supported Image Formats**: Formats such as **WEBP** are widely used throughout AsyncAPI and are recognized by search engines, making them preferable for web use.
- **Optimize File Sizes**: Large image files can slow a website's loading times. Compress and reduce the file sizes before including them in your documentation or blog posts to enhance performance.

By implementing these best practices, you can enhance the SEO of your technical documentation, making it more accessible and valuable to users and contributing to a thriving community.

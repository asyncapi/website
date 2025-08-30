---
title: Formatting
description: This guide illustrates the standards for formatting and writing our documentation.
weight: 100
---

## Documentation formatting

Documentation formatting refers to how the document appears on the page and how the content is organized, which includes font selection, font size, and presentation (such as bold or italics), spacing, margins, alignment, columns, indentation, and lists. Formatting helps the reader perceive the information and makes it more accessible. 

### Notes and warning blocks

Notes and warning blocks are used to draw attention to important information. Use the following markdown features when necessary:

- Use a clear and concise heading to introduce the note or warning.
- Use short paragraphs or bullet points to convey the information.
- Keep the language simple and direct.
- Use an `>` in markdown to indicate the nature of the note or warning. 
- Use the following syntax to apply a style. Currently our documentation supports **Remember** `<Remember>`:
  * Surround the text you want to style with an opening <Remember> tag and a closing </Remember> tag.
  * Note that the word 'Remember' does not need to be included within the tags, as it automatically provides the necessary styling.
  * Use the following syntax to apply a style:
  ` <Remember> 
  No need to add a prefix; the tag automatically provides one
  </Remember>`
  
  The output: 
  <Remember> 
  No need to add a prefix; the tag automatically provides one
  </Remember>

## Code blocks

Code blocks are used to display code examples or snippets. 

- In a Markdown document, use the `<CodeBlock>` tag and specify the language.
  Use the following syntax to apply a code block:
  ```
  <CodeBlock language="bash">
  {`npm start`}
  </CodeBlock>
  ```
  
  The output:
  
  <CodeBlock language="bash">
  {`npm start`}
  </CodeBlock>
  
- Use code style for filenames, directories, and paths. For example: Go to the `/docs/tutorials` directory.
- Choose a consistent number of spaces for indentation, such as 2 or 4 spaces, and use it consistently throughout the document.
- Indent the code properly to show its structure and hierarchy. Each level of indentation should align with the appropriate scope.
- Avoid using tabs for indentation, as they may not render consistently across different platforms or text editors.
For example, when writing code in Markdown, use four spaces for each level of indentation:
```
function myFunction() {
    if (condition) {
        console.log("Condition is true.");
    } else {
        console.log("Condition is false.");
    }
}
```
- Use single backticks to enclose inline code. For example, `asyncapi new --example=tutorial.yml --no-tty`
- Remove any trailing spaces in the code. Trailing spaces can disrupt the readability and formatting of the code, so ensure they are removed.
- Use triple backticks to enclose YAML code blocks. Specify the language as "yaml" within the backticks. This syntax is specifically for displaying code blocks that contain YAML content.
  * Use this syntax:
  ` ```yaml
  asyncapi: '3.0.0'
  info:
  title: Account Service
  version: 1.0.0
  ``` `
  
  * The output:
  ```yaml
  asyncapi: '2.5.0'
  info:
  title: Account Service
  version: 1.0.0
  ```

## Spacing

Line spacing, or the vertical space between lines of text in a paragraph, can aid or hinder reading. Adequate line spacing helps readers navigate from the end of one line to the start of the next.

- Leave a blank line between paragraphs to visually separate them. This helps readers distinguish between different sections of content.
- For headings and subheadings, leave a blank line before and after them to provide clear visual separation.
- Leave a single line spacing after bullet points or numbered lists to enhance readability.
- Use consistent indentation to show the hierarchy of the content.
- Indentation can be achieved with either 2 or 4 spaces, depending on your preference or the coding style guidelines of your project. Choose one and use it consistently throughout the document.
- Use indentation to show nested content, such as code blocks, lists, or paragraphs within a list item.
- Indent code blocks by an additional indentation level to differentiate them from regular text.

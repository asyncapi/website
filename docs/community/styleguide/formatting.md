---
title: Formatting style guide
description: This style guide explains using correct formats when writing documentation.
weight: 
---
## Documentation formatting

### Notes and warning blocks

Notes and warning blocks are used to draw attention to important information. Use the following markdown features when necessary:

- Use a clear and concise heading to introduce the note or warning.
- Use short paragraphs or bullet points to convey the information.
- Keep the language simple and direct.
- Use an `>` in markdown to indicate the nature of the note or warning. 
- Use the following Use the following syntax to apply a style. Currently our documenation supports **Remember** `<Remember>`:
  * Surround the text with an opening and closing tag.
  * Use the following syntax to apply a style:
  ` <Remember> 
  No need to add a prefix (Remember); the tag automatically provides one
  </Remember>`
  
  The output: 
  <Remember> 
  No need to add a prefix (Remember); the tag automatically provides one
  </Remember>

## Code Blocks

Code blocks are used to display code examples or snippets. 

- In a Markdown document, use the `<CodeBlock>` tag and specify the language.
  * Use the following syntax to apply a codeblock:
  `<CodeBlock language="bash">
  {`npm start`}
  </CodeBlock>`
  
  The output:
  
  <CodeBlock language="bash">
  {`npm start`}
  </CodeBlock>
  
- Use code style for filenames, directories, and paths. For example: Go to the `/docs/tutorials` directory.
- Use indentation to show the structure of the code.
- Use single backticks to enclose inline code. For example, `asyncapi new --example=tutorial.yml --no-tty`
- Remove trailing spaces in the code.
- For yaml document, enclose with triple backticks and specify `yaml`. (```)
  * Use this syntax:
  ` ```yaml
  asyncapi: '2.5.0'
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

Line spacing, or the amount of vertical space between lines of text in a paragraph, can aid or hinder reading. Adequate line spacing aids readers in navigating from the end of one line to the start of the next.

- Use appropriate line spacing to make the content more readable. A single line spacing is usually sufficient for most cases.
- Use consistent indentation to show the hierarchy of the content.

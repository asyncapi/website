---
title: Grammar
description: The style guide gives advice on how to implement grammar when creating tutorials and other forms of content for AsyncAPI.
weight: 70
---

## Abbreviations and acronyms

When using abbreviations and acronyms, write the full term followed by the acronym in parentheses. After that, use the acronym for subsequent references. Here's an example:

> An application can be a microservice, IoT (Internet of Things) device (for example, a sensor), mainframe process, and more.
> That aspect is particularly beneficial in setups like IoT, where topics are often assigned per device or device segment.

 By using acronyms and abbreviations effectively, users can easily understand their context and meaning within the tutorial or guide.

## Active Voice

 When writing documentation and other forms of content for AsyncAPI, use active voice whenever possible. Here's an example:

✅ **DO:** "In the context of channel addresses within AsyncAPI documents, parameters play a crucial role in defining the dynamic components of an address."  

❌ **DON'T:** "In the context of channel addresses within AsyncAPI documents, the dynamic components of an address were defined by parameters."

As shown in the above sentence, active voice makes the concept more engaging and easier to understand.

## Capitalization

When capitalizing titles, headings, and certain words and terms, use the following rules:

- Capitalize the first word of a sentence.
- Capitalize the first word in a heading and title.
- Capitalize all:
  - Nouns
  - Pronouns
  - Adjectives
  - Verbs
  - Adverbs
  - Prepositions (in, on, at, by, for, with, to, from, of, about, through, between, among, under, over, after, before, during)
  - Some subordinating conjunctions (if, unless, while, until, since, as, because, that, which, who, whom, whose, what, where, when, how, why)
- Avoid using all capital letters for emphasizing a term or concept (use italics sparingly).
- Avoid capitalizing:
  - Spelled-out acronyms unless they are proper nouns (API, HTTP, URL)
  - Articles (a, an, the)
  - Conjunctions (and, but, or, nor, for, so, yet) unless they are part of a title or heading ("Parameters in channel address")
  
## Spelling

Here are some preferred spellings of certain words:

- Use "color" instead of "colour"
- Use "center" instead of "centre"
- Use "organization" instead of "organisation"
- Use "program" instead of "programme"

## Verb Tense

When writing documentation and other forms of content for AsyncAPI, use the present tense. Here's an example:

✅ **DO:** "The dynamic segment of each channel address, which corresponds to the device identifier, is then articulated through the use of parameters."

❌ **DON'T:** "The dynamic segment of each channel address, which corresponds to the device identifier, was then articulated through the use of parameters."

## Personal Pronouns

 Use personal pronouns sparingly when writing tutorials and other forms of content for AsyncAPI to make them more human and approachable to users. Here's an example:

✅ **DO:** "You can add parameters to the `channel.address` by adding a parameter between curly braces like {'{'}`braces`{'}'}. Next, use `channel.parameters` to define your parameters. Finally, leverage the `components.parameters` to enable reusable parameters' definitions across multiple channels."

❌ **DON'T:** "You should add parameters to the `channel.address` by placing a parameter between curly braces like {'{'}`braces`{'}'}. After that, you need to use `channel.parameters` to define your parameters. Finally, you should leverage `components.parameters` to enable reusable parameters' definitions across multiple channels."

## Additional Resources

  If you're looking for more information on grammar and style, consider checking out the following guides:

- [Google Style Guide](https://developers.google.com/style)
- [Microsoft Style Guide](https://learn.microsoft.com/en-us/style-guide/welcome/)
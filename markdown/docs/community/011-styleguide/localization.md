---
title: Internationalization (i18n) and Localization (l10n)
description: A guide to translating AsyncAPI documentation into multiple languages
weight: 170
---

## Internationalization and Localization

As AsyncAPI gains more users worldwide, it becomes crucial to create tutorials, guides, and other documentation that are accessible and adaptable to different cultures. This requires both internationalization (i18n) and localization (l10n). Internationalization is the process of designing and preparing content so it can be easily adapted to multiple languages and locales. Localization is the process of actually adapting that content or software for a specific language, region, or culture. This guide provides recommendations and tips to help contributors with both internationalizing and localizing of AsyncAPI documentation.

## Key Principles of Internationalization

### Language Considerations

* Write content in clear, simple English that can be easily translated
* Avoid idiomatic expressions, colloquialisms, and region-specific references
* Use straightforward sentence structures
* Avoid complex grammatical constructions where possible

### Cultural Sensitivity

* Avoid using cultural references and humor that may not translate or be understood globally
* Be mindful of cultural nuances when writing about specific topics
* Use neutral, commonly understood language that appeals to a diverse audience

## Localization Best Practices

### Translation Preparation

* Use consistent terminology throughout documentation
* Create a centralized glossary of technical terms
* Provide context for translators
* Leave space for translated content to be added later

### Structural Considerations

* Ensure documentation layout supports right-to-left (RTL) and left-to-right (LTR) languages
* Use flexible design that accommodates varying text lengths
* Use clear, internationally recognized formats for dates (for example, ISO 8601: YYYY-MM-DD), times, and units (for example, "meters" instead of "m")
* Avoid region-specific formats and always specify time zones and units to ensure clarity and consistency.  For example, of writing `03/04/2024 8:00 AM`, use `2024-04-03T08:00:00Z` (ISO 8601 format, UTC time zone). For measurements, write `5 meters` instead of `5m` or `16 feet`

### Currency and Number Formatting

* Always specify the currency using the ISO 4217 currency code (for example, `USD`, `EUR`, `JPY`) instead of ambiguous abbreviations like `$`, `€`, or `¥`
* Place the currency code before or after the amount as appropriate for clarity (for example, `USD 100` or `100 USD`)
* Use internationally recognized number formats (for example, `1,000.50` for one thousand and fifty hundredths)
* Avoid using local currency symbols or formatting that may be misinterpreted in other regions. For example, use `USD 100` instead of `US$100`

### Tools and Frameworks

* Use internationalization (i18n) frameworks and tools such as [i18next](https://www.i18next.com/)
* Support Unicode and multi-language character sets
* Implement language-switching mechanisms
* Store translatable strings separately from code

## Additional Resources

For more tips on internationalizing and localizing AsyncAPI's documentation, consider consulting the following sources:

* [Internationalizing Technical Content](https://www.hireawriter.us/technical-content/internationalizing-technical-content)
* [Best Practices for Writing Global-Ready Content for Localization](https://phrase.com/blog/posts/writing-10-best-practice-tips-on-how-to-write-global-ready-content-for-localization/)
* [I18n Best Practices: Keep it together!](https://localization.blog/2022/05/16/i18n-best-practices-keep-it-together/)

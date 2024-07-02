---
title: Numbers style guide
description: This style guide outlines the guidelines for numbers and words, commas, and decimals in numbers and number ranges.
weight:
---

## Numbers style guide

### Introduction

This style guide defines standards for AsyncAPI documentation for Numbers across topics such as Numbers as words and numerals, commas and decimal points in numbers, number ranges. If you are a part of the AsyncAPI Slack, use the #13_docs channel for any queries. Please make sure to go through the style guide before contributing to AsyncAPI documentation.

### Numbers as numerals

This guideline covers when to use numerals to write numbers in the documentation.

In general, use numerals in the following case.

- Numbers 10 and greater.

  - **Correct**: 27 minutes
  - **Incorrect**: twenty seven minutes

- Negative numbers.
- Dimensions.
- Percentages.
- Fractions.
- Number in a range.

### Numbers as words

This guideline covers when to use numbers as a word in the documentation.

In general, Numbers can be spelled out as a word in the following case.

- Numbers from zero to nine.

  - **Correct**: four options
  - **Incorrect**: 4 options

- A number that starts a sentence.
  - **Correct**: Fifteen directories are created.

> Note: In some cases, it's better to rearrange the sentence so that the number appears later.

- A number that is followed by a numeral.

- Indefinite and casual numbers.
  - **Correct**: The API might return a list of a million songs.
  - **Incorrect**: The API might return a list of 1 million songs.

> Note: There is an exception in the following case to always use numerals even if they're less than 10.
>
> - Version numbers.
> - Technical quantities, such as amounts of memory, numbers of queries, etc.
> - Chapter numbers, sections, and page numbers.
> - Prices

### Commas and decimal points in numbers

In running text, use commas only in four-digit and larger numbers.
For long decimal numbers, do not use any digit-group separators to the right of the decimal point.

For example:

- **Correct**: The limit is 1,969,784 bytes per day.
- **Incorrect**: The limit is 1969784 bytes per day.

- **Correct**: 0.031611
- **Incorrect**: 0.031 611

### Number ranges

The number range can be written by including a hyphen with no space on either side of it.

For example:

- **Correct**: 2010-2020.
- **Incorrect**: 2010 - 2020

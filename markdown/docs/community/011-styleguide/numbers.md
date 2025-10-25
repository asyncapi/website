---
title: Numbers
description: This style guide provides guidelines for writing numbers as words, number ranges, and so on in AsyncAPI documentation. 
weight: 80
---

# Numbers Guidelines

## Numbers as Words/Numerals
1. Use numerals for numbers **10 and above**. Spell out numbers **zero through nine**.

   ### Examples
   - "Submit to *three* repositories."
   - "A *10*-day conference"
   - "*Two* messages"

2. Use numerals consistently in a sentence if the first number is greater than 10.

   ### Examples
   - "AsyncAPI has *21* maintainers; *5* are in charge of the CLI repository, *10* manage the website repository, and *6* handle other repositories."
   - "They fixed *12* bugs today; *4* in the morning, *6* in the afternoon, and *2* at night."

3. Spell out numbers when starting a sentence. Do **not** begin a sentence with a numeral.

   ### Examples
   - "*Seven* free tickets are available for the conference."
   - "A *60*-year-old man."
   - "About *17* community members voted for a change."
   - "*Six* more people joined the meeting."

### Exceptions

1. You may mix words and numerals in a sentence if the numerals are significantly larger.

   - "We are running about twenty series of tests on 200,000 lines of code."

   Alternatively:
   - "We are running about 20 series of tests on 200,000 lines of code."

2. For estimations, you may spell out large values using "million" or "billion."

   - "The team has probably spent about a *million* to maintain their infrastructure."
   - "Currently, general expenses are running into *billions*."

3. Use numerals for units of measurement, even for values less than 10.

   - "It will stretch up to *6km* at most."
   - "Drink about *3ml* of water every day."

4. Use the minus sign for negative numbers.

   - "-5"
   - "-300"


## Number Ranges
Use prepositions such as *from* and *through* or *to*, depending on the context. Use a hyphen for concise numeric ranges.

   ### Examples
   - "*From* 12 *through* 20"
   - "The meeting runs *from* 2 PM *to* 3 PM UTC."
   - "Chapters 1–5"


## Ordinal Numbers
Ordinal numbers indicate position or order in a sequence (e.g., first, third, tenth).

Spell out ordinal numbers as words.

### Examples
- "I have submitted my *first* task for this internship."
- "They will review the docs for the *tenth* time today."

## Decimals
Always write decimals with a leading zero before the decimal point.

### Examples
- "0.3"
- "0.0021"

No need to spell out decimal numbers.

## Fractions
Use decimals when possible. If using written fractions, spell them out using a hyphen between the numerator and denominator.

### Examples
- "We have covered *one-third* of this documentation."
- "We have set up *two-thirds* of our infrastructure."


## Currency
Use the currency symbol followed by the value. If multiple countries use the same symbol (e.g., dollars), include the country code acronym.

### Examples
- "$10 USD"
- "$10 CAD"
- "$5 AUD"

You do not need to spell out currency values, even if they are less than 10.


## Commas in Numbers
Use commas for numbers **five digits and above**.

### Examples
- "2000"
- "88,000"

### Exceptions 
Do not use commas in numbers for pages, weather values, addresses, and similar cases.

#### Examples
- "pg. *24567*"
- "SW *1015*"
- "Grovel Park, *10067E*"


## Abbreviations
You may abbreviate units of measurement (e.g., km, px, cl), but avoid abbreviating large numbers such as "million" or "billion."

### Examples
- "It has about 3px camera quality."
- "They have spent about $30 million on storage costs alone."
- "There are about a billion lines of code in the codebase. You cannot read everything."


## Percentages
Use the percentage symbol (%) after numerals. If starting a sentence, spell out the percentage.

### Examples
- "*Forty percent* of the files have been recovered."
- "About *40%* of the files have been recovered."


## Phone Numbers
When writing phone numbers, include the country code and separate the sections with hyphens.

### Examples
- "+234-81-233-679-21"
- "+256-81-233-877-90"

> **Note:** Unless entering personal information on a secure platform, always use example phone numbers when creating content.


## Date and Time

### Date
When writing dates with numerals, use the **YYYY/MM/DD** format. When writing in words, use the **Month Day, Year** format with a comma before the year.

#### Examples
- "2025/04/21"
- "April 21, 2025"

### Time
Always indicate a general time zone (e.g., UTC). Use the 12-hour format where appropriate.

#### Examples
- "11:00 AM (UTC)"
- "3:15 PM (UTC)"
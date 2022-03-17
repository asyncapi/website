# Typography

Typography components have been added to the components according to the design requirements of the website. Typographies are classified into three types. Heading, Paragraph and TextLink.

## How to use?

### Headings

```jsx
<Heading>This is a heading</Heading>
```

There are attributes that you can use to manage different heading styles. Such as `level`, `typeStyle`, `textColor`.

- **Setting up Heading Levels**

    - Levels work just like the sequence of headings from `<h1>` to `<h6>`. You can set levels by using the `level` prop. Here's an example below on how to use it.

        ```jsx
        <Heading level="h1">This is a heading</Heading>
        <Heading level="h2">This is a heading</Heading>
        <Heading level="h3">This is a heading</Heading>
        <Heading level="h4">This is a heading</Heading>
        <Heading level="h5">This is a heading</Heading>
        <Heading level="h6">This is a heading</Heading>   
        ```

    - By default, the `level` of heading has been set to `h2`.

- **Setting up Heading Type Styles**

    - There are several type-styles for Heading component which can be used by using `typeStyle` attribute. Here's an example below on how to use it.

        ```jsx
        <Heading typeStyle="heading-md">This is medium heading</Heading>
        ```

    - Here's a list of `typeStyles` you can use in Headings.

    | `typeStyle` value | Tailwind class |
    |-------------------|----------------|
    | `typeStyle="heading-xl"` | `font-heading text-2xl font-bold tracking-heading md:text-6xl leading-snug` |
    | `typeStyle="heading-lg"` | `font-heading text-2xl font-bold tracking-heading md:text-4xl leading-snug` |
    | `typeStyle="heading-md"` | `font-heading text-2xl font-bold tracking-heading leading-snug` |
    | `typeStyle="heading-md-semibold"` | `font-heading text-2xl font-semibold tracking-heading leading-snug` |
    | `typeStyle="heading-sm"` | `font-heading text-xl font-bold tracking-heading leading-snug` |
    | `typeStyle="heading-sm-semibold"` | `font-heading text-xl font-semibold tracking-heading leading-snug` |
    | `typeStyle="heading-xs"` | `font-heading text-base font-bold tracking-heading leading-snug` |
    | `typeStyle="heading-xs-semibold"` | `font-heading text-base font-semibold tracking-heading leading-snug` |
    | `typeStyle="body-lg"` | `font-heading text-lg leading-relaxed tracking-body font-regular` |
    | `typeStyle="body-md"` | `font-heading text-base leading-relaxed tracking-body font-regular` |
    | `typeStyle="body-sm"` | `font-heading text-sm leading-relaxed tracking-body font-regular` |
    | default type-style | `font-heading text-2xl font-bold tracking-heading md:text-6xl leading-snug` |

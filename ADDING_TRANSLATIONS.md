# Adding Translations to AsyncAPI Website <!-- omit in toc -->

We appreciate your valuable contributions to the AsyncAPI website, whether it's adding or improving existing translations.

## Table of contents <!-- omit in toc -->
- [Improving existing translations](#improving-existing-translations)
- [Adding translations to a partially localized page](#adding-translations-to-a-partially-localized-page)
- [Adding translations to a new page](#adding-translations-to-a-new-page)
- [Adding a new locale](#adding-a-new-locale)

## Improving existing translations

To modify or improve existing translations, simply navigate to the `locales` folder and edit the appropriate `JSON` files for your preferred language.

Here is an example directory structure for the `locales` folder. It contains sub-folders named after different languages, each of which contains `JSON` files with key-value pairs for translations.

The file `common.json` contains common translation keys such as buttons and CTAs. The other JSON files are specific to certain pages on the website. For instance, `tools.json` includes translations for all the tools-related pages on the website.

```
📦locales
 ┣ 📂de
 ┃ ┣ 📜common.json
 ┃ ┣ 📜landing-page.json
 ┃ ┗ 📜tools.json
 ┃ ┗ 📜....json
 ┗ 📂en
 ┃ ┣ 📜common.json
 ┃ ┣ 📜landing-page.json
 ┃ ┗ 📜tools.json
 ┃ ┗ 📜....json
```

To modify a `Landing Page`'s heading:
- Navigate to the `locales` folder.
- Select a language, e.g. `de` (German) - go to the `de` folder.
- Open `landing-page.json`.
- Change the values according to your needs.
- Create a pull request with the changes.

## Adding translations to a partially localized page

The text on any given page may not have a translation available in your language.

Use the translation hook with the key specified in the `locales` folder.

Suppose the Landing Page has a button that is still in English when the language is set to German:
- Navigate to the file where the component is defined.
- Import the `useTranslation` hook from `utils/i18n`.
- Extract the translation function from the hook `const { t } = useTranslation();`.
- Use it to pass the key of the required translation value. Make sure to add the required key to the `locales` folder according to the page's scope. In this example, we are adding translation for a button, since all translation keys related to buttons need to be specified in `common.json`.

Example:

`ICSFileButton.js`
```diff
...
+ import { useTranslation } from '../../utils/i18n';

export default function ICSFButton({
- text = 'Download ICS File',
+ text = 'icsFileBtn',
  ...
}) {

+  const { t } = useTranslation('common');

  return (
    <Button
-     text={text}
+     text={t(text)}
      ...
    />
  )
}
```

`en/common.json`
```diff
{
+    "icsFileBtn": "Download ICS File",
}
```

`de/common.json`
```diff
{
+    "icsFileBtn": "ICS-Datei herunterladen",
}
```

Ensure consistent naming in all `locales/[lang]/[file].json` files, and add a translation for all the locales present in the `locales` folder.

> **NOTE**: You may also need to fix the cypress tests after adding a new translation key.

## Adding translations to a new page

The process for adding translations to a page that is not yet available in any existing locale is different from adding translations to a specific part of the page that is partially translated.

**1. Create new JSON Files**
  - Navigate to the `locales` folder.
  - Create new `JSON` files with the same name in each of the `locales` folder. You may not need to create new `JSON` files in case there already exists a file with the same scope as your page. For example, all pages under the `tools/*` use the translation keys defined in `locales/[lang]/tools.json`.
  - Skip to `Step 3` in case you haven't created new `JSON` files.

**2. Modify the i18n configuration**
  - Navigate to the `next-i18next-static-site.config.js` file in the root of the project folder.
  - Add the name of the newly added `JSON` file to the `namespaces` array.

**3. Add the static site functions**
  - Copy the page(s) that you want to be localized to the `pages/[lang]/` folder according to the appropriate directory structure.
  - Add the following functions at the bottom of the file for `i18n` to work.
    ```js
    export async function getStaticPaths() {
        const paths = getAllLanguageSlugs();
        return {
            paths,
            fallback: false,
        };
    }

    export async function getStaticProps({ params }) {
        const language = getLanguage(params.lang);
        return {
            props: {
                language,
            },
        };
    }
    ```
    
  - Follow the [Adding Translations guide](#adding-translations) to start translating the components

**4. Configure i18n routing**
After adding a new internationalized page, test it to sure the page is being served on the website when someone visits it.
  - Replace the `next/link` component with the `LinkComponent` from `components/link.tsx` in the files where the page's `href` is being referenced.
  - Make sure to add the exact same `href` to the `utils/i18n.ts` in the respective locales which support that `href`.

  For example, if you want to translate the `pages/newsletter.tsx` page, so that if someone visits `asyncapi.com/de/newsletter`, it shows the page in the `German` locale.

  - Add new `JSON` files to the `locales/en` and `locales/de` folder.

  `locales` folder directory structure
  ```diff
    locales
     ┣ de
     ┃ ┣ common.json
     ┃ ┣ landing-page.json
  +  ┃ ┣ newsletter.json
     ┃ ┗ tools.json
     ┗ en
     ┃ ┣ common.json
     ┃ ┣ landing-page.json
  +  ┃ ┣ newsletter.json
     ┃ ┗ tools.json
    ```

  - Modify the `i18n` config to include the `newsletter` namespace.

  ```diff
  module.exports = {
      i18n: {
          languages: ["en", "de"],
          defaultLanguage: "en",
  -       namespaces: ["landing-page", "common", "tools"],
  +       namespaces: ["landing-page", "common", "tools", "newsletter"],
          defaultNamespace: "landing-page",
      },
  };
  ```

  - Copy and add static site functions to the `newsletter.tsx` page.

  `pages` folder directory structure
  ```diff
    [lang]
  +  ┣ newsletter
  +  ┃ ┗ index.js
     ┣ tools
     ┃ ┗ cli.js
     ┗ index.js
  ```

  `newsletter.tsx`
  ```diff
  ...
  + import {
  +   getAllLanguageSlugs,
  +   getLanguage,
  +   useTranslation
  + } from "../../utils/i18n";

  export default function NewsletterIndexPage() {

  +  const { t } = useTranslation('newsletter');

    return (
      ...
    );
  }

  + export async function getStaticPaths() {
  +   const paths = getAllLanguageSlugs();
  +   return {
  +     paths,
  +    fallback: false,
  +  };
  + }
  + 
  + export async function getStaticProps({ params }) {
  +   const language = getLanguage(params.lang);
  +   return {
  +     props: {
  +      language,
  +    },
  +   };
  + }
  ```

  - Add custom route `LinkComponent` wherever the `next/link` is used for routing to the `/newsletter` href.

  `utils/i18n.ts`
  ```diff
  const i18nPaths = {
      en: [
          "/tools/cli"
  +       "/newsletter"
      ],
      de: [
          "/tools/cli"
  +       "/newsletter"
      ]
  };

  export default i18nPaths;
  ```

You are now done with adding the localization to the `newsletter` page.

> **Note**: Make sure to fix the Cypress tests after using the `useTranslation()` hook inside any component that Cypress is testing.

## Adding a new locale

AsyncAPI welcomes people from all over the world.

There exist a few locales like `en` (English) and `de` (German) which have available localizations present.

If you want to add a new locale like `fr` to serve pages in the French locale on the AsyncAPI website, follow these steps.

**1. Create new JSON Files**
  - Navigate to the `locales` folder.
  - Create a new folder with the name of the locale you want to introduce.
  - Create new `JSON` files with the same name as present in each of the other `locales` folders.
  - Copy the existing `JSON` files present in the `en` folder. Change the values of those translation keys according to the new localization.

**2. Modify i18n configuration**
  - Navigate to the `next-i18next.config.js` file in the root of the project folder.
  - Add the name of the newly added `locale` to the `languages` array.

**3. Configure i18n routing**
After adding a new internationalized page, ensure it is being served on the website when someone visits.
  - Make sure to add the same `href` to the `utils/i18n.ts` in the respective locales supporting that `href`.

If you have added the 'fr' locale and translated the 'tools/cli' page, clicking 'Tools -> CLI' in the navigation menu will redirect the user to 'asyncapi.com/fr/tools/cli'.

`locales` folder structure
```diff
  locales
   ┣ de
   ┃ ┣ common.json
   ┃ ┣ landing-page.json
   ┃ ┗ tools.json
   ┣ en
   ┃ ┣ common.json
   ┃ ┣ landing-page.json
   ┃ ┗ tools.json
+  ┗ fr
+  ┃ ┣ common.json
+  ┃ ┣ landing-page.json
+  ┃ ┗ tools.json
```

- Change the `next-i18next.config.js` config.

`next-i18next.config.js`
```diff
module.exports = {
    i18n: {
-       languages: ["en", "de"],
+       languages: ["en", "de", "fr"],
        defaultLanguage: "en",
        namespaces: ["landing-page", "common", "tools"],
        defaultNamespace: "landing-page",
    },
    langMap: {
    en: 'English',
    de: 'Deutsch',
+   fr: 'French',
  },
};
```
 - Add new locale routing.

`utils/i18n.ts`
```diff
const i18nPaths = {
    en: [
        "/tools/cli"
    ],
    de: [
        "/tools/cli"
    ],
+   fr: [
+       "/tools/cli"
+   ]
};

export default i18nPaths;
```

You are now done with adding a new locale. Congrats 🚀

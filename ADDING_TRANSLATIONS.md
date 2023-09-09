# Adding Translations to AsyncAPI Website

We love your contributions to the AsyncAPI website by adding or improving the existing translations.

## Table of contents:
- [Improving existing translations](https://github.com/anshgoyalevil/website/blob/i18n-docs/ADDING_TRANSLATIONS.md#improving-existing-translations)
- [Adding translations to a partially localized page](https://github.com/anshgoyalevil/website/blob/i18n-docs/ADDING_TRANSLATIONS.md#adding-translations-to-a-partially-localized-page)
- [Adding translations to a new page](https://github.com/anshgoyalevil/website/blob/i18n-docs/ADDING_TRANSLATIONS.md#adding-translations-to-a-new-page)
- [Adding a new locale](https://github.com/anshgoyalevil/website/blob/i18n-docs/ADDING_TRANSLATIONS.md#adding-a-new-locale)

## Improving existing translations:

To improve/modify the existing translation for any page or component, navigate to the `locales` folder and modify the existing `JSON` files according to the language of your choice.

Here is an example file structure for the `locales` folder containing various sub-folders named according to the languages which further contains `JSON` files with the key-value structure for translations.
The `common.json` includes some common translation keys, like buttons, CTAs, etc. The rest of the JSON files include translation keys according to the page on the website, for example, `tools.json` contains translations for all the tools-related pages on the website.

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

For example, you want to modify the `Landing Page`'s heading for the German Language
- Navigate to the `locales` folder
- Since, each language has its own language codes, `de` is for the German Language
- Navigate to the `de` folder
- Open `landing-page.json`
- Change the `main.header` and `main.subHeader` key's value according to what you want.
- Create a pull request with the changes

## Adding translations to a partially localized page:

Some parts of any page might not contain a translation for the available language.

You may use the translation hook along with the key of the translation specified in the `locales` folder.

For example, suppose there is a button on the `Landing Page` that is still written in the `English` language even on the `German` locale.
- Navigate to the file where the said component is defined. You may use a code editor to search for that text in the codebase.
- Import the `useTranslation` hook from `lib/i18n`.
- Now extract the translation function from the hook `const { t } = useTranslation();`
- Use it to pass the key of the required translation value. Make sure to add the required key to the `locales` folder according to the scope of the page. In this example, we are adding translation for a button, since all translation keys related to buttons need to be specified in `common.json`.

Example:

`ICSFileButton.js`
```diff
...
+ import { useTranslation } from '../../lib/i18n';

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

Make sure to use the same name in all `locales/[lang]/[nameOfFile].json` files, and add a translation for all the locales present in the `locales` folder, in case you introduce a new translation.

**You might also need to fix the cypress tests after adding a new translation key**

## Adding translations to a new page:

The process for adding translations to a page that is not yet available in any existing locale is different from adding translations to a specific part of the page that is partially translated.

**Step 1: Create new JSON Files**
- Navigate to the `locales` folder
- Create new `JSON` files with the same name in each of the `locales` folder. You may not need to create new `JSON` files in case there already exists a file with the same scope as your page. For example, all pages under the `tools/*` use the translation keys defined in `locales/[lang]/tools.json`.
- Skip to `Step 3` in case you haven't created new `JSON` files.

**Step 2: Modify the i18n configuration**
- Navigate to the `next-i18next-static-site.config.js` file in the root of the project folder.
- Add the name of the newly added `JSON` file to the `namespaces` array.

**Step 3: Add the static site functions**
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
- You may now follow the [Adding Translations](https://github.com/anshgoyalevil/website/blob/i18n-docs/ADDING_TRANSLATIONS.md#adding-translations) guide to start translating the components

**Step 4: Configure i18n routing**
With the addition of a new internationalized page, you would need to make sure it is being served on the website when someone visits it.
- Replace the `next/link` component with the `LinkComponent` from `components/link.js` in the files where the page's `href` is being referenced.
- Make sure to add the exact same `href` to the `lib/i18nPaths.js` in the respective locales which support that `href`.

For example, if you want to translate the `pages/newsletter/index.js` page, so that if someone visits `asyncapi.com/de/newsletter`, it shows the page in the `German` locale.

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

- Copy and add static site functions to the `newsletter/index.js` page.

`pages` folder directory structure
```diff
  [lang]
+  ┣ newsletter
+  ┃ ┗ index.js
   ┣ tools
   ┃ ┗ cli.js
   ┗ index.js
```

`newsletter/index.js`
```diff
...
+ import {
+   getAllLanguageSlugs,
+   getLanguage,
+   useTranslation
+ } from "../../lib/i18n";

export default function NewsletterIndexPage() {

+  const { t } = useTranslation('landing-page');

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

- Add custom route `LinkComponent` wherever the `next/link` is used for routing to `/newsletter` href.

`lib/i18nPaths.js`
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

**Make sure to fix the Cypress tests after using the `useTranslation()` hook inside any component that is being tested by Cypress.**

## Adding a new locale:

AsyncAPI welcomes people from all over the world irrespective of their languages.
There exist a few locales like `en` (English) and `de` (German) which have available localizations present.

If you want to introduce a new locale like `fr` so that the AsyncAPI website can then serve pages in the French locale, you would need to follow a series of steps.

**Step 1: Create new JSON Files**
- Navigate to the `locales` folder
- Create a new folder with the name of the locale you want to introduce.
- Create new `JSON` files with the same name as present in each of the other `locales` folders.
- You may copy the existing `JSON` files present in the `en` folder. Change the values of those translation keys according to the new localization.

**Step 2: Modify i18n configuration**
- Navigate to the `next-i18next-static-site.config.js` file in the root of the project folder.
- Add the name of the newly added `locale` to the `languages` array.

**Step 3: Configure i18n routing**
With the addition of a new internationalized page, you would need to make sure it is being served on the website when someone visits it.
- Make sure to add the exact same `href` to the `lib/i18nPaths.js` in the respective locales which support that `href`.

For example, if you have added `fr` locale and have completed translating the `tools/cli` page so that if someone clicks Tools -> CLI from the navigation menu, it redirects the user to the `asyncapi.com/fr/tools/cli` href.

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

- Change `next-i18next-static-site.config.js` config.

`next-i18next-static-site.config.js`
```diff
module.exports = {
    i18n: {
-       languages: ["en", "de"],
+       languages: ["en", "de", "fr"],
        defaultLanguage: "en",
        namespaces: ["landing-page", "common", "tools"],
        defaultNamespace: "landing-page",
    },
};
```
 - Add new locale routing

`lib/i18nPaths.js`
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

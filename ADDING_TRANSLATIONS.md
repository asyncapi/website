# Adding Translations to AsyncAPI Website

We love your contributions to the AsyncAPI website by adding or improving the existing translations.

## Table of contents:


### Improving existing translations:

To improve/modify the existing translation for any page or component, navigate to the `locales` folder and modify the existing `json` files according to the language of your choice.

Here is an example file-structure for the `locales` folder containing various sub-folders named according to the languages which further contains `json` files with the key-value structure for translations.
The `common.json` includes some common translation keys, like buttons, CTAs, etc. The rest of the JSON files include translation keys according to the page on the website, for example, `tools.json` contains translations for all the tools related pages on the website.

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
- Navigate to `locales` folder
- Since, each language has its own language codes, `de` is for the German Language
- Navigate to `de` folder
- Open `landing-page.json`
- Change the `main.header` and `main.subHeader` key's value according to what you want.
- Create a pull request with the changes

### Adding translations:

Some parts of any page might not contain a translation for the available language.

You may use the translation hook along with the key of the translation specified in `locales` folder.

For example, suppose there is a button on the `Landing Page` that is still written in the `English` language even on `German` locale.
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

Make sure to use the exact same name in all `locales/[lang]/[nameOfFile].json` files, and add a translation for all the locales present in the `locales` folder, in case you introduce a new translation.

**You might also need to fix the cypress tests after adding a new translation key**

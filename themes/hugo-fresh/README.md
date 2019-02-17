# The Fresh theme for Hugo

**Fresh** is a theme for the [Hugo](https://gohugo.io) static site generator adapted from the gorgeous, [Bulma](https://bulma.io)-based theme of the same name from [CSS Ninja](https://cssninja.io/themes/fresh). You can find a live demo of the original theme [here](https://cssninjastudio.github.io) and a live demo of the Hugo theme [here](https://hugo-fresh.netlify.com/).

![Fresh theme logo](images/screenshot.png)

> This theme is for landing pages only. If you'd like to extend the theme to include other types of pages—blog posts, documentation pages, etc.—feel free to submit a pull request.

## Getting started

To create a new site using this theme:

```bash
# Create site and cd into it
hugo new site my-site && cd my-site

# Clone the Fresh theme
git clone https://github.com/lucperkins/hugo-fresh themes/hugo-fresh

# Remove the default config
rm config.toml

# Fetch the example config
curl -O https://raw.githubusercontent.com/lucperkins/hugo-fresh/master/exampleSite/config.yaml

# Run the site locally
hugo server

# Open the site in your browser
open http://localhost:1313
```

## Customizing your page

There's a wide variety of customizations that you can make to your Hugo Fresh landing page by modifying the `config.yaml` file that you downloaded. That file provides documentation for what the various config values represent.


## Troubleshooting

If you see `error: failed to transform resource: TOCSS: failed to transform "style.sass"` when attempting to run your `hugo server`, make sure you have the extended version of Hugo installed:

```bash
# On Ubuntu:
snap refresh hugo --channel=extended
```

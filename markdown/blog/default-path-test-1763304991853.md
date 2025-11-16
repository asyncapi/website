---
title: Default Path Test 1763304991853
date: 2025-11-16T8:26:31+05:30
type: Engineering
canonical: 
tags: ['test']
cover: /img/posts/may-2021-at-asyncapi/cover.webp
authors:
  - name: Lukasz Gornicki
    photo: /img/avatars/lpgornicki.webp
    link: https://twitter.com/derberq
    byline: AsyncAPI Maintainer and Community Guardian
excerpt: Test
---

Write your blog post content here, just remember to mention "AsyncAPI" :smile:.
If you need a refresher on Markdown, check out [this guide](https://tailwind-nextjs-starter-blog.vercel.app/blog/github-markdown-guide).

## Test sub-section 1

**Authors**

Before submitting your blog post, don't forget to change the `authors` array field to include yourself :smile:

## Test sub-section 2

**Images**

Please make sure to give credit to source of the image, for example:

> Cover image by <a href="https://pixabay.com/users/silviarita-3142410/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2634391">silviarita</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2634391">Pixabay</a>

Add a cover image, you can change it on the metadata field above called `cover`. In case you need some inspiration we recommend https://unsplash.com/.
All images should be stored in the `public/img/posts/` folder, below is an example of using an image in your post
with a caption (used as `alt` attribute):

<Figure
  src="/img/posts/2020-summary/linkedin-folowers.webp"
  caption="Figure 3: Followers growth in 2020"
/>

`<Figure src="/img/posts/2020-summary/linkedin-folowers.webp" caption="Figure 3: Followers growth in 2020" />`

Also, make sure to have the following:
  * **Compress the image as much as possible**, we recommend https://squoosh.app/
  * The output format needs to be `.webp`
  * Include a clear `alt` description for people that cannot see images

**Twitter**

To embed a tweet on your post you can use a `TwitterTweetEmbed` React component, like so:

<TwitterTweetEmbed
  tweetId='1384127726861258756'
  options={{
    cards: 'hidden',
    width: 500,
    align: 'center'
  }}
/>

**YouTube**

To embed a YouTube video use the `YouTube` React component, like so:

<YouTube id="yILtksZriqA" />

**Podcast**

To embed a Podcast audio use, like so:

<center>
  <iframe
    src="https://anchor.fm/asyncapi/embed/episodes/April-2021-at-AsyncAPI-Initiative-e111lo9"
    height="102px"
    width="400px"
    frameborder="0"
    scrolling="no"
  />
</center>
---
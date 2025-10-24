/*
 * Script based on https://github.com/timlrx/tailwind-nextjs-starter-blog/blob/master/scripts/compose.js
 */

import dedent from 'dedent';
import fs from 'fs';
import moment from 'moment';

import { logger } from './helpers/logger';

/**
 * Type definition for the answers from the compose prompt.
 */
export type ComposePromptType = {
  title: string;
  excerpt: string;
  tags: string;
  type: string;
  canonical: string;
};

/**
 * Generates a complete Markdown front matter block for a blog post.
 *
 * Constructs a YAML front matter section using the blog post details provided by the user,
 * including title, current date, type, canonical URL, and comma-separated tags. The front matter
 * also embeds fixed cover image and author metadata along with a Markdown template containing guidelines
 * for composing the blog content.
 *
 * @param answers - User inputs for the blog post, including title, excerpt, comma-separated tags, type, and
 *                  canonical URL.
 * @returns The generated Markdown front matter and blog post content template.
 */
function genFrontMatter(answers: ComposePromptType): string {
  const tagArray = answers.tags.split(',');

  tagArray.forEach((tag: string, index: number) => {
    tagArray[index] = tag.trim();
  });
  const tags = `'${tagArray.join("','")}'`;

  let frontMatter = dedent`---
  title: ${answers.title ? answers.title : 'Untitled'}
  date: ${moment().format('YYYY-MM-DDTh:mm:ssZ')}
  type: ${answers.type}
  canonical: ${answers.canonical ? answers.canonical : ''}
  tags: [${answers.tags ? tags : ''}]
  cover: /img/posts/may-2021-at-asyncapi/cover.webp
  authors:
    - name: Lukasz Gornicki
      photo: /img/avatars/lpgornicki.webp
      link: https://twitter.com/derberq
      byline: AsyncAPI Maintainer and Community Guardian
  excerpt: ${answers.excerpt ? answers.excerpt : ' '}
  ---

  Write your blog post content here, just remember to mention "AsyncAPI" :smile:.
  If you need a refresher on Markdown, check out [this guide](https://tailwind-nextjs-starter-blog.vercel.app/blog/github-markdown-guide).

  ## Test sub-section 1

  **Authors**

  Before submitting your blog post, don't forget to change the \`authors\` array field to include yourself :smile:

  ## Test sub-section 2

  **Images**

  Please make sure to give credit to source of the image, for example:

  > Cover image by <a href="https://pixabay.com/users/silviarita-3142410/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2634391">silviarita</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2634391">Pixabay</a>

  Add a cover image, you can change it on the metadata field above called \`cover\`. In case you need some inspiration we recommend https://unsplash.com/.
  All images should be stored in the \`public/img/posts/\` folder, below is an example of using an image in your post
  with a caption (used as \`alt\` attribute):

  <Figure
    src="/img/posts/2020-summary/linkedin-folowers.webp"
    caption="Figure 3: Followers growth in 2020"
  />

  \`<Figure src="/img/posts/2020-summary/linkedin-folowers.webp" caption="Figure 3: Followers growth in 2020" />\`

  Also, make sure to have the following:
    * **Compress the image as much as possible**, we recommend https://squoosh.app/
    * The output format needs to be \`.webp\`
    * Include a clear \`alt\` description for people that cannot see images

  **Twitter**

  To embed a tweet on your post you can use a \`TwitterTweetEmbed\` React component, like so:

  <TwitterTweetEmbed
    tweetId='1384127726861258756'
    options={{
      cards: 'hidden',
      width: 500,
      align: 'center'
    }}
  />

  **YouTube**

  To embed a YouTube video use the \`YouTube\` React component, like so:

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

  `;

  frontMatter += '\n---';

  return frontMatter;
}

/**
 * Programmatically creates a blog post markdown file with front matter and template content.
 *
 * @param answers - Blog post details (title, excerpt, tags, type, canonical)
 * @param outputPath - Optional custom output path for the blog post file
 * @returns Promise that resolves to the file path if successful
 */
export async function ComposeBlog(answers: ComposePromptType, outputPath?: string): Promise<string> {
  // Remove special characters and replace space with -
  const fileName = answers.title
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .replace(/ /g, '-')
    .replace(/-+/g, '-');
  const frontMatter = genFrontMatter(answers);
  const filePath = outputPath || `markdown/blog/${fileName || 'untitled'}.md`;

  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, frontMatter, { flag: 'wx' }, (err) => {
      if (err) {
        logger.error('Failed to create blog post file', {
          error: err,
          filePath
        });
        reject(err);
      } else {
        logger.info(`Blog post generated successfully at ${filePath}`);
        resolve(filePath);
      }
    });
  });
}

/*
 * Script based on https://github.com/timlrx/tailwind-nextjs-starter-blog/blob/master/scripts/compose.js
 */

const fs = require('fs')
const inquirer = require('inquirer')
const dedent = require('dedent')

const genFrontMatter = (answers) => {
  let d = new Date()
  const date = [
    d.getFullYear(),
    ('0' + (d.getMonth() + 1)).slice(-2),
    ('0' + d.getDate()).slice(-2),
  ].join('-')
  const tagArray = answers.tags.split(',')
  tagArray.forEach((tag, index) => (tagArray[index] = tag.trim()))
  const tags = "'" + tagArray.join("','") + "'"

  let frontMatter = dedent`---
  title: ${answers.title ? answers.title : 'Untitled'}
  date: '${date}'
  type: ${answers.type}
  tags: [${answers.tags ? tags : ''}]
  cover: /img/posts/may-2021-at-asyncapi/cover.webp
  draft: ${answers.draft === 'yes' ? true : false}
  authors:
    - name: Lukasz Gornicki
      photo: /img/avatars/lpgornicki.webp
      link: https://twitter.com/derberq
      byline: AsyncAPI Maintainer and Community Guardian
  excerpt: ${answers.excerpt ? answers.excerpt : ' '}
  ---

  Write your blog post content here, just remember to mention "AsyncAPI" :smile:

  **Authors**

  Before submitting your blog post, don't forget to change the \`authors\` array field to include yourself :smile:

  **Images**

  Please make sure to give credit to source of the image, for example:

  > Cover image by <a href="https://pixabay.com/users/silviarita-3142410/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2634391">silviarita</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2634391">Pixabay</a>

  Add a cover image, you can change it on the metadata field above called \`cover\`. In case you need some inspiration we recommend https://unsplash.com/.
  All images should be stored in the \`public/img/posts/\` folder, below is an example of using an image in your post:

  ![Figure 3: APIs give developer teams more independence](/img/posts/openapi-vs-asyncapi-burning-questions/asyncapi-openapi-post_pic-03.webp)

  \`![Figure 3: APIs give developer teams more independence](/img/posts/openapi-vs-asyncapi-burning-questions/asyncapi-openapi-post_pic-03.webp)\`

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

  `

  frontMatter = frontMatter + '\n---'

  return frontMatter
}

inquirer
  .prompt([
    {
      name: 'title',
      message: 'Enter post title:',
      type: 'input',
    },
    {
      name: 'excerpt',
      message: 'Enter post excerpt:',
      type: 'input',
    },
    {
      name: 'draft',
      message: 'Set post as draft?',
      type: 'list',
      choices: ['yes', 'no'],
    },
    {
      name: 'tags',
      message: 'Any Tags? Separate them with , or leave empty if no tags.',
      type: 'input',
    },
    {
      name: 'type',
      message: 'Enter the post type:',
      type: 'list',
      choices: ['Communication', 'Community', 'Engineering', 'Marketing', 'Strategy', 'Video'],
    },
  ])
  .then((answers) => {
    // Remove special characters and replace space with -
    const fileName = answers.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .replace(/ /g, '-')
      .replace(/-+/g, '-')
    const frontMatter = genFrontMatter(answers)
    const filePath = `pages/blog/${fileName ? fileName : 'untitled'}.md`
    fs.writeFile(filePath, frontMatter, { flag: 'wx' }, (err) => {
      if (err) {
        throw err
      } else {
        console.log(`Blog post generated successfully at ${filePath}`)
      }
    })
  })
  .catch((error) => {
    console.error(error)
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment")
    } else {
      console.log('Something went wrong, sorry!')
    }
  })

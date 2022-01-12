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

  **Authors**

  Before submitting your blog post, don't forget to change the \`authors\` array field to include yourself :smile:

  **Images**

  You can change the cover image on the metadata field above called \`cover\`.
  All images should be stored in the \`public/img/posts/\` folder, below is an example of using an image in your post:

  ![Figure 3: APIs give developer teams more independence](/img/posts/openapi-vs-asyncapi-burning-questions/asyncapi-openapi-post_pic-03.webp)

  \`![Figure 3: APIs give developer teams more independence](/img/posts/openapi-vs-asyncapi-burning-questions/asyncapi-openapi-post_pic-03.webp)\`

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
      name: 'extension',
      message: 'Choose post extension:',
      type: 'list',
      choices: ['md'],
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
    const filePath = `pages/blog/${fileName ? fileName : 'untitled'}.${
      answers.extension ? answers.extension : 'md'
    }`
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

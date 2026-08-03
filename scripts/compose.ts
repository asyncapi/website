/*
 * Script based on https://github.com/timlrx/tailwind-nextjs-starter-blog/blob/master/scripts/compose.js
 */

import fs from 'fs';
import inquirer from 'inquirer';

import { logger } from './helpers/logger';
import { genFrontMatter, type ComposePromptType } from './helpers/composeFrontMatter';

inquirer
  .prompt([
    {
      name: 'title',
      message: 'Enter post title:',
      type: 'input'
    },
    {
      name: 'excerpt',
      message: 'Enter post excerpt:',
      type: 'input'
    },
    {
      name: 'tags',
      message: 'Any Tags? Separate them with , or leave empty if no tags.',
      type: 'input'
    },
    {
      name: 'type',
      message: 'Enter the post type:',
      type: 'list',
      choices: ['Communication', 'Community', 'Engineering', 'Marketing', 'Strategy', 'Video']
    },
    {
      name: 'canonical',
      message: 'Enter the canonical URL if any:',
      type: 'input'
    }
  ])
  .then((answers: ComposePromptType) => {
    // Remove special characters and replace space with -
    const fileName = answers.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .replace(/ /g, '-')
      .replace(/-+/g, '-');
    const frontMatter = genFrontMatter(answers);
    const filePath = `pages/blog/${fileName || 'untitled'}.md`;

    fs.writeFile(filePath, frontMatter, { flag: 'wx' }, (err) => {
      if (err) {
        throw err;
      } else {
        logger.info(`Blog post generated successfully at ${filePath}`);
      }
    });
  })
  .catch((error) => {
    logger.error(error);
    if (error.isTtyError) {
      logger.error("Prompt couldn't be rendered in the current environment");
    } else {
      logger.error('Something went wrong, sorry!');
    }
  });

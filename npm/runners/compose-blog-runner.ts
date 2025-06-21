import inquirer from 'inquirer';
import { ComposeBlog, ComposePromptType } from '../scripts/compose';
import { logger } from '../../scripts/helpers/logger';

export async function runComposeBlog(): Promise<string> {
  const answers: ComposePromptType = await inquirer.prompt([
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
  ]);

  try {
    return await ComposeBlog(answers);
  } catch (error: any) {
    logger.error(error);
    if (error.isTtyError) {
      logger.error("Prompt couldn't be rendered in the current environment");
    } else {
      logger.error('Something went wrong, sorry!');
    }
    throw error;
  }
}

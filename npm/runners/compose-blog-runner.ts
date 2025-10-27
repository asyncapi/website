/* eslint-disable no-console */
import readline from 'readline';
import { fileURLToPath } from 'url';

import { logger } from '@/scripts/helpers/logger';
import { CustomError } from '@/types/errors/CustomError';

import { ComposeBlog, type ComposePromptType } from '../../scripts/compose';

interface ComposeBlogOptions {
  answers: ComposePromptType;
  outputPath?: string;
}

/**
 * Runs the blog composition process with user-provided blog post details.
 *
 * This function takes blog post answers from the user and creates a new blog post file
 * using the ComposeBlog function. It handles errors, logging them with context
 * and letting the top-level .catch handle process exit.
 *
 * @param options - Configuration containing blog post answers and optional output path
 * @throws {CustomError} If the blog composition process fails
 */
async function runComposeBlog(options: ComposeBlogOptions): Promise<string> {
  try {
    const { answers, outputPath } = options;

    // Validate required answers
    if (!answers.title) {
      throw new Error('Blog title is required');
    }

    const filePath = await ComposeBlog(answers, outputPath);

    logger.info('Blog composition completed successfully', {
      title: answers.title,
      filePath,
      outputPath: outputPath || 'default location'
    });

    return filePath;
  } catch (error) {
    const customError = CustomError.fromError(error, {
      category: 'script',
      operation: 'runComposeBlog',
      detail: `Compose blog failed - title: ${options.answers?.title}, outputPath: ${options.outputPath}`
    });

    logger.error('Compose blog runner failed', customError);

    throw customError;
  }
}

/**
 * Prompts user for input using readline interface
 */
function promptUser(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

/**
 * Interactive function to collect blog post details from user
 */
async function collectBlogDetails(): Promise<ComposePromptType> {
  console.log('\n🚀 AsyncAPI Blog Post Generator\n');
  console.log('Please provide the following information for your blog post:\n');

  const title = await promptUser('📝 Blog post title: ');
  const excerpt = await promptUser('📄 Brief excerpt/description: ');
  const tags = await promptUser('🏷️  Tags (comma-separated): ');
  const type = await promptUser('📂 Post type (e.g., Engineering, Community, Tutorial): ');
  const canonical = await promptUser('🔗 Canonical URL (optional, press Enter to skip): ');

  return {
    title,
    excerpt,
    tags,
    type,
    canonical
  };
}

/**
 * Main interactive function to create a blog post
 */
async function interactiveBlogCreation() {
  try {
    const answers = await collectBlogDetails();

    // Validate required fields
    if (!answers.title) {
      logger.error('Blog title is required. Exiting...');
      process.exit(1);
    }

    console.log('\n⏳ Creating blog post...\n');

    const filePath = await runComposeBlog({ answers });

    console.log(`\n✅ Blog post created successfully!. Find your blog file here - ${filePath}`);
  } catch (error) {
    logger.error('Failed to create blog post', { error });
    process.exit(1);
  }
}

// Run only in non-test environments and when called directly
if (process.env.NODE_ENV !== 'test' && process.argv[1] === fileURLToPath(import.meta.url)) {
  interactiveBlogCreation();
}

// Export for testing purposes
export { runComposeBlog };

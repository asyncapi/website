import fs from 'fs';

/**
 * Shape of the answers returned by the compose prompt.
 * Mirrors the (non-exported) `ComposePromptType` in `scripts/compose.ts`.
 */
type ComposeAnswers = {
  title: string;
  excerpt: string;
  tags: string;
  type: string;
  canonical: string;
};

type WriteFileCallback = (err: Error | null) => void;

const FIXED_DATE = '2024-01-15T3:30:00+05:30';
const DATE_FORMAT = 'YYYY-MM-DDTh:mm:ssZ';

// `scripts/compose.ts` runs `inquirer.prompt()` at module load time, so every dependency with
// side effects is mocked up-front and the script is (re-)imported inside each test.
const mockPrompt = jest.fn();
const mockFormat = jest.fn(() => FIXED_DATE);
const mockDayjs = jest.fn(() => ({ format: mockFormat }));
const mockLogger = { info: jest.fn(), error: jest.fn() };

jest.mock('inquirer', () => ({
  __esModule: true,
  default: { prompt: mockPrompt }
}));

jest.mock('dayjs', () => ({
  __esModule: true,
  default: mockDayjs
}));

jest.mock('../scripts/helpers/logger', () => ({
  logger: mockLogger
}));

const baseAnswers: ComposeAnswers = {
  title: 'My First Post',
  excerpt: 'A short excerpt',
  tags: 'asyncapi, community',
  type: 'Engineering',
  canonical: 'https://example.com/post'
};

/**
 * Imports `scripts/compose.ts` in a fresh module registry (which triggers the prompt) and waits
 * until its promise chain has settled.
 */
async function runCompose(): Promise<void> {
  await jest.isolateModulesAsync(async () => {
    await import('../scripts/compose');
  });

  await new Promise((resolve) => {
    setImmediate(resolve);
  });
}

describe('scripts/compose', () => {
  let writeFileSpy: jest.SpyInstance;

  /**
   * Returns the arguments of the single `fs.writeFile` call made by the script.
   */
  function getWriteFileCall(): [string, string, fs.WriteFileOptions, WriteFileCallback] {
    expect(writeFileSpy).toHaveBeenCalledTimes(1);

    return writeFileSpy.mock.calls[0] as [string, string, fs.WriteFileOptions, WriteFileCallback];
  }

  beforeEach(() => {
    jest.clearAllMocks();
    mockPrompt.mockResolvedValue(baseAnswers);
    // The callback is never invoked automatically: tests call it explicitly to simulate the result of the write.
    writeFileSpy = jest.spyOn(fs, 'writeFile').mockImplementation(() => undefined);
  });

  afterEach(() => {
    writeFileSpy.mockRestore();
  });

  describe('interactive prompt', () => {
    it('asks for title, excerpt, tags, type and canonical URL in that order', async () => {
      await runCompose();

      expect(mockPrompt).toHaveBeenCalledTimes(1);

      const questions = mockPrompt.mock.calls[0][0];

      expect(questions.map((question: { name: string }) => question.name)).toEqual([
        'title',
        'excerpt',
        'tags',
        'type',
        'canonical'
      ]);
      expect(questions.map((question: { type: string }) => question.type)).toEqual([
        'input',
        'input',
        'input',
        'list',
        'input'
      ]);
    });

    it('offers the fixed list of post types', async () => {
      await runCompose();

      const typeQuestion = mockPrompt.mock.calls[0][0].find((question: { name: string }) => question.name === 'type');

      expect(typeQuestion.choices).toEqual([
        'Communication',
        'Community',
        'Engineering',
        'Marketing',
        'Strategy',
        'Video'
      ]);
    });
  });

  describe('file generation', () => {
    it('writes the post to pages/blog/<slug>.md without overwriting an existing file', async () => {
      await runCompose();

      const [filePath, content, options, callback] = getWriteFileCall();

      expect(filePath).toBe('pages/blog/my-first-post.md');
      expect(typeof content).toBe('string');
      expect(options).toEqual({ flag: 'wx' });
      expect(typeof callback).toBe('function');
    });

    it('generates the front matter from the answers', async () => {
      await runCompose();

      const [, content] = getWriteFileCall();
      const expectedFrontMatter = [
        '---',
        'title: My First Post',
        `date: ${FIXED_DATE}`,
        'type: Engineering',
        'canonical: https://example.com/post',
        "tags: ['asyncapi','community']",
        'cover: /img/posts/may-2021-at-asyncapi/cover.webp',
        'authors:',
        '  - name: Lukasz Gornicki',
        '    photo: /img/avatars/lpgornicki.webp',
        '    link: https://twitter.com/derberq',
        '    byline: AsyncAPI Maintainer and Community Guardian',
        'excerpt: A short excerpt',
        '---',
        ''
      ].join('\n');

      expect(content.startsWith(expectedFrontMatter)).toBe(true);
    });

    it('formats the date with dayjs using the expected pattern', async () => {
      await runCompose();

      expect(mockDayjs).toHaveBeenCalledTimes(1);
      expect(mockFormat).toHaveBeenCalledWith(DATE_FORMAT);
    });

    it('appends the writing guidelines template and closes it with a separator', async () => {
      await runCompose();

      const [, content] = getWriteFileCall();

      expect(content).toContain('Write your blog post content here, just remember to mention "AsyncAPI" :smile:.');
      expect(content).toContain('<Figure\n  src="/img/posts/2020-summary/linkedin-folowers.webp"');
      expect(content).toContain('<YouTube id="yILtksZriqA" />');
      expect(content.endsWith('</iframe></center>\n---')).toBe(true);
    });

    it('trims whitespace around comma-separated tags', async () => {
      mockPrompt.mockResolvedValue({ ...baseAnswers, tags: ' asyncapi ,community,  spec ' });

      await runCompose();

      const [, content] = getWriteFileCall();

      expect(content).toContain("tags: ['asyncapi','community','spec']");
    });

    it('produces an empty tags array when no tags are given', async () => {
      mockPrompt.mockResolvedValue({ ...baseAnswers, tags: '' });

      await runCompose();

      const [, content] = getWriteFileCall();

      expect(content).toContain('tags: []');
    });

    it('falls back to "Untitled" and untitled.md when the title is empty', async () => {
      mockPrompt.mockResolvedValue({ ...baseAnswers, title: '' });

      await runCompose();

      const [filePath, content] = getWriteFileCall();

      expect(filePath).toBe('pages/blog/untitled.md');
      expect(content).toContain('\ntitle: Untitled\n');
    });

    it('leaves canonical empty and uses a blank excerpt when they are not provided', async () => {
      mockPrompt.mockResolvedValue({ ...baseAnswers, canonical: '', excerpt: '' });

      await runCompose();

      const [, content] = getWriteFileCall();

      expect(content).toMatch(/^canonical:\s*$/m);
      expect(content).toMatch(/^excerpt:\s*$/m);
    });

    it('logs the generated path once the file has been written', async () => {
      await runCompose();

      const [, , , callback] = getWriteFileCall();

      callback(null);

      expect(mockLogger.info).toHaveBeenCalledWith('Blog post generated successfully at pages/blog/my-first-post.md');
      expect(mockLogger.error).not.toHaveBeenCalled();
    });

    it('rethrows the error reported by fs.writeFile (e.g. the file already exists)', async () => {
      await runCompose();

      const [, , , callback] = getWriteFileCall();
      const writeError = Object.assign(new Error('EEXIST: file already exists'), { code: 'EEXIST' });

      expect(() => callback(writeError)).toThrow(writeError);
      expect(mockLogger.info).not.toHaveBeenCalled();
    });
  });

  describe('slug generation', () => {
    it.each([
      ['Hello World', 'hello-world'],
      ['UPPER Case Title', 'upper-case-title'],
      ['AsyncAPI 3.0 Released!', 'asyncapi-30-released'],
      ['Kafka & MQTT: what/why?', 'kafka-mqtt-whatwhy'],
      ['Hello,   World', 'hello-world'],
      ['café au lait', 'caf-au-lait']
    ])('turns the title %p into %p', async (title, slug) => {
      mockPrompt.mockResolvedValue({ ...baseAnswers, title });

      await runCompose();

      const [filePath] = getWriteFileCall();

      expect(filePath).toBe(`pages/blog/${slug}.md`);
    });

    it('uses untitled.md when the title only contains special characters', async () => {
      mockPrompt.mockResolvedValue({ ...baseAnswers, title: '!!!' });

      await runCompose();

      const [filePath, content] = getWriteFileCall();

      expect(filePath).toBe('pages/blog/untitled.md');
      expect(content).toContain('\ntitle: !!!\n');
    });
  });

  describe('error handling', () => {
    it('explains when the prompt cannot be rendered in the current environment', async () => {
      const ttyError = Object.assign(new Error('not a tty'), { isTtyError: true });

      mockPrompt.mockRejectedValue(ttyError);

      await runCompose();

      expect(mockLogger.error.mock.calls).toEqual([
        [ttyError],
        ["Prompt couldn't be rendered in the current environment"]
      ]);
      expect(writeFileSpy).not.toHaveBeenCalled();
    });

    it('logs a generic message for any other prompt failure', async () => {
      const promptError = new Error('prompt failed');

      mockPrompt.mockRejectedValue(promptError);

      await runCompose();

      expect(mockLogger.error.mock.calls).toEqual([[promptError], ['Something went wrong, sorry!']]);
      expect(writeFileSpy).not.toHaveBeenCalled();
    });
  });
});

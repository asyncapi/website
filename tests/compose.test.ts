import { logger } from '../scripts/helpers/logger';

jest.mock('inquirer', () => ({
  prompt: jest.fn()
}));

jest.mock('fs', () => ({
  writeFile: jest.fn()
}));

jest.mock('dayjs', () => {
  const dayjsMock = jest.fn(() => ({
    format: jest.fn(() => '2021-05-01T10:00:00+02:00')
  }));
  return dayjsMock;
});

jest.mock('../scripts/helpers/logger', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn()
  }
}));

const flushPromises = () => new Promise((resolve) => setImmediate(resolve));

describe('compose script', () => {
  const defaultAnswers = {
    title: 'My First Blog Post!',
    excerpt: 'A test excerpt for the blog post.',
    tags: 'asyncapi, tutorial',
    type: 'Engineering',
    canonical: 'https://example.com'
  };

  let promptMock: jest.Mock;
  let writeFileMock: jest.Mock;
  let loggerInfoMock: jest.Mock;
  let loggerErrorMock: jest.Mock;

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    promptMock = require('inquirer').prompt;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    writeFileMock = require('fs').writeFile;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    loggerInfoMock = require('../scripts/helpers/logger').logger.info;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    loggerErrorMock = require('../scripts/helpers/logger').logger.error;
  });

  it('generates the blog post file with front matter for the happy path', async () => {
    promptMock.mockResolvedValue(defaultAnswers);
    writeFileMock.mockImplementation((_filePath, _content, _options, callback) => callback(null));

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('../scripts/compose');
    await flushPromises();

    expect(writeFileMock).toHaveBeenCalledTimes(1);
    const [filePath, content, options] = writeFileMock.mock.calls[0];

    expect(filePath).toBe('pages/blog/my-first-blog-post.md');
    expect(options).toEqual({ flag: 'wx' });
    expect(content).toContain('title: My First Blog Post!');
    expect(content).toContain("tags: ['asyncapi','tutorial']");
    expect(content).toContain('date: 2021-05-01T10:00:00+02:00');
    expect(content).toContain('canonical: https://example.com');
    expect(loggerInfoMock).toHaveBeenCalledWith('Blog post generated successfully at pages/blog/my-first-blog-post.md');
  });

  it.each([
    ['Hello   World??', 'pages/blog/hello-world.md'],
    ['My-Second_Post (v2)', 'pages/blog/mysecondpost-v2.md'],
    ['', 'pages/blog/untitled.md'],
    ['!!!', 'pages/blog/untitled.md']
  ])('slugifies the title "%s" into the file path "%s"', async (title, expectedPath) => {
    promptMock.mockResolvedValue({ ...defaultAnswers, title });
    writeFileMock.mockImplementation((_filePath, _content, _options, callback) => callback(null));

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('../scripts/compose');
    await flushPromises();

    expect(writeFileMock).toHaveBeenCalledTimes(1);
    expect(writeFileMock.mock.calls[0][0]).toBe(expectedPath);
  });

  it('logs an error when the file cannot be written', async () => {
    promptMock.mockResolvedValue(defaultAnswers);
    writeFileMock.mockImplementation((_filePath, _content, _options, callback) => callback(new Error('EEXIST')));

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('../scripts/compose');
    await flushPromises();

    expect(loggerErrorMock).toHaveBeenCalled();
    const errorArg = loggerErrorMock.mock.calls.find((call) => call[0] instanceof Error)?.[0] as Error;
    expect(errorArg.message).toBe('EEXIST');
  });
});

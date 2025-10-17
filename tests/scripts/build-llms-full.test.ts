describe('buildLlmsFull', () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('should write llms-full.txt with links', async () => {
    // Mock fs/promises.writeFile and posts.json before requiring module
    jest.doMock('fs/promises', () => ({
      writeFile: jest.fn().mockResolvedValue(undefined)
    }));

    jest.doMock(
      '../../../../config/posts.json',
      () => ({
        default: {
          docs: [{ slug: '/docs/getting-started', title: 'Getting Started' }],
          blog: [{ slug: '/blog/1', title: 'First Post', date: '2024-01-01' }]
        }
      }),
      { virtual: true }
    );

    const mod = await import('../../scripts/build-llms-full');
    const buildLlmsFull = (mod as any).buildLlmsFull ?? (mod as any).default;

    const fsPromises = await import('fs/promises');

    await expect(buildLlmsFull()).resolves.toBeUndefined();

    const writeMock = (fsPromises as any).writeFile as jest.Mock;

    expect(writeMock).toHaveBeenCalledTimes(1);
    expect(writeMock.mock.calls[0][0]).toBe('./public/llms-full.txt');
    const content = writeMock.mock.calls[0][1] as string;

    expect(content).toContain('Core Specifications');
  });
});

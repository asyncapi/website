describe('buildLlmsTxt', () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

    it('should write llms.txt to public directory', async () => {
      // Mock fs/promises.writeFile before importing the module
      jest.doMock('fs/promises', () => ({
        writeFile: jest.fn().mockResolvedValue(undefined),
      }));

      const mod = await import('../../scripts/build-llms');
      const buildLlmsTxt = (mod as any).buildLlmsTxt ?? (mod as any).default;

      const fsPromises = await import('fs/promises');

      await expect(buildLlmsTxt()).resolves.toBeUndefined();

      const writeMock = (fsPromises as any).writeFile as jest.Mock;

      expect(writeMock).toHaveBeenCalledTimes(1);
      expect(writeMock.mock.calls[0][0]).toBe('./public/llms.txt');
      expect(typeof writeMock.mock.calls[0][1]).toBe('string');
  });
});
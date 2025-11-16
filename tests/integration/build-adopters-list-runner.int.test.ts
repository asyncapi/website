import { promises as fs } from 'fs';
import os from 'os';
import path, { resolve } from 'path';

import { runBuildAdoptersList } from '../../npm/runners/build-adopters-list-runner';
import { CustomError } from '../../types/errors/CustomError';

describe('Integration: build-adopters-list-runner', () => {
  let tempDir: string;
  let output: any[];
  let outputPath: string;

  beforeAll(async () => {
    // Create a unique temp directory for this test run
    tempDir = resolve(os.tmpdir(), `build-adopters-list-test-${Date.now()}`);
    await fs.mkdir(tempDir, { recursive: true });

    // Use the real source file and temp directory for output
    const sourcePath = path.join(process.cwd(), 'config', 'adopters.yml');

    outputPath = path.join(tempDir, 'adopters.json');

    // Run the runner with custom paths
    await runBuildAdoptersList({
      sourcePath,
      targetPath: outputPath
    });

    // Read the generated output from temp directory
    const content = await fs.readFile(outputPath, 'utf-8');

    output = JSON.parse(content);
  });

  afterAll(async () => {
    // Clean up temp files and directory
    await fs.rm(tempDir, { recursive: true, force: true });
  });

  it('writes the file successfully', async () => {
    const fileExists = await fs
      .access(outputPath)
      .then(() => true)
      .catch(() => false);

    expect(fileExists).toBe(true);
  });

  it('output JSON is not empty', () => {
    expect(output.length).toBeGreaterThan(0);
  });

  it('output is an array', () => {
    expect(Array.isArray(output)).toBe(true);
  });

  it('each adopter has required fields', () => {
    output.forEach((adopter: any) => {
      expect(adopter).toHaveProperty('companyName');
      expect(adopter).toHaveProperty('useCase');
      expect(adopter).toHaveProperty('resources');
    });
  });

  it('companyName is a non-empty string', () => {
    output.forEach((adopter: any) => {
      expect(typeof adopter.companyName).toBe('string');
      expect(adopter.companyName.length).toBeGreaterThan(0);
    });
  });

  it('useCase is a non-empty string', () => {
    output.forEach((adopter: any) => {
      expect(typeof adopter.useCase).toBe('string');
      expect(adopter.useCase.length).toBeGreaterThan(0);
    });
  });

  it('resources is an array', () => {
    output.forEach((adopter: any) => {
      expect(Array.isArray(adopter.resources)).toBe(true);
    });
  });

  it('each resource has required fields', () => {
    output.forEach((adopter: any) => {
      adopter.resources.forEach((resource: any) => {
        expect(resource).toHaveProperty('title');
        expect(resource).toHaveProperty('link');
      });
    });
  });

  it('resource titles are non-empty strings', () => {
    output.forEach((adopter: any) => {
      adopter.resources.forEach((resource: any) => {
        expect(typeof resource.title).toBe('string');
        expect(resource.title.length).toBeGreaterThan(0);
      });
    });
  });

  it('resource links are valid URLs', () => {
    output.forEach((adopter: any) => {
      adopter.resources.forEach((resource: any) => {
        expect(typeof resource.link).toBe('string');
        expect(resource.link.length).toBeGreaterThan(0);
        // Check if it starts with http:// or https://
        expect(resource.link).toMatch(/^https?:\/\//);
      });
    });
  });

  it('no adopter is missing data', () => {
    output.forEach((adopter: any) => {
      expect(adopter).not.toBeNull();
      expect(adopter).not.toBeUndefined();
      expect(adopter.companyName).not.toBeNull();
      expect(adopter.useCase).not.toBeNull();
      expect(adopter.resources).not.toBeNull();
    });
  });

  it('resources are not empty arrays', () => {
    output.forEach((adopter: any) => {
      expect(adopter.resources.length).toBeGreaterThan(0);
    });
  });

  it('output file is valid JSON', async () => {
    const fileContent = await fs.readFile(outputPath, 'utf-8');

    expect(() => JSON.parse(fileContent)).not.toThrow();
    expect(fileContent.length).toBeGreaterThan(2);
  });

  it('should handle the runner function being exported', async () => {
    expect(typeof runBuildAdoptersList).toBe('function');
    // Verify it's a Promise-returning function
    const promise = runBuildAdoptersList({
      sourcePath: path.join(tempDir, 'mock-source.yml'),
      targetPath: path.join(tempDir, 'mock-output.json')
    });

    expect(promise).toBeInstanceOf(Promise);
    // Await the promise to handle any potential rejections
    await expect(promise).rejects.toThrow();
  });

  describe('Data Quality', () => {
    it('each adopter has unique combination of company name and use case', () => {
      const combinations = new Set<string>();

      output.forEach((adopter: any) => {
        const key = `${adopter.companyName}|${adopter.useCase}`;

        expect(combinations.has(key)).toBe(false);
        combinations.add(key);
      });
    });

    it('resources within each adopter have unique links', () => {
      output.forEach((adopter: any) => {
        const links = new Set<string>();

        adopter.resources.forEach((resource: any) => {
          expect(links.has(resource.link)).toBe(false);
          links.add(resource.link);
        });
      });
    });
  });

  describe('Error Handling', () => {
    it('should wrap errors in CustomError with proper context', async () => {
      const invalidSourcePath = path.join(tempDir, 'non-existent.yml');
      const testOutputPath = path.join(tempDir, 'test-output.json');

      await expect(
        runBuildAdoptersList({
          sourcePath: invalidSourcePath,
          targetPath: testOutputPath
        })
      ).rejects.toThrow(CustomError);

      // Verify the error has proper context by catching it
      try {
        await runBuildAdoptersList({
          sourcePath: invalidSourcePath,
          targetPath: testOutputPath
        });
        // Should not reach here
        expect(true).toBe(false);
      } catch (error) {
        expect(error).toBeInstanceOf(CustomError);
        const customError = error as CustomError;

        expect(customError.context.category).toBe('script');
        expect(customError.context.operation).toBe('runBuildAdoptersList');
        expect(customError.context.detail).toBeDefined();
        expect(customError.context.detail).toContain('sourcePath:');
        expect(customError.context.detail).toContain('targetPath:');
      }
    });

    it('should throw error when source file is missing', async () => {
      const invalidSourcePath = path.join(tempDir, 'non-existent.yml');
      const testOutputPath = path.join(tempDir, 'test-output.json');

      await expect(
        runBuildAdoptersList({
          sourcePath: invalidSourcePath,
          targetPath: testOutputPath
        })
      ).rejects.toThrow(CustomError);
    });
  });

  describe('Edge Cases', () => {
    it('output file has reasonable file size', async () => {
      const stats = await fs.stat(outputPath);

      // File should exist and have content
      expect(stats.size).toBeGreaterThan(0);
      // But not be unreasonably large (e.g., > 10MB)
      expect(stats.size).toBeLessThan(10 * 1024 * 1024);
    });
  });
});

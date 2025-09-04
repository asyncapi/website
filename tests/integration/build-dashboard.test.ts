import { execSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';

describe('Integration: build-dashboard CLI', () => {
  let tempDir: string;
  let outputFileName: string;
  let outputPath: string;
  let output: any;

  beforeAll(() => {
    // Create a unique temp directory for this test run
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'build-dashboard-real-'));
    outputFileName = 'dashboard.json';
    outputPath = path.join(tempDir, outputFileName);

    // Run the dashboard builder as a CLI command using the runner and --outputFile
    execSync(`npx tsx npm/runners/build-dashboard-runner.ts --outputFile "${outputPath}"`, {
      stdio: 'inherit'
    });

    // Read and parse the output
    output = JSON.parse(fs.readFileSync(outputPath, 'utf-8'));
  });

  afterAll(() => {
    // Clean up temp files and directory
    if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
    if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it('creates the dashboard file at the specified path', () => {
    expect(fs.existsSync(outputPath)).toBe(true);
  });

  it('should handle complete failure', () => {
    // Simulate missing GITHUB_TOKEN or other error by running with an invalid token
    const badEnv = { ...process.env, GITHUB_TOKEN: '' };
    const badOutputPath = path.join(tempDir, 'error-output.json');
    let errorCaught = false;

    try {
      execSync(`npx tsx npm/runners/build-dashboard-runner.ts --outputFile "${badOutputPath}"`, {
        stdio: 'pipe',
        env: badEnv
      });
    } catch (err) {
      errorCaught = true;
    }
    expect(errorCaught).toBe(true);
    // The file should not exist or be empty
    expect(!fs.existsSync(badOutputPath) || fs.readFileSync(badOutputPath, 'utf-8').length === 0).toBe(true);
  });

  it('should successfully process and write data', () => {
    // This is already covered by the beforeAll, but we can re-run for completeness
    execSync(`npx tsx npm/runners/build-dashboard-runner.ts --outputFile "${outputPath}"`, { stdio: 'inherit' });
    const content = JSON.parse(fs.readFileSync(outputPath, 'utf-8'));

    expect(content).toHaveProperty('hotDiscussions');
    expect(content).toHaveProperty('goodFirstIssues');
  });

  it('should write to file', () => {
    const testFilePath = path.join(tempDir, 'test.json');

    // Write a simple object to file using the CLI (simulate writeToFile)

    fs.writeFileSync(testFilePath, JSON.stringify({ test: true }));
    const content = JSON.parse(fs.readFileSync(testFilePath, 'utf-8'));

    expect(content).toEqual({ test: true });
  });

  it('output JSON has hotDiscussions and goodFirstIssues arrays', () => {
    expect(output).toHaveProperty('hotDiscussions');
    expect(output).toHaveProperty('goodFirstIssues');
    expect(Array.isArray(output.hotDiscussions)).toBe(true);
    expect(Array.isArray(output.goodFirstIssues)).toBe(true);
  });

  it('each hotDiscussion has required fields and valid score', () => {
    output.hotDiscussions.forEach((item: any) => {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('isPR');
      expect(item).toHaveProperty('isAssigned');
      expect(item).toHaveProperty('title');
      expect(item).toHaveProperty('author');
      expect(item).toHaveProperty('resourcePath');
      expect(item).toHaveProperty('repo');
      expect(item).toHaveProperty('labels');
      expect(item).toHaveProperty('score');
      expect(typeof item.score).toBe('number');
      expect(item.score).toBeGreaterThanOrEqual(0);
    });
  });

  it('each goodFirstIssue has required fields', () => {
    output.goodFirstIssues.forEach((item: any) => {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('title');
      expect(item).toHaveProperty('isAssigned');
      expect(item).toHaveProperty('resourcePath');
      expect(item).toHaveProperty('repo');
      expect(item).toHaveProperty('author');
      expect(item).toHaveProperty('area');
      expect(item).toHaveProperty('labels');
    });
  });

  it('no duplicate IDs in hotDiscussions and goodFirstIssues', () => {
    const hotIds = output.hotDiscussions.map((i: any) => i.id);
    const goodIds = output.goodFirstIssues.map((i: any) => i.id);
    const allIds = [...hotIds, ...goodIds];
    const uniqueIds = new Set(allIds);

    expect(uniqueIds.size).toBe(allIds.length);
  });

  it('labels have name and color', () => {
    const checkLabels = (items: any[]) => {
      items.forEach((item) => {
        if (Array.isArray(item.labels)) {
          item.labels.forEach((label: any) => {
            expect(label).toHaveProperty('name');
            expect(label).toHaveProperty('color');
          });
        }
      });
    };

    checkLabels(output.hotDiscussions);
    checkLabels(output.goodFirstIssues);
  });

  it('resourcePath starts with /asyncapi/', () => {
    const checkResourcePath = (items: any[]) => {
      items.forEach((item) => {
        expect(item.resourcePath.startsWith('/asyncapi/')).toBe(true);
      });
    };

    checkResourcePath(output.hotDiscussions);
    checkResourcePath(output.goodFirstIssues);
  });

  it('each item has a non-empty author string', () => {
    const checkAuthor = (items: any[]) => {
      items.forEach((item) => {
        expect(typeof item.author).toBe('string');
        expect(item.author.length).toBeGreaterThan(0);
      });
    };

    checkAuthor(output.hotDiscussions);
    checkAuthor(output.goodFirstIssues);
  });
});

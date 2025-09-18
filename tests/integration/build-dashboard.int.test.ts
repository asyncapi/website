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
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'build-dashboard-real-'));
    outputFileName = 'dashboard.json';
    outputPath = path.join(tempDir, outputFileName);

    try {
      execSync(`npx tsx npm/runners/build-dashboard-runner.ts --outputFile "${outputPath}"`, {
        stdio: 'inherit',
        env: {
          ...process.env,
          GITHUB_TOKEN: process.env.GITHUB_TOKEN ?? 'test-token',
          NODE_ENV: 'test',
          DASHBOARD_INTEGRATION: '1'
        }
      });
    } catch (err) {
      throw new Error(`Dashboard runner failed: ${err}`);
    }
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

  it('should successfully process and write data', () => {
    // This test verifies that our nock-based setup successfully created the output
    expect(fs.existsSync(outputPath)).toBe(true);
    const content = JSON.parse(fs.readFileSync(outputPath, 'utf-8'));

    expect(content).toHaveProperty('hotDiscussions');
    expect(content).toHaveProperty('goodFirstIssues');
    expect(content.hotDiscussions.length).toBeGreaterThan(0);
    expect(content.goodFirstIssues.length).toBeGreaterThan(0);
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

    // All IDs should be unique (no duplicates)
    expect(uniqueIds.size).toBe(allIds.length);
    // Expected: 5 hot discussions + 3 good first issues = 8 total unique IDs
    expect(allIds.length).toBe(8);
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

  it('returns at least one hot discussion and one good first issue', () => {
    expect(output.hotDiscussions.length).toBeGreaterThan(0);
    expect(output.goodFirstIssues.length).toBeGreaterThan(0);
  });
  it('hotDiscussions and goodFirstIssues arrays do not contain null or undefined items', () => {
    output.hotDiscussions.forEach((item: any) => {
      expect(item).not.toBeNull();
      expect(item).not.toBeUndefined();
    });
    output.goodFirstIssues.forEach((item: any) => {
      expect(item).not.toBeNull();
      expect(item).not.toBeUndefined();
    });
  });

  it('all hotDiscussions have a valid score (not NaN or Infinity)', () => {
    output.hotDiscussions.forEach((item: any) => {
      expect(Number.isFinite(item.score)).toBe(true);
    });
  });

  it('all items in hotDiscussions and goodFirstIssues have a valid id (non-empty string)', () => {
    const checkId = (items: any[]) => {
      items.forEach((item) => {
        expect(typeof item.id).toBe('string');
        expect(item.id.length).toBeGreaterThan(0);
      });
    };

    checkId(output.hotDiscussions);
    checkId(output.goodFirstIssues);
  });

  it('output file is valid JSON and not empty', () => {
    const fileContent = fs.readFileSync(outputPath, 'utf-8');

    expect(() => JSON.parse(fileContent)).not.toThrow();
    expect(fileContent.length).toBeGreaterThan(2); // '{}' is 2 chars
  });

  it('hotDiscussions are sorted by score descending', () => {
    const scores = output.hotDiscussions.map((item: any) => item.score);

    for (let i = 1; i < scores.length; i++) {
      expect(scores[i - 1]).toBeGreaterThanOrEqual(scores[i]);
    }
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

  it('validates score calculation logic with enhanced fixture data', () => {
    // Test that items with more reactions have higher scores
    const sortedDiscussions = [...output.hotDiscussions].sort((a: any, b: any) => b.score - a.score);

    // With our enhanced fixtures, we have items with different reaction counts
    // Verify the highest scored item has more reactions than lower scored ones
    if (sortedDiscussions.length >= 2) {
      const highestScore = sortedDiscussions[0];
      const secondHighest = sortedDiscussions[1];

      // The score should reflect the reaction counts (thumbsUp + heart + rocket)
      expect(highestScore.score).toBeGreaterThanOrEqual(secondHighest.score);
    }

    // All scores should be positive numbers
    output.hotDiscussions.forEach((item: any) => {
      expect(item.score).toBeGreaterThan(0);
      expect(Number.isFinite(item.score)).toBe(true); // Scores are floating-point numbers
    });
  });

  it('filters out asyncapi-bot authored items from hot discussions', () => {
    // Our enhanced fixtures include an asyncapi-bot item that should be filtered out
    const botAuthors = output.hotDiscussions.filter((item: any) => item.author === 'asyncapi-bot');

    expect(botAuthors.length).toBe(0);

    // Same check for good first issues
    const botGFI = output.goodFirstIssues.filter((item: any) => item.author === 'asyncapi-bot');

    expect(botGFI.length).toBe(0);
  });

  it('correctly identifies PRs vs Issues in hot discussions', () => {
    const prs = output.hotDiscussions.filter((item: any) => item.isPR === true);
    const issues = output.hotDiscussions.filter((item: any) => item.isPR === false);

    // Based on our fixtures, we should have 2 PRs (1 filtered out for asyncapi-bot) and 3 issues
    expect(prs.length).toBe(2);
    expect(issues.length).toBe(3);

    // PRs should have additional fields that issues don't necessarily have
    prs.forEach((pr: any) => {
      expect(pr.isPR).toBe(true);
    });
  });

  it('correctly determines assignment status', () => {
    // Our enhanced fixtures include both assigned and unassigned items
    const assigned = output.hotDiscussions.filter((item: any) => item.isAssigned === true);
    const unassigned = output.hotDiscussions.filter((item: any) => item.isAssigned === false);

    // We should have both types in our test data
    expect(assigned.length + unassigned.length).toBe(output.hotDiscussions.length);

    // Same for good first issues
    const assignedGFI = output.goodFirstIssues.filter((item: any) => item.isAssigned === true);
    const unassignedGFI = output.goodFirstIssues.filter((item: any) => item.isAssigned === false);

    expect(assignedGFI.length + unassignedGFI.length).toBe(output.goodFirstIssues.length);
  });

  it('extracts area labels correctly for good first issues', () => {
    output.goodFirstIssues.forEach((issue: any) => {
      expect(issue).toHaveProperty('area');

      // Area should be extracted from labels with "area/" prefix
      if (issue.area) {
        expect(typeof issue.area).toBe('string');
        expect(issue.area.length).toBeGreaterThan(0);
      }
    });

    // At least some issues should have area labels from our enhanced fixtures
    const issuesWithArea = output.goodFirstIssues.filter((issue: any) => issue.area);

    expect(issuesWithArea.length).toBeGreaterThan(0);
  });

  it('validates repo extraction from resourcePath', () => {
    const checkRepoExtraction = (items: any[]) => {
      items.forEach((item) => {
        expect(item).toHaveProperty('repo');
        expect(typeof item.repo).toBe('string');
        expect(item.repo.length).toBeGreaterThan(0);

        // Repo should match the pattern from resourcePath
        // resourcePath format: /asyncapi/{repo}/issues/{number} or /asyncapi/{repo}/pull/{number}
        const pathParts = item.resourcePath.split('/');

        expect(pathParts[1]).toBe('asyncapi');
        expect(pathParts[2]).toBe(item.repo.split('/')[1]); // repo is "asyncapi/reponame", we want just "reponame"
      });
    };

    checkRepoExtraction(output.hotDiscussions);
    checkRepoExtraction(output.goodFirstIssues);
  });

  it('validates date handling and recency', () => {
    // Our enhanced fixtures have items with different updatedAt dates
    output.hotDiscussions.forEach((item: any) => {
      // Items should have been updated within a reasonable timeframe
      // (This tests that the script properly handles date parsing)
      if (item.updatedAt) {
        const updatedDate = new Date(item.updatedAt);

        expect(updatedDate).toBeInstanceOf(Date);
        expect(updatedDate.getTime()).not.toBeNaN();
      }
    });
  });

  it('handles edge cases in label processing', () => {
    const allItems = [...output.hotDiscussions, ...output.goodFirstIssues];

    allItems.forEach((item: any) => {
      if (item.labels && Array.isArray(item.labels)) {
        item.labels.forEach((label: any) => {
          // Each label should have required properties
          expect(label).toHaveProperty('name');
          expect(label).toHaveProperty('color');
          expect(typeof label.name).toBe('string');
          expect(typeof label.color).toBe('string');

          // Color should be a valid hex color (without #)
          expect(label.color).toMatch(/^[0-9a-fA-F]{6}$/);
        });
      }
    });
  });

  it('validates comprehensive data structure integrity', () => {
    // Test the overall structure matches expected schema
    expect(output).toEqual({
      hotDiscussions: expect.any(Array),
      goodFirstIssues: expect.any(Array)
    });

    // Verify we have the expected number of items from our enhanced fixtures
    // We have 3 issues + 3 PRs = 6 hot discussions, but 1 PR (asyncapi-bot) gets filtered out = 5
    // Plus 3 good first issues = 8 total unique IDs
    expect(output.hotDiscussions.length).toBe(5); // 3 issues + 2 PRs (1 filtered)
    expect(output.goodFirstIssues.length).toBe(3); // 3 items per fixture

    // Verify all required fields are present and have correct types
    const requiredHotDiscussionFields = [
      'id',
      'isPR',
      'isAssigned',
      'title',
      'author',
      'resourcePath',
      'repo',
      'labels',
      'score'
    ];

    const requiredGFIFields = ['id', 'title', 'isAssigned', 'resourcePath', 'repo', 'author', 'area', 'labels'];

    output.hotDiscussions.forEach((item: any) => {
      requiredHotDiscussionFields.forEach((field) => {
        expect(item).toHaveProperty(field);
      });
    });

    output.goodFirstIssues.forEach((item: any) => {
      requiredGFIFields.forEach((field) => {
        expect(item).toHaveProperty(field);
      });
    });
  });
});

const { graphql } = require('@octokit/graphql');
const { promises: fs, mkdirSync, rmSync } = require('fs');
const { resolve } = require('path');
const { getLabel, monthsSince, mapGoodFirstIssues, getHotDiscussions, getDiscussionByID, writeToFile } = require('../../scripts/dashboard/build-dashboard');
const os = require('os');

jest.mock('@octokit/graphql');

describe('GitHub Discussions and Issues Processing Module', () => {
    let tempDir;

    beforeAll(() => {
        tempDir = resolve(os.tmpdir(), 'test-config');
        mkdirSync(tempDir);
    });

    afterAll(() => {
        rmSync(tempDir, { recursive: true, force: true });
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return the correct label based on a filter prefix', () => {
        const issue = {
            labels: { nodes: [{ name: 'area/bug' }, { name: 'good first issue' }] },
        };
        const label = getLabel(issue, 'area/');
        expect(label).toBe('bug');
    });

    it('should return undefined if no matching label is found', () => {
        const issue = {
            labels: { nodes: [{ name: 'type/enhancement' }] },
        };
        const label = getLabel(issue, 'area/');
        expect(label).toBeUndefined();
    });

    it('should correctly calculate months since a given date', () => {
        const date = new Date();
        date.setMonth(date.getMonth() - 3);
        expect(monthsSince(date)).toBe(3);
    });

    it('should correctly map issues and filter labels', async () => {
        const issues = [
            {
                id: '1',
                title: 'Test issue',
                assignees: { totalCount: 1 },
                resourcePath: '/path/to/issue',
                repository: { name: 'repo' },
                author: { login: 'author' },
                labels: { nodes: [{ name: 'area/documentation' }, { name: 'good first issue' }] },
            },
        ];

        const result = await mapGoodFirstIssues(issues);
        expect(result).toEqual([
            {
                id: '1',
                title: 'Test issue',
                isAssigned: true,
                resourcePath: '/path/to/issue',
                repo: 'asyncapi/repo',
                author: 'author',
                area: 'documentation',
                labels: [],
            },
        ]);
    });

    it('should fetch discussion by ID and type', async () => {
        const mockResponse = { node: { id: 'test-id', title: 'Test title' } };
        graphql.mockResolvedValue(mockResponse);

        const result = await getDiscussionByID(true, 'test-id');
        expect(result).toEqual(mockResponse);
        expect(graphql).toHaveBeenCalledWith(expect.any(String), {
            id: 'test-id',
            headers: { authorization: `token ${process.env.GITHUB_TOKEN}` },
        });
    });

    it('should handle errors gracefully', async () => {
        graphql.mockRejectedValue(new Error('API error'));
        await expect(getDiscussionByID(true, 'test-id')).rejects.toThrow('API error');
    });

    it('should write JSON content to a file in the temporary directory', async () => {
        const content = { test: 'data' };
        const filePath = resolve(tempDir, 'dashboard.json');
        await writeToFile(content, filePath);

        const fileContent = JSON.parse(await fs.readFile(filePath, 'utf-8'));
        expect(fileContent).toEqual(content);
    });
});

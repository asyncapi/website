const { readFileSync, rmSync, mkdirSync, writeFileSync } = require('fs');
const { resolve } = require('path');
const { getData } = require('../scripts/tools/extract-tools-github');
const { convertTools } = require('../scripts/tools/tools-object');
const { combineTools } = require('../scripts/tools/combine-tools');
const { buildTools } = require('../scripts/build-tools');

jest.mock('../scripts/tools/extract-tools-github');
jest.mock('../scripts/tools/tools-object');
jest.mock('../scripts/tools/combine-tools');

describe('buildTools', () => {
    const testDir = resolve(__dirname, 'testCache');
    const toolsPath = resolve(testDir, 'tools.json');
    const tagsPath = resolve(testDir, 'all-tags.json');
    const automatedToolsPath = resolve(testDir, 'tools-automated.json');
    const manualToolsPath = resolve(testDir, 'tools-manual.json');

    beforeAll(() => {
        mkdirSync(testDir, { recursive: true });

        const tagsData = [
            { id: 1, name: 'tag1' },
            { id: 2, name: 'tag2' }
        ];
        writeFileSync(tagsPath, JSON.stringify(tagsData));

        const manualTools = [
            { id: 1, tool: 'manualTool1' },
            { id: 2, tool: 'manualTool2' }
        ];
        const mockConvertedData = [
            { id: 1, tool: 'tool1' },
            { id: 2, tool: 'tool2' }
        ];

        writeFileSync(automatedToolsPath, JSON.stringify(mockConvertedData));
        writeFileSync(manualToolsPath, JSON.stringify(manualTools));

        const initialToolsData = [
            {
                title: "API Tracker",
                description: "Explore public AsyncAPI specifications.",
            },
            {
                title: "AsyncAPI Server API",
                description: "Official tools for AsyncAPI.",
            },
            {
                title: "AsyncAPI Generator",
                description: "Generate AsyncAPI documents effortlessly.",
            },
        ];
        writeFileSync(toolsPath, JSON.stringify(initialToolsData));
    });

    afterAll(() => {
        rmSync(testDir, { recursive: true, force: true });
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should extract, convert, combine tools, and write to file', async () => {
        const mockExtractData = [{ name: 'tool1' }, { name: 'tool2' }];
        const mockConvertedData = [{ id: 1, tool: 'tool1' }, { id: 2, tool: 'tool2' }];

        getData.mockResolvedValue(mockExtractData);
        convertTools.mockResolvedValue(mockConvertedData);
        combineTools.mockResolvedValue(true);

        await buildTools(automatedToolsPath, manualToolsPath, toolsPath, tagsPath);

        const automatedToolsContent = readFileSync(automatedToolsPath, 'utf8');
        expect(JSON.parse(automatedToolsContent)).toEqual(mockConvertedData);

        const manualToolsData = JSON.parse(readFileSync(manualToolsPath, 'utf8'));
        const tagsData = JSON.parse(readFileSync(tagsPath, 'utf8'));
        expect(combineTools).toHaveBeenCalledWith(mockConvertedData, manualToolsData, toolsPath, tagsPath);

        const toolsContent = readFileSync(toolsPath, 'utf8');
        expect(toolsContent).toBeDefined();
        expect(tagsData).toBeDefined();
    });

    it('should handle getData error', async () => {
        getData.mockRejectedValue(new Error('Extract error'));

        try {
            await buildTools(automatedToolsPath, manualToolsPath, toolsPath, tagsPath);
        } catch (err) {
            expect(err.message).toContain('Extract error');
        }
    });

    it('should handle convertTools error', async () => {
        const mockExtractData = [{ name: 'tool1' }, { name: 'tool2' }];
        getData.mockResolvedValue(mockExtractData);
        convertTools.mockRejectedValue(new Error('Convert error'));

        try {
            await buildTools(automatedToolsPath, manualToolsPath, toolsPath, tagsPath);
        } catch (err) {
            expect(err.message).toContain('Convert error');
        }
    });

    it('should handle combineTools error', async () => {
        const mockExtractData = [{ name: 'tool1' }, { name: 'tool2' }];
        const mockConvertedData = [{ id: 1, tool: 'tool1' }, { id: 2, tool: 'tool2' }];

        getData.mockResolvedValue(mockExtractData);
        convertTools.mockResolvedValue(mockConvertedData);
        combineTools.mockRejectedValue(new Error('Combine Tools error'));

        try {
            await buildTools(automatedToolsPath, manualToolsPath, toolsPath, tagsPath);
        } catch (err) {
            expect(err.message).toContain('Combine Tools error');
        }
    });

    it('should handle file write errors', async () => {
        const mockExtractData = [{ name: 'tool1' }, { name: 'tool2' }];
        const mockConvertedData = [{ id: 1, tool: 'tool1' }, { id: 2, tool: 'tool2' }];

        getData.mockResolvedValue(mockExtractData);
        convertTools.mockResolvedValue(mockConvertedData);
        combineTools.mockResolvedValue(true);

        const invalidPath = '/invalid_dir/tools.json';

        try {
            await buildTools(invalidPath, manualToolsPath, toolsPath, tagsPath);
        } catch (err) {
            expect(err.message).toMatch(/ENOENT|EACCES/);
        }
    });
});

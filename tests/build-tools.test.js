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
    const testDir = resolve(__dirname, 'test_config');
    const toolsPath = resolve(testDir, 'tools.json');
    const tagsPath = resolve(testDir, 'all-tags.json');
    const automatedToolsPath = resolve(testDir, 'tools-automated.json');
    const manualToolsPath = resolve(testDir, 'tools-manual.json');

    beforeAll(() => {
        mkdirSync(testDir, { recursive: true });
        // Create a temporary tools-manual.json
        const manualTools = [
            { id: 1, tool: 'manualTool1' },
            { id: 2, tool: 'manualTool2' }
        ];
        writeFileSync(manualToolsPath, JSON.stringify(manualTools));
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

        await buildTools();

        // Check if the automated tools file is written
        const automatedToolsContent = readFileSync(automatedToolsPath, 'utf8');
        expect(JSON.parse(automatedToolsContent)).toEqual(mockConvertedData);

        // Check if combineTools is called with correct arguments
        expect(combineTools).toHaveBeenCalledWith(mockConvertedData, JSON.parse(readFileSync(manualToolsPath, 'utf8')), toolsPath, tagsPath);

        // Check if tools and tags files are written
        const toolsContent = readFileSync(toolsPath, 'utf8');
        const tagsContent = readFileSync(tagsPath, 'utf8');

        expect(toolsContent).toBeDefined();
        expect(tagsContent).toBeDefined();
    });

    it('should handle getData error', async () => {
        getData.mockRejectedValue(new Error('Extract error'));
    
        try {
            await buildTools();
        } catch (err) {
            expect(err.message).toContain('Extract error');
        }
    });
    
    it('should handle convertTools error', async () => {
        const mockExtractData = [{ name: 'tool1' }, { name: 'tool2' }];
        getData.mockResolvedValue(mockExtractData);
        convertTools.mockRejectedValue(new Error('Convert error'));
    
        try {
            await buildTools();
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
            await buildTools();
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
            await buildTools(invalidPath);
        } catch (err) {
            expect(err.message).toMatch(/ENOENT|EACCES/);
        }
    });
});

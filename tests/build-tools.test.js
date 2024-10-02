const axios = require('axios');
const { resolve } = require('path');
const { buildTools } = require('../scripts/build-tools');
const { tagsData, manualTools, mockConvertedData, initialToolsData, mockExtractData } = require('../tests/fixtures/buildToolsData');
const fs = require('fs');

jest.mock('axios');
jest.mock('../scripts/tools/categorylist', () => ({
    categoryList: [
        { name: 'Category1', description: 'Description for Category1' },
        { name: 'Category2', description: 'Description for Category2' }
    ]
}));


describe('buildTools', () => {
    const testDir = resolve(__dirname, 'test_config');
    const toolsPath = resolve(testDir, 'tools.json');
    const tagsPath = resolve(testDir, 'all-tags.json');
    const automatedToolsPath = resolve(testDir, 'tools-automated.json');
    const manualToolsPath = resolve(testDir, 'tools-manual.json');
    console.log(testDir, toolsPath, tagsPath, automatedToolsPath, manualToolsPath);

    beforeAll(() => {
        fs.mkdirSync(testDir, { recursive: true });
        fs.writeFileSync(manualToolsPath, JSON.stringify(manualTools));
    });

    afterAll(() => {
        fs.rmSync(testDir, { recursive: true, force: true });
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should extract, convert, combine tools, and write to file', async () => {
        axios.get.mockResolvedValue({ data: mockExtractData });

        await buildTools(automatedToolsPath, manualToolsPath, toolsPath, tagsPath);

        const automatedToolsContent = JSON.parse(fs.readFileSync(automatedToolsPath, 'utf8'));
        
        expect(Object.keys(automatedToolsContent)).toEqual(Object.keys(mockConvertedData));
        expect(automatedToolsContent["Category1"].description).toEqual(mockConvertedData["Category1"].description);
        expect(automatedToolsContent["Category2"].description).toEqual(mockConvertedData["Category2"].description);
    });

    it('should handle getData error', async () => {
        axios.get.mockRejectedValue(new Error('Extract error'));

        try {
            await buildTools(automatedToolsPath, manualToolsPath, toolsPath, tagsPath);
        } catch (err) {
            expect(err.message).toContain('Extract error');
        }
    });

    it('should handle convertTools error', async () => {
        axios.get.mockResolvedValue({ data: mockExtractData });
        jest.spyOn(require('../scripts/tools/tools-object'), 'convertTools').mockRejectedValue(new Error('Convert error'));

        try {
            await buildTools(automatedToolsPath, manualToolsPath, toolsPath, tagsPath);
        } catch (err) {
            expect(err.message).toContain('Convert error');
        }
    });

    it('should handle combineTools error', async () => {
        axios.get.mockResolvedValue({ data: mockExtractData });
        jest.spyOn(require('../scripts/tools/tools-object'), 'convertTools').mockResolvedValue(mockConvertedData);
        jest.spyOn(require('../scripts/tools/combine-tools'), 'combineTools').mockRejectedValue(new Error('Combine Tools error'));

        try {
            await buildTools(automatedToolsPath, manualToolsPath, toolsPath, tagsPath);
        } catch (err) {
            expect(err.message).toContain('Combine Tools error');
        }
    });

    it('should handle file write errors', async () => {
        axios.get.mockResolvedValue({ data: mockExtractData });
        jest.spyOn(require('../scripts/tools/tools-object'), 'convertTools').mockResolvedValue(mockConvertedData);
        jest.spyOn(require('../scripts/tools/combine-tools'), 'combineTools').mockResolvedValue(true);

        const invalidPath = '/invalid_dir/tools.json';

        try {
            await buildTools(invalidPath, manualToolsPath, toolsPath, tagsPath);
        } catch (err) {
            expect(err.message).toMatch(/ENOENT|EACCES/);
        }
    });
});

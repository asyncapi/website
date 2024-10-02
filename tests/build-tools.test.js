const axios = require('axios');
const { resolve } = require('path');
const { buildTools } = require('../scripts/build-tools');
const { tagsData, manualTools, mockConvertedData, mockExtractData } = require('../tests/fixtures/buildToolsData');
const fs = require('fs');

jest.mock('axios');
jest.mock('../scripts/tools/categorylist', () => ({
    categoryList: [
        { name: 'Category1', description: 'Description for Category1' },
        { name: 'Category2', description: 'Description for Category2' }
    ]
})); 

jest.mock('../scripts/tools/tags-color', () => ({
    languagesColor: [
        { name: 'JavaScript', color: 'bg-[#f1e05a]', borderColor: 'border-[#f1e05a]' },
        { name: 'Python', color: 'bg-[#3572A5]', borderColor: 'border-[#3572A5]' }
    ],
    technologiesColor: [
        { name: 'React', color: 'bg-[#61dafb]', borderColor: 'border-[#61dafb]' },
        { name: 'Node.js', color: 'bg-[#68a063]', borderColor: 'border-[#68a063]' }
    ]
}));

describe('buildTools', () => {
    const testDir = resolve(__dirname, 'test_config');
    const toolsPath = resolve(testDir, 'tools.json');
    const tagsPath = resolve(testDir, 'all-tags.json');
    const automatedToolsPath = resolve(testDir, 'tools-automated.json');
    const manualToolsPath = resolve(testDir, 'tools-manual.json');

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
        const combinedToolsContent = JSON.parse(fs.readFileSync(toolsPath, 'utf8'));
        const tagsContent = JSON.parse(fs.readFileSync(tagsPath, 'utf8'));

        expect(Object.keys(automatedToolsContent)).toEqual(Object.keys(mockConvertedData));
        expect(automatedToolsContent["Category1"].description).toEqual(mockConvertedData["Category1"].description);
        expect(automatedToolsContent["Category2"].description).toEqual(mockConvertedData["Category2"].description);

        expect(combinedToolsContent).toHaveProperty('Category1');
        expect(combinedToolsContent).toHaveProperty('Category2');
        expect(combinedToolsContent["Category1"].description).toEqual(mockConvertedData["Category1"].description);
        expect(combinedToolsContent["Category2"].description).toEqual(mockConvertedData["Category2"].description);

        expect(tagsContent).toEqual(tagsData);

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
        axios.get.mockResolvedValue({ data: { items: [{ name: '.invalid-tool' }] } });

        try {
            await buildTools(automatedToolsPath, manualToolsPath, toolsPath, tagsPath);
        } catch (err) {
            expect(err.message).toContain('Invalid .asyncapi-tool file.');
        }
    });

    it('should handle combineTools error', async () => {
        axios.get.mockResolvedValue({ data: mockExtractData });
        const invalidManualTools = [
            {
                title: "Invalid Tool",
                description: "Description for invalid tool",
                links: { repoUrl: "https://github.com/invalid/tool" },
                filters: { categories: ["InvalidCategory"], language: "UnknownLanguage", technology: ["UnknownTech"] }
            }
        ];
        fs.writeFileSync(manualToolsPath, JSON.stringify(invalidManualTools));

        try {
            await buildTools(automatedToolsPath, manualToolsPath, toolsPath, tagsPath);
        } catch (err) {
            expect(err.message).toContain('Invalid Invalid Tool .asyncapi-tool file.');
        }
    });

    it('should handle file write errors', async () => {
        axios.get.mockResolvedValue({ data: mockExtractData });

        const invalidPath = '/invalid_dir/tools.json';

        try {
            await buildTools(invalidPath, manualToolsPath, toolsPath, tagsPath);
        } catch (err) {
            expect(err.message).toMatch(/ENOENT|EACCES/);
        }
    });
});
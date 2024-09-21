const tagsData = [
    { id: 1, name: 'tag1' },
    { id: 2, name: 'tag2' },
];

const manualTools = [
    { id: 1, tool: 'manualTool1' },
    { id: 2, tool: 'manualTool2' },
];

const mockConvertedData = [
    { id: 1, tool: 'tool1' },
    { id: 2, tool: 'tool2' },
];

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

const mockExtractData = [{ name: 'tool1' }, { name: 'tool2' }];

module.exports = {
    tagsData,
    manualTools,
    mockConvertedData,
    initialToolsData,
    mockExtractData,
};

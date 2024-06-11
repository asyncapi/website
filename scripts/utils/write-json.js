const { promises: { readFile, writeFile } } = require('fs');
const { convertToJson } = require("../utils");

module.exports = async function writeJSON(readPath, writePath) {
    let readContent;
    let jsonContent;

    // Attempt to read the file
    try {
        readContent = await readFile(readPath, 'utf-8');
    } catch (error) {
        console.error(`Error reading file from path ${readPath}:`, error);
        throw error;
    }

    // Attempt to convert content to JSON
    try {
        jsonContent = convertToJson(readContent);
    } catch (error) {
        console.error('Error converting content to JSON:', error);
        throw error;
    }

    // Attempt to write the JSON content to file
    try {
        await writeFile(writePath, JSON.stringify(jsonContent));
    } catch (error) {
        console.error(`Error writing JSON to path ${writePath}:`, error);
        throw error;
    }
};

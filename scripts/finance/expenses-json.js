const fs = require('fs');
const yaml = require('yaml');
const path = require('path');
const { convertToJson } = require('../utils');

// Function to read YAML content from a file
function readYamlFromFile(filePath) {
    try {
        const yamlContent = fs.readFileSync(filePath, 'utf8');
        const parsedYaml = yaml.parse(yamlContent); // Parse YAML using the "yaml" package
        return parsedYaml;
    } catch (error) {
        console.error('Error reading YAML file:', error.message);
        return null;
    }
}

const ExpensesFilePath = path.join(__dirname, '../../config/finance/2023/Expenses.yml');
const ExpensesLinkFilePath = path.join(__dirname, '../../config/finance/2023/ExpensesLink.yml');

const ExpensesContent = readYamlFromFile(ExpensesFilePath);
const ExpensesLinkContent = readYamlFromFile(ExpensesLinkFilePath);

const Expenses = convertToJson(ExpensesContent);
const ExpensesLink = convertToJson(ExpensesLinkContent);

// Specify the output directory for the JSON files
const outputDirectory = path.join(__dirname, '../../config/finance/json-data/2023/');

// Create new JSON files in the specified output directory
function writeJson() {
    fs.writeFileSync(path.join(outputDirectory, 'Expenses.json'), JSON.stringify(Expenses, null, 2));
    fs.writeFileSync(path.join(outputDirectory, 'ExpensesLink.json'), JSON.stringify(ExpensesLink, null, 2));
}

module.exports = { writeJson }

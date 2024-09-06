const fs = require('fs').promises;
const path = require('path');

// Define the files to update
const filesToUpdate = [
    './index.js',
    '../../utils/getUniqueCategories.ts',
    '../../components/FinancialSummary/BarChartComponent.tsx'
];

// Get the current year
const currentYear = new Date().getFullYear().toString();

// Path where the year folder will be created
const financeDir = path.resolve(__dirname, 'finance', currentYear);

// Function to create a directory for the current year
const createYearDirectory = async () => {
    try {
        await fs.mkdir(financeDir, { recursive: true });
        console.log(`Created directory: ${financeDir}`);
    } catch (err) {
        console.error(`Error creating directory: ${err.message}`);
        throw err;
    }
};

// Function to update the year in specified files
const updateYearInFiles = async () => {
    try {
        for (const filePath of filesToUpdate) {
            const fullPath = path.resolve(__dirname, filePath);
            const fileContent = await fs.readFile(fullPath, 'utf8');

            // Replace old year
            const updatedContent = fileContent.replace(/\b\d{4}\b/g, currentYear);

            await fs.writeFile(fullPath, updatedContent, 'utf8');
            console.log(`Updated year in ${fullPath} to ${currentYear}`);
        }
    } catch (err) {
        console.error(`Error updating files: ${err.message}`);
        throw err;
    }
};

// Main function to execute the directory creation and file updates
const main = async () => {
    try {
        await createYearDirectory();
        await updateYearInFiles();
    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
};

main();
const fs = require("fs");
const path = require("path");
const { convertToJson } = require("./utils");

const inputFile = "config/tsc-members.yaml";
const outputFile = "config/tsc-members.json";

module.exports = async function buildTscMembers() {
  try {
    // Read YAML file
    const yamlData = await fs.promises.readFile(inputFile, "utf8");

    // Convert YAML to JSON
    const jsonData = convertToJson(yamlData);

    // Write JSON file
    const outputFileDir = path.dirname(outputFile);
    await fs.promises.mkdir(outputFileDir, { recursive: true });
    await fs.promises.writeFile(outputFile, JSON.stringify(jsonData, null, 2));

    console.log("TSC members list generated successfully.");
  } catch (error) {
    console.error("Error generating TSC members list:", error);
    throw error;
  }
};

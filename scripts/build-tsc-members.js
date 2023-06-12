const fs = require("fs");
const path = require("path");
const { convertToJson } = require("./utils");

const inputFile = "config/Maintainers.yaml";
const outputFile = "config/Maintainers.json";

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

    console.log("Maintainers list generated successfully.");
  } catch (error) {
    console.error("Error generating Maintainers list:", error);
    throw error;
  }
};

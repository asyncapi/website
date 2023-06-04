import { readFileSync, writeFileSync } from "fs";
import { load } from "js-yaml";

const inputFile = "../config/TSC_MEMBERS.yaml";
const outputFile = "../config/TSC_MEMBERS.json";

try {
  // Read YAML file
  const yamlData = readFileSync(inputFile, "utf8");

  // Parse YAML to JSON
  const jsonData = load(yamlData);

  // Write JSON file
  writeFileSync(outputFile, JSON.stringify(jsonData, null, 2));

  console.log("YAML to JSON conversion completed successfully.");
} catch (error) {
  console.error("Error converting YAML to JSON:", error);
}

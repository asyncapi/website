const fs = require("fs");
const { convertToJson } = require("./utils");

const inputFile = "config/Maintainers.yaml";
const outputFile = "config/Maintainers.json";

try {
  // Read YAML file
  const yamlData = fs.readFileSync(inputFile, "utf8");

  // Convert YAML to JSON
  const jsonData = convertToJson(yamlData);

  // Write JSON file
  fs.writeFileSync(outputFile, JSON.stringify(jsonData, null, 2));

  console.log("YAML to JSON conversion completed successfully.");
} catch (error) {
  console.error("Error converting YAML to JSON:", error);
}

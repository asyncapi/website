import fs from 'fs/promises';

/**
 * Reads a YAML file from the public directory and returns its content as a formatted string.
 *
 * @param {string} fileName - The name of the YAML file to read.
 * @returns {Promise<string>} The content of the YAML file formatted as a string with YAML syntax highlighting.
 * @throws {Error} If there is an error reading the file.
 */
export default async function readYamlFile(fileName: string) {
  try {
    const data = await fs.readFile(`./public/${fileName}`, 'utf-8');
    const yamlString = `\`\`\`yaml\n${data}\`\`\``;

    return yamlString;
  } catch (error: any) {
    throw new Error(`Error: something went wrong while reading ${fileName} file: ${error.message}`);
  }
}

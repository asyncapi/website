import yaml from 'yaml';
import winston from 'winston';
import { readFile, writeFile } from 'fs/promises';

const { combine, timestamp, printf, colorize, align } = winston.format;

/**
 * Converts a YAML or JSON string to a JSON object.
 * If the input is already a JSON object, it is returned as is.
 *
 * @param {unknown} contentYAMLorJSON - The content to be converted, either as a YAML/JSON string or a JSON object.
 * @returns {any} - The converted JSON object.
 * @throws {Error} - Throws an error if the content is neither valid JSON nor valid YAML.
 */
export function convertToJson(contentYAMLorJSON: unknown): any {
  // Axios handles conversion to JSON by default, if data returned from the server allows it
  // So if returned content is not a string (not YAML), we just return JSON back
  if (typeof contentYAMLorJSON !== 'string') {
    return contentYAMLorJSON;
  }

  // Check if the content is valid JSON before attempting to parse as YAML
  try {
    const jsonContent = JSON.parse(contentYAMLorJSON);

    return jsonContent;
  } catch (jsonError) {
    // If it's not valid JSON, try parsing it as YAML
    try {
      const yamlContent = yaml.parse(contentYAMLorJSON);

      return yamlContent;
    } catch (yamlError) {
      // If parsing as YAML also fails, throw an error
      throw new Error(`Invalid content format:\nJSON Parse Error: ${jsonError}\nYAML Parse Error: ${yamlError}`);
    }
  }
}

/**
 * Pauses execution for a specified number of milliseconds.
 * @param {number} ms - The number of milliseconds to pause.
 * @returns {Promise<void>}
 */
export async function pause(ms: number): Promise<void> {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
}

/**
 * Logger configuration
 */
export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    colorize({ level: true }),
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A'
    }),
    align(),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  transports: [new winston.transports.Console()]
});

/**
 * Reads a file, converts its content to JSON, and writes the JSON content to another file.
 */
export async function writeJSON(readPath: string, writePath: string) {
  try {
    const readContent = await readFile(readPath, 'utf-8');
    const jsonContent = convertToJson(readContent);
    await writeFile(writePath, JSON.stringify(jsonContent));
    return jsonContent;
  } catch (err: any) {
    // Better detection of error types
    if (err.code === 'ENOENT' || err.message.includes('read')) {
      throw new Error(`Error while reading file\nError: ${err}`);
    } else if (err.message.includes('write')) {
      throw new Error(`Error while writing file\nError: ${err}`);
    } else if (err.message.includes('Invalid content') ||
               err.message.includes('JSON') ||
               err.message.includes('YAML')) {
      throw new Error(`Error while conversion\nError: ${err}`);
    } else {
      throw new Error(`Error processing file: ${err}`);
    }
  }
}
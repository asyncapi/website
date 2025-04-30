import { access, constants, mkdir } from 'fs/promises';
import { resolve } from 'path';

import { writeJSON } from '../helpers/readAndWriteJson';

/**
 * Interface for the properties required to build the finance info list.
 */
interface BuildFinanceInfoListProps {
  currentDir: string;
  configDir: string;
  financeDir: string;
  year: string;
  jsonDataDir: string;
}

/**
 * Converts finance-related YAML configuration files to JSON format for a given year.
 *
 * Reads 'Expenses.yml' and 'ExpensesLink.yml' from the specified directory structure, verifies their existence, and writes their contents as JSON files to the target output directory.
 *
 * @param props - Contains directory paths and the year used to locate the YAML files and determine the output location.
 *
 * @throws {Error} If either YAML file does not exist or if an error occurs during directory creation or file conversion.
 */
export async function buildFinanceInfoList({
  currentDir,
  configDir,
  financeDir,
  year,
  jsonDataDir
}: BuildFinanceInfoListProps): Promise<void> {
  try {
    const expensesPath = resolve(currentDir, configDir, financeDir, year, 'Expenses.yml');
    const expensesLinkPath = resolve(currentDir, configDir, financeDir, year, 'ExpensesLink.yml');

    // Check if the files exist
    await Promise.all([access(expensesPath, constants.F_OK), access(expensesLinkPath, constants.F_OK)]);

    // Ensure the directory exists before writing the files
    const jsonDirectory = resolve(currentDir, configDir, financeDir, jsonDataDir);

    await mkdir(jsonDirectory, { recursive: true });

    // Write Expenses and ExpensesLink to JSON files
    const expensesJsonPath = resolve(jsonDirectory, 'Expenses.json');

    await writeJSON(expensesPath, expensesJsonPath);

    const expensesLinkJsonPath = resolve(jsonDirectory, 'ExpensesLink.json');

    await writeJSON(expensesLinkPath, expensesLinkJsonPath);
  } catch (err) {
    throw new Error(`Error in buildFinanceInfoList: ${err}`);
  }
}

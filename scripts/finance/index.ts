import { mkdir } from 'fs/promises';
import { resolve } from 'path';

import { writeJSON } from '../utils/readAndWriteJson';

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
 * Builds the finance info list by reading YAML files and writing them as JSON files.
 *
 * @param {BuildFinanceInfoListProps} props - The properties required to build the finance info list.
 * @returns {Promise<void>} A promise that resolves when the finance info list has been built.
 * @throws {Error} Throws an error if there is an issue building the finance info list.
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

    // Ensure the directory exists before writing the files
    const jsonDirectory = resolve(currentDir, configDir, financeDir, jsonDataDir);

    await mkdir(jsonDirectory, { recursive: true });

    // Write Expenses and ExpensesLink to JSON files
    const expensesJsonPath = resolve(jsonDirectory, 'Expenses.json');

    await writeJSON(expensesPath, expensesJsonPath);

    const expensesLinkJsonPath = resolve(jsonDirectory, 'ExpensesLink.json');

    await writeJSON(expensesLinkPath, expensesLinkJsonPath);
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Error in buildFinanceInfoList: ${err.message}`);
    } else {
      throw new Error(`Error in buildFinanceInfoList: ${err}`);
    }
  }
}

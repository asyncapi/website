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
 * Builds the finance information list by converting YAML configuration files to JSON format.
 *
 * The function reads 'Expenses.yml' and 'ExpensesLink.yml' from a specified directory structure,
 * ensures the target directory exists, and writes the parsed content as JSON to 'Expenses.json'
 * and 'ExpensesLink.json'. If an error occurs during processing, it throws a new error with a descriptive message.
 *
 * @param props - An object containing configuration paths and the year used for locating the YAML files and determining the output directory.
 * @returns A promise that resolves when the finance information list has been successfully built.
 * @throws {Error} If an error occurs during the conversion or file writing process.
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

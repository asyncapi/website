import { resolve } from "path";
import fs from "fs";

import { buildFinanceInfoList } from "@/scripts/finance/index";


export async function runBuildFinanceInfoList() {
    const financeDir = resolve('.', 'config', 'finance');

    // loop through all the files finance in directory and find the latest year to build the finance info list
    const yearsList = fs
        .readdirSync(financeDir)
        // filter out any files that are not numbers
        .filter((file) => {
            return !Number.isNaN(parseFloat(file));
        })
        // sort the years in descending order
        .sort((a, b) => {
            return parseFloat(b) - parseFloat(a);
        });

    if (yearsList.length === 0) {
        throw new Error('No finance data found in the finance directory.');
    }
    const latestYear = yearsList[0];
    try {
        await buildFinanceInfoList({
            currentDir: '.',
            configDir: 'config',
            financeDir: 'finance',
            year: latestYear,
            jsonDataDir: 'json-data'
        });
    } catch (error) {
        throw new Error('Error building finance info list', { cause: error });
    }
}
/* eslint-disable no-empty-pattern */
import { test as base, expect } from '@playwright/test';
import fs from 'fs';
import { parse } from 'csv-parse/sync';

//schema/type of reg data fields
type RegData = {
    firstName: string,
    lastName: string,
    telephone: string,
    password: string,
    subscribeNewsletter: string
}

type csvFixture = {
    regData: RegData[];
};

export const dataTest = base.extend<csvFixture>({
    regData: async ({ }, use) => {
            const fileContent = fs.readFileSync('./data/register.csv', 'utf-8');
            const registrationData: RegData[] = parse(fileContent, {
                columns: true,
                skip_empty_lines: true
            });
        await use(registrationData);
    }
});

export { expect };
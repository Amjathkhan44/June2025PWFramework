import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
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

const fileContent = fs.readFileSync('./data/register.csv', 'utf-8');
const registrationData: RegData[] = parse(fileContent, {
    columns: true,
    skip_empty_lines: true
});


for (const user of registrationData) {
    test(`@register Verify user is able to register ${user.firstName}`, async ({ page, baseURL }) => {

        const loginPage = new LoginPage(page);
        await loginPage.goToLoginPage(baseURL);
        const registerPage: RegisterPage = await loginPage.navigateToRegisterPage();
        const isUserRegistered: boolean = await registerPage.registerUser(
            user.firstName, 
            user.lastName, 
            getRandomEmail(), 
            user.telephone, 
            user.password, 
            user.subscribeNewsletter);
        expect(isUserRegistered).toBeTruthy();
    });
}

function getRandomEmail() : string {
    const randomValue = Math.random().toString(36).substring(2, 9);
    return `auto_${randomValue}@nal.com`; 
}
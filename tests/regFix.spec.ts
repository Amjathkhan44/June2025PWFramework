// import test from '@playwright/test';
// import { dataTest, expect } from '../fixtures/dataFixture';

// function getRandomEmail() : string {
//     let randomValue = Math.random().toString(36).substring(2, 9);
//     return `auto_${randomValue}@nal.com`; 
// }

// test(`Register a user from CSV`, async ({regData, page, baseURL}) => {
    
//     for(const user of regData) {

//     }
// })




//Fixtures shouldn’t be used as data providers because they run per test and are not meant for handling multiple data sets such as CSV or any other test data.

//test(`Register`, async ({regData, page, baseURL}) => {})      =>   Here 'regData' is fixture

//test('login', async ({ homePage }) => {});                    =>   Here 'homePage' is fixture

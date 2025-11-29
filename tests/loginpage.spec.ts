// import { test, expect } from '@playwright/test';      //don’t need to import from @playwright/test because your custom fixture file already provides the extended test and expect
import { LoginPage } from '../pages/LoginPage';
import { test, expect } from '../fixtures/baseFixtures';

test('Verify valid login @login @sanity',
    {
       // tag: ['@login', '@sanity'],
        annotation: [
            { type: 'epic', description: 'EPIC 100 - Design login page for Open Cart App' },
            { type: 'feature', description: 'Login Page Feature' },
            { type: 'story', description: 'User story 50 - user can login to app' },
            { type: 'severity', description: 'Blocker' },
            { type: 'owner', description: 'Amjath khan' }
        ]
    }
    , async ({ homePage }) => {
    await expect(homePage.page).toHaveTitle('My Account');
});

test('Verify Invalid login', async ({ page, baseURL }) => {
        //AAA
        let loginPage = new LoginPage(page);
        await loginPage.goToLoginPage(baseURL);
        await loginPage.doLogin('abcdf@nal.com', 'test123456');
        const errorMesg = await loginPage.getInvalidLoginMessage();
        expect(errorMesg).toContain(' Warning: No match for E-Mail Address and/or Password.');
    });

//The custom fixture isn’t used in 2nd test because the fixture is designed only for a valid login, and an invalid login test needs a fresh page without auto-login.
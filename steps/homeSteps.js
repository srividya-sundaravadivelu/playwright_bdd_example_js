
import { expect } from '@playwright/test';
import { Given, When, Then } from '../fixtures/fixtures';

Given('The user is on the Home page', async ({ homePage }) => {
    await homePage.goto();
});

Then('The user should see nav heading {string}', async ({ homePage }, heading) => {
    const actualHeading = await homePage.getHeadingText();
    expect(actualHeading).toBe(heading);
});

Then('The user should see a navigation menu with links:', async ({ homePage }, dataTable) => {
    // Convert Cucumber DataTable to array
    const expectedLinks = dataTable.raw().flat();  // ["Home", " Try now", "Pricing", "Sign in"]
    const actualLinks = await homePage.getNavLinksText();
    expect(actualLinks).toEqual(expectedLinks);
});

Then('The user should see main heading {string}', async ({ homePage }, heading) => {
    const actualHeading = await homePage.getMainHeadingText();
    expect(actualHeading).toEqual(heading);
});

Then('The user should see buttons:', async ({ homePage }, dataTable) => {
    const expectedButtonsText = dataTable.raw().flat();  // [Try for free, For Medical Professionals, Start Medical Triage Assessment, View pricing plans]
    const actualButtonsText = await homePage.getActionButtonsText();
    expect(actualButtonsText).toEqual(expectedButtonsText);
});

Then('The user should be redirected to the Home page', async ({ homePage }) => {
    const normalizedUrl = await homePage.getNormalizedUrl();
    expect(normalizedUrl).toBe(process.env.APP_URL);
});

Then('The user should see a pop-up window prompting sign-in with a Google account', async ({ homePage }) => {
    const isVisible = await homePage.isSignInPopupVisible();
    expect(isVisible).toBe(true);
});

Then('The user should be redirected to the Subscription page', async ({ homePage }) => {
    expect(homePage.page).toHaveURL(process.env.APP_URL + 'subscription');
});

When('The user clicks {string}', async ({ homePage }, elementName) => {
    await homePage.clickElement(elementName);
});

Then('The user should be redirected to the Manan application page', async ({ homePage }) => {
    const normalizedUrl = await homePage.getNormalizedUrl();
    expect(normalizedUrl).toBe(process.env.APP_URL + 'app');
});




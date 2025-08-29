
import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { HomePage } from '../pages/homePage';


const { Given, When, Then } = createBdd();

let homePage;

Given('The user is on the Home page', async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
});

Then('The user should see nav heading {string}', async ({ page }, heading) => {
    homePage = new HomePage(page);
    const actualHeading = await homePage.getHeadingText();
    expect(actualHeading).toBe(heading);
});

Then('The user should see a navigation menu with links:', async ({ page }, dataTable) => {
    // Convert Cucumber DataTable to array
    const expectedLinks = dataTable.raw().flat();  // ["Home", " Try now", "Pricing", "Sign in"]
    const homePage = new HomePage(page);
    const actualLinks = await homePage.getNavLinksText();
    expect(actualLinks).toEqual(expectedLinks);
});

Then('The user should see main heading {string}', async ({ page }, heading) => {
    const homePage = new HomePage(page);
    const actualHeading = await homePage.getMainHeadingText();
    expect(actualHeading).toEqual(heading);
});

Then('The user should see buttons:', async ({ page }, dataTable) => {
    const expectedButtonsText = dataTable.raw().flat();  // [Try for free, For Medical Professionals, Start Medical Triage Assessment, View pricing plans]
    const homePage = new HomePage(page);
    const actualButtonsText = await homePage.getActionButtonsText();
    expect(actualButtonsText).toEqual(expectedButtonsText);
});

Then('The user should be redirected to the Home page', async ({ page }) => {
    expect(page).toHaveURL(process.env.APP_URL + '#');
});

Then('The user should see a pop-up window prompting sign-in with a Google account', async ({ page }) => {
    const homePage = new HomePage(page);
    const isVisible = await homePage.isSignInPopupVisible();
    expect(isVisible).toBe(true);
});

Then('The user should be redirected to the Subscription page', async ({ page }) => {
    expect(page).toHaveURL(process.env.APP_URL + 'subscription');
});

When('The user clicks {string}', async ({ page }, elementName) => {
    const homePage = new HomePage(page);
    await homePage.clickElement(elementName);
});

function normalizeUrl(url) {
  const parsed = new URL(url);
  return parsed.origin + parsed.pathname;
}


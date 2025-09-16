
import { Given, When, Then } from '../fixtures/fixtures';

Given('The user is on the Home page', async ({ homePage }) => {
    await homePage.goto();
});

Then('The user should see nav heading {string}', async ({ homePage }, heading) => {
    await homePage.expectHeading(heading);
});

Then('The user should see a navigation menu with links:', async ({ homePage }, dataTable) => {
    // Convert Cucumber DataTable to array
    const expectedLinks = dataTable.raw().flat();  // ["Home", " Try now", "Pricing", "Sign in"]    
    await homePage.expectNavLinks(expectedLinks);
});

Then('The user should see main heading {string}', async ({ homePage }, heading) => {
    await homePage.expectMainHeading(heading);
});

Then('The user should see buttons:', async ({ homePage }, dataTable) => {
    const expectedButtons = dataTable.raw().flat();  // [Try for free, For Medical Professionals, Start Medical Triage Assessment, View pricing plans]
    await homePage.expectActionButtons(expectedButtons);
});

Then('The user should be redirected to the Home page', async ({ homePage }) => {
    await homePage.expectHomePage();
});

Then('The user should see a pop-up window prompting sign-in with a Google account', async ({ homePage }) => {
    await homePage.expectSignInPopup();
});

Then('The user should be redirected to the Subscription page', async ({ homePage }) => {
    await homePage.expectSubscriptionPage();
});

When('The user clicks {string}', async ({ homePage }, elementName) => {
    await homePage.clickElement(elementName);
});

Then('The user should be redirected to the Manan application page', async ({ homePage }) => {
    await homePage.expectTriageAnalysisPage();
});




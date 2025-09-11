import { expect } from '@playwright/test';
import { Given, When, Then } from '../fixtures/fixtures';

Given('The user is on the patient triage analysis page', async ({ homePage }) => {
    homePage.goto();
    const triageAnalysisPage = await homePage.startTriageAssessment();
    await triageAnalysisPage.verifyLoaded();
});

When('The user fills form for {string}', async ({ triageAnalysisPage }, scenarioName) => {
    await triageAnalysisPage.fillForm(scenarioName);
});

Then('The user should see the expected result for {string}', async ({ triageAnalysisPage }, scenarioName) => {
    // Step: Then The user should see the expected result for "Complete Form"
    // From: features\triage-analysis.feature:8:5
    switch (scenarioName) {
        case 'Complete Form':
            await triageAnalysisPage.verifyTriageAssessmentFieldVisibility();
            break;
        case 'Missing Fields':
            await triageAnalysisPage.verifyMissingFieldsValidation();
            break;


    }

});
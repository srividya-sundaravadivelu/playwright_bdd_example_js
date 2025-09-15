import { Given, When, Then } from '../fixtures/fixtures';

Given('The user is on the patient triage analysis page', async ({ triageAnalysisPage }) => {
    await triageAnalysisPage.verifyLoaded();
});

When('The user fills form for {string}', async ({ triageAnalysisPage }, scenarioName) => {
    await triageAnalysisPage.fillForm(scenarioName);
});

Then('The user should see the expected result for {string}', async ({ triageAnalysisPage }, scenarioName) => {
    switch (scenarioName) {
        case 'Complete Form':
        case 'Complete Form - Manual':
            await triageAnalysisPage.expectAnalysisComplete();
            break;
        case 'Missing Fields':
            await triageAnalysisPage.expectMissingFieldsError();
            break;
    }
});


When('the user uploads blood report {string}', async ({ triageAnalysisPage }, fileName) => {
    await triageAnalysisPage.uploadBloodReport(fileName);
});

Then('the user should see the {string} notification', async ({ triageAnalysisPage }, outcome) => {
    switch (outcome) {
        case 'success':
            await triageAnalysisPage.expectUploadSuccess();
            break;
        case 'error':
            await triageAnalysisPage.expectUploadError();
            break;
    }
});



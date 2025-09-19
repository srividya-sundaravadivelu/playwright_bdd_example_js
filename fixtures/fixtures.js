import { test as base, createBdd } from 'playwright-bdd';
import { homePage } from '../pages/homePage';
import { triageAnalysisPage } from '../pages/triageAnalysisPage';
import path from 'path';
import { ensureLoggedIn } from '../utils/authHelper';
import PatientData from '../TestData/PatientData.json';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

export const test = base.extend({
  storageState: authFile,   // load saved session automatically    
  homePage: async ({ page }, use) => {
    await use(new homePage(page));
  },
  patientData: async ({}, use) => {
    // fixture to provide patient test data
    await use(PatientData);
  },
  triageAnalysisPage: async ({ page, patientData }, use) => {
    await ensureLoggedIn(page);     // ensure loggedin - this is in case the saved session expired or doesnt work as expected
    await use(new triageAnalysisPage(page,patientData));
  }
});

export const { Given, When, Then } = createBdd(test);
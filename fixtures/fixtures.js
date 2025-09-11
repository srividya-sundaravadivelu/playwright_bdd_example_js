import { test as base, createBdd } from 'playwright-bdd';
import { homePage } from '../pages/homePage';
import { triageAnalysisPage } from '../pages/triageAnalysisPage';

export const test = base.extend({
  homePage: async ({ page }, use) => {
    await use(new homePage(page));
  },
  triageAnalysisPage: async ({ page }, use) => {
    await use(new triageAnalysisPage(page));
  }
});

export const { Given, When, Then } = createBdd(test);
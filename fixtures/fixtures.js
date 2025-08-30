import { test as base, createBdd } from 'playwright-bdd';
import { homePage } from '../pages/homePage';  // adjust import path

export const test = base.extend({
  homePage: async ({ page }, use) => {
    await use(new homePage(page));
  }
  
});

export const { Given, When, Then } = createBdd(test);
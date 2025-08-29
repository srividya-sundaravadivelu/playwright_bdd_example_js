import { test as base, createBdd } from 'playwright-bdd';

export const test = base.extend({
  myFixture: async ({ page }, use) => {
    // ... define your fixture here
  }
});

export const { Given, When, Then } = createBdd(test);
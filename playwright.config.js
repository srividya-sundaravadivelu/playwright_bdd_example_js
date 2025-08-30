import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import 'dotenv/config';  // Automatically loads variables from .env

defineBddConfig({
  features: 'features/**/*.feature',
  steps: ['steps/**/*.js','fixtures/fixtures.js']
});

export default defineConfig({
  testDir: './.features-gen',
  use: {
    baseURL: process.env.APP_URL,   
  },
  reporter: 'html',
});

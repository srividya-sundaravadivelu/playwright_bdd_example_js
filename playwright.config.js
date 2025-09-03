import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import 'dotenv/config';  // Automatically loads variables from .env

defineBddConfig({
  features: 'features/**/*.feature',
  steps: ['steps/**/*.js', 'fixtures/fixtures.js']
});

export default defineConfig({
  projects: [
    // Setup project
    { name: 'setup', testDir: './auth', testMatch: /.*\.setup\.js/ },

    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Use prepared auth state.
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },

    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //     // Use prepared auth state.
    //     storageState: 'playwright/.auth/user.json',
    //   },
    //   dependencies: ['setup'],
    // },
  ],
  testDir: './.features-gen',
  use: {
    baseURL: process.env.APP_URL,
  },
  reporter: 'html',
});

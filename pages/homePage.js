import { expect } from '@playwright/test';
import { ensureLoggedIn } from '../utils/authHelper';

// @ts-check
export class homePage {
    /**
     * @param {import("playwright-core").Page} page
     */
    constructor(page) {
        this.page = page;
        this.heading = page.getByRole('link', { name: 'Manan' });
        this.navLinks = page.locator('nav > div.gap-4 > a, nav > div.gap-4 > button');
        this.mainHeading = page.getByRole('heading', { name: 'Transform Your Medical' });
        this.actionButtons = page.locator('button.inline-flex');
        this.signInPopup = page.getByRole('dialog', { name: 'Welcome to MANAN' });
    }

    // --- Actions ---
    async goto() {
        await this.page.goto('/');
    }

    async clickElement(elementName) {
        switch (elementName) {
            case 'Pricing':
                await this.page.getByText('Pricing', { exact: true }).click();
                break;
            case 'Home':
            case 'Try Now':
                await this.page.getByRole('link', { name: elementName }).click();
                break;
            case 'Sign In':
            case 'Try for free':
            case 'For Medical Professionals':
            case 'Start Medical Triage Assessment':
            case 'View Pricing Plans':
                await this.page.getByRole('button', { name: elementName }).click();
                break;
        }
    }

    // --- Assertions --- 
    async expectNavLinks(expectedLinks) {
        const actualLinks = await this.navLinks.allInnerTexts();
        expect(actualLinks).toEqual(expectedLinks);
    }

    async expectActionButtons(expectedActionButtons) {
        const actualActionButtons = await this.actionButtons.allInnerTexts();
        expect(actualActionButtons).toEqual(expectedActionButtons);
    }

    async expectSignInPopup() {
        await expect(this.signInPopup).toBeVisible();
    }

    async expectHomePage() {
        await expect(this.page).toHaveURL(new RegExp(`^${process.env.APP_URL}#?$`));
    }

    async expectSubscriptionPage() {
        await expect(this.page).toHaveURL(process.env.APP_URL + 'subscription');
    }

    async expectTriageAnalysisPage() {
        // Ensure user is logged in first
        await ensureLoggedIn(this.page);
        await expect(this.page).toHaveURL(
            new RegExp(`^${process.env.APP_URL}app#?$`),
            { timeout: 15000 }
        );
    }

    async expectMainHeading(expectedMainHeading) {
        await expect(this.mainHeading).toHaveText(expectedMainHeading);
    }

    async expectHeading(expectedHeading) {
        await expect(this.heading).toHaveText(expectedHeading);
    }
}


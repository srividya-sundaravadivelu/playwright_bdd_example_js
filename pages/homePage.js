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
        this.homeLink = page.getByRole('link', { name: 'Home' });
        this.tryNowLink = page.getByRole('link', { name: 'Try Now' });
        this.pricingLink = page.getByText('Pricing', { exact: true });
        this.signInButton = page.getByRole('button', { name: 'Sign In' });
        this.mainHeading = page.getByRole('heading', { name: 'Transform Your Medical' });
        this.tryForFreeButton = page.getByRole('button', { name: 'Try for free' });
        this.forMedicalProfessionalsButton = page.getByRole('button', { name: 'For Medical Professionals' });
        this.startMedicalTriageButton = page.getByRole('button', { name: 'Start Medical Triage' });
        this.viewPricingPlansButton = page.getByRole('button', { name: 'View Pricing Plans' });
        this.signInPopup = page.getByRole('dialog', { name: 'Welcome to MANAN' });
    }

    // --- Actions ---
    async goto() {
        await this.page.goto('/');
    }

    async clickElement(elementName) {
        switch (elementName) {
            case 'Pricing':
                await this.pricingLink.click();
                break;
            case 'Home':
                await this.homeLink.click();
                break;
            case 'Try Now':
                await this.tryNowLink.click();
                break;
            case 'Sign In':
                await this.signInButton.click();
                break;
            case 'Try for free':
                await this.tryForFreeButton.click();
                break;
            case 'For Medical Professionals':
                await this.forMedicalProfessionalsButton.click();
                break;
            case 'Start Medical Triage Assessment':
                await this.startMedicalTriageButton.click();
                break;
            case 'View Pricing Plans':
                await this.viewPricingPlansButton.click();
                break;
        }
    }

    // --- Assertions --- 
    async expectNavLinks(expectedLinks) {
        const homeText = await this.homeLink.innerText();
        const tryNowText = await this.tryNowLink.innerText();
        const pricingText = await this.pricingLink.innerText();
        const signInText = await this.signInButton.innerText();

        const actualLinks = [homeText, tryNowText, pricingText, signInText];
        expect(actualLinks).toEqual(expectedLinks);
    }

    async expectActionButtons(expectedActionButtons) {
        const tryForFreeText = await this.tryForFreeButton.innerText();
        const forMedicalProfessionalsText = await this.forMedicalProfessionalsButton.innerText();
        const startMedicalTriageText = await this.startMedicalTriageButton.innerText();
        const viewPricingPlansText = await this.viewPricingPlansButton.innerText();

        const actualActionButtons = [tryForFreeText, forMedicalProfessionalsText, startMedicalTriageText, viewPricingPlansText];
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


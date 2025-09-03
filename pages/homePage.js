// @ts-check
export class homePage {
    /**
     * @param {import("playwright-core").Page} page
     */
    constructor(page) {
        this.page = page;
        this.heading = page.locator('nav h1');
        this.navLinks = page.locator('nav > div.gap-4 > a, nav > div.gap-4 > button');
        this.mainHeading = page.getByRole('heading', { name: 'Transform Your Medical' });
        this.actionButtons = page.locator('button.inline-flex');
        this.signInPopup = page.getByRole('dialog', { name: 'Welcome to MANAN' });
    }

    async goto() {
        await this.page.goto('/');
    }

    async getHeadingText() {
        return (await this.heading.innerText()).trim();
    }

    async getNavLinksText() {
        return await this.navLinks.allInnerTexts();
    }

    async getMainHeadingText() {
        return (await this.mainHeading.innerText()).trim();
    }

    async getActionButtonsText() {
        return await this.actionButtons.allInnerTexts();
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

    async getCurrentPageUrl() {
        return this.page.url();
    }

    async isSignInPopupVisible() {
        return await this.signInPopup.isVisible();
    }

    async getNormalizedUrl() {
        const currentUrl = this.page.url();
        return currentUrl.replace(/#$/, '');  // remove trailing #
    }
}


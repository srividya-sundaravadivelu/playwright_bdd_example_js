// @ts-check
import { expect } from '@playwright/test';
import PatientData from '../TestData/PatientData.json';
export class triageAnalysisPage {

    /**
     * @param {import("playwright-core").Page} page
     */
    constructor(page) {
        this.page = page;
        this.patientAgeField = page.getByRole('textbox', { name: 'Patient Age' });
        this.genderField = page.getByRole('combobox', { name: 'Gender at Birth' });
        this.chiefComplaintField = page.getByRole('textbox', { name: 'Chief Complaint' });
        this.detailedSymptomsField = page.getByRole('textbox', { name: 'Detailed Symptoms' });
        this.uploadButton = page.getByRole('button', { name: 'Upload Blood Report (5' });
        this.analyseCaseButton = page.getByRole('button', { name: 'Analyze Case' });
        this.uploadSuccessNotification = this.page.getByRole('status').filter({ hasText: 'Blood report values have been' }).first();
        this.vitalSignsField = page.getByRole('textbox', { name: 'Vital Signs & Lab Values' });
        this.analyseSuccessNotification = this.page.getByRole('status').filter({ hasText: 'Analysis Complete' }).first();
        this.triageAssessmentField = page.getByText('TRIAGE ASSESSMENT Severity');


    }

    async verifyLoaded() {
        await this.page.waitForURL(process.env.APP_URL + 'app');

        // Assert that the page URL is exactly as expected
        await expect(this.page).toHaveURL(process.env.APP_URL + 'app');

    }

    async fillForm(scenarioName) {
        const formData = PatientData.Patients.find(d => d.Scenario === scenarioName);
        if (!formData) {
            throw new Error(`No data found for scenario: ${scenarioName}`);
        }
        await this.patientAgeField.fill(formData.Age);
        await this.genderField.click();
        const genderOption = this.page.getByLabel(formData.Gender, { exact: true }).getByText(formData.Gender);
        await genderOption.click();
        await this.chiefComplaintField.fill(formData.ChiefComplaint);
        await this.detailedSymptomsField.fill(formData.DetailedSymptoms);

        // upload vitals through pdf
        if (formData.BloodReport != "") {
            const [fileChooser] = await Promise.all([
                this.page.waitForEvent('filechooser'),
                this.uploadButton.click()
            ]);

            await fileChooser.setFiles(formData.BloodReport);
            await expect(this.uploadSuccessNotification).toBeVisible({ timeout: 120_000 });
            await expect(this.vitalSignsField).toHaveValue(/.+/, { timeout: 90_000 });
        }
        await this.analyseCaseButton.click();
    }

    async verifyTriageAssessmentFieldVisibility() {
         await expect(this.page.locator('.rounded-lg').first()).toBeVisible({ timeout: 30000 });
        await expect(this.analyseSuccessNotification).toBeVisible({ timeout: 120_000 });
        await expect(this.triageAssessmentField).toBeVisible({ timeout: 90_000 });
    }

    async verifyMissingFieldsValidation() {
        await expect(this.page.getByText('Patient age is required')).toBeVisible();
        //await expect(this.page.getByText('Gender is required')).toBeVisible();
        await expect(this.page.getByText('Chief complaint is required')).toBeVisible();
        await expect(this.page.getByText('Symptoms are required')).toBeVisible();
        //await expect(this.page.getByText('Vital signs are required')).toBeVisible();
    }

}

// @ts-check
import { expect } from '@playwright/test';
import PatientData from '../TestData/PatientData.json';
export class triageAnalysisPage {

    /**
     * @param {import("playwright-core").Page} page
     */
    constructor(page) {
        this.page = page;
        // locators - Input Fields
        this.patientAgeField = page.getByRole('textbox', { name: 'Patient Age' });
        this.genderField = page.getByRole('combobox', { name: 'Gender at Birth' });
        this.chiefComplaintField = page.getByRole('textbox', { name: 'Chief Complaint' });
        this.detailedSymptomsField = page.getByRole('textbox', { name: 'Detailed Symptoms' });
        this.vitalSignsField = page.getByRole('textbox', { name: 'Vital Signs & Lab Values' });

        // locators - buttons
        this.uploadButton = page.getByRole('button', { name: 'Upload Blood Report (5' });
        this.analyseCaseButton = page.getByRole('button', { name: 'Analyze Case' });

        // locators - required field validators
        this.patientAgeRequiredField = page.getByText('Patient age is required');
        this.chiefComplaintRequiredField = page.getByText('Chief complaint is required');
        this.symptomsRequiredField = page.getByText('Symptoms are required');
        this.vitalsRequiredField = page.getByText('Vital signs are required');

        // locators - notifications
        this.uploadSuccessNotification = this.page.getByRole('status').filter({ hasText: 'Blood report values have been' }).first();
        this.uploadErrorNotification = this.page.getByRole('status').filter({ hasText: 'Failed to parse blood report' }).first();
        this.analyseSuccessNotification = this.page.getByRole('status').filter({ hasText: 'Analysis Complete' }).first();

        this.triageAssessmentField = page.getByText('TRIAGE ASSESSMENT Severity');
    }

    // --- Actions ---
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
        await this.fillPatientDetails(formData);

        // upload vitals through pdf
        if (formData.BloodReport) {
            await this.uploadBloodReport(formData.BloodReport);
            await this.expectUploadSuccess();
        }
        else if (formData.VitalSignsAndLabValues) {
            await this.fillVitalSigns(formData.VitalSignsAndLabValues);
        }
        await this.clickAnalyzeCase();
    }

    async fillPatientDetails(formData) {
        await this.patientAgeField.fill(formData.Age);
        await this.genderField.click();
        const genderOption = this.page.getByLabel(formData.Gender, { exact: true }).getByText(formData.Gender);
        await genderOption.click();
        await this.chiefComplaintField.fill(formData.ChiefComplaint);
        await this.detailedSymptomsField.fill(formData.DetailedSymptoms);
    }

    async uploadBloodReport(filePath) {
        const [fileChooser] = await Promise.all([
            this.page.waitForEvent('filechooser'),
            this.uploadButton.click()
        ]);
        await fileChooser.setFiles(filePath);
    }

    async fillVitalSigns(vitalSigns) {
        await this.vitalSignsField.fill(vitalSigns);
    }

    async clickAnalyzeCase() {
        await this.analyseCaseButton.click();
    }

    // --- Assertions ---
    async expectUploadSuccess() {
        await Promise.all([
            expect(this.uploadSuccessNotification).toBeVisible({ timeout: 120_000 }),
            expect(this.vitalSignsField).toHaveValue(/.+/, { timeout: 120_000 })
        ]);
    }

    async expectUploadError() {
        await expect(this.uploadErrorNotification).toBeVisible({ timeout: 90_000 });
    }

    async expectAnalysisComplete() {
        await Promise.all([
            expect(this.analyseSuccessNotification).toBeVisible({ timeout: 120_000 }),
            expect(this.triageAssessmentField).toBeVisible({ timeout: 120_000 })
        ]);
    }

    async expectMissingFieldsError() {
        await expect(this.patientAgeRequiredField).toBeVisible();
        //await expect(this.page.getByText('Gender is required')).toBeVisible();
        await expect(this.chiefComplaintRequiredField).toBeVisible();
        await expect(this.symptomsRequiredField).toBeVisible();
        await expect(this.vitalsRequiredField).toBeVisible();
    }

}

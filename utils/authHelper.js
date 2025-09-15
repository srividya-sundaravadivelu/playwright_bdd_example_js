import path from 'path';
const authFile = path.join(__dirname, '../playwright/.auth/user.json');

export async function ensureLoggedIn(page) {
    await page.goto(process.env.APP_URL);
    await page.getByRole('button', { name: 'Start Medical Triage Assessment' }).click();
    // If the sign-in popup appears, perform login again
    const signInVisible = await page
        .getByRole('dialog', { name: 'Welcome to MANAN' })
        .isVisible({ timeout: 3000 })
        .catch(() => false);

    if (signInVisible) {
        console.log('⚠️ Session expired. Performing re-login...');
        await page.getByRole('textbox', { name: 'Username' }).fill(process.env.USER_NAME);
        await page.getByRole('textbox', { name: 'Password' }).fill(process.env.USER_PASSWORD);
        await page.getByRole('button', { name: 'Sign In' }).click();
        await page.waitForURL(process.env.APP_URL + 'app');
        // Save fresh session
        await page.context().storageState({ path: authFile });
    }
}

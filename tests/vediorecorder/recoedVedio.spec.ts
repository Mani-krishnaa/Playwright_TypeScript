import { test, expect } from "@playwright/test"


/**
 * This test performs the login action on the Demoblaze website and verifies
 * that the page title, URL, and the login functionality work as expected.
 * It also records the video of the test run based on the configuration set
 * at the project level (e.g., video recording on test failure).
 *
 * Project-Level Video Recording Configuration:
 * ---------------------------------------------
 * The video recording behavior is controlled through the `video` setting
 * in the `playwright.config.ts` file. By default, Playwright can be
 * configured to capture videos on test failure.
 *
 * Available options for the `video` setting:
 * - 'off':              No video will be recorded (default).
 * - 'on':               Record video for every test run.
 * - 'retain-on-failure': Record video only if the test fails.
 *
 * Example configuration in `playwright.config.ts`:
 *
 * export default defineConfig({
 *   use: {
 *     video: 'retain-on-failure',
 *   },
 * });
 */

test('Record Vedio', async ({ page }) => {

    await page.goto('https://www.demoblaze.com/index.html');
    const pageTitle = await page.title();
    console.log(pageTitle);
    await expect(page).toHaveTitle('STORE');
    await expect(page).toHaveURL('https://www.demoblaze.com/index.html');

    await page.click('id=login2')
    //provide username
    //await page.locator('id=loginusername').fill('admin')

    await page.fill('id=loginusername', 'Kishor',)

    await page.fill('id=loginpassword', 'test@123')

    await page.click("//button[text()='Log in']")
    // after login need to verify the prsence og logout text
    // const logoutlink = await page.locator("//a[text()='Log out']");
    // await expect(logoutlink).toBeVisible()

})
import { test, expect } from '@playwright/test';
import path from 'path';

/**
 * This test checks the title of the demo automation page.
 *
 * Project-Level Screenshot Configuration:
 * ---------------------------------------
 * You can configure Playwright to automatically capture screenshots after each test by setting the
 * `screenshot` option in the `playwright.config.ts` file.
 *
 * Available options for the `screenshot` setting:
 * - 'off':              Do not capture screenshots (default).
 * - 'on':               Capture a screenshot after every test.
 * - 'only-on-failure':  Capture a screenshot only if the test fails.
 * - 'on-first-failure': Capture a screenshot only on the first failure in the test file.
 *
 * Example configuration in `playwright.config.ts`:
 *
 * export default defineConfig({
 *   use: {
 *     screenshot: 'only-on-failure',
 *   },
 * });
 */



test('has title', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle('Automation Testing Practice');
});

import { test, expect } from '@playwright/test';
import path from 'path';
/*


 📸 Playwright Screenshot Tests

 This test suite demonstrates:
 1. Regular page screenshot
 2. Full page screenshot
 3. Element-specific screenshot

 ✅ Tests Overview:

 - Page Screenshot:
    - Captures only the visible viewport.
    - Uses `page.screenshot()` with default settings.

 - Full Page Screenshot:
    - Captures the entire scrollable page.
    - Uses `page.screenshot({ fullPage: true })`.

 - Element Screenshot:
    - Targets a specific element using XPath.
    - Uses `locator.screenshot()`.

 📝 Notes:
 - Screenshots are saved in `tests/Screenshots/` with a dynamic timestamp in filenames.
 - Make sure the `Screenshots` folder exists and has proper write permissions.
   Example:
     mkdir -p tests/Screenshots
     chmod -R 755 tests/Screenshots
*/




test('Page Screenshot', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/', { timeout: 20000 });
    await page.screenshot({ path: 'tests/Screenshots' + Date.now() + 'Page.png' });
    // if we write like this it will take only pafe screen shot
});

test('Page Screenshot - Full Page', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    await page.screenshot({ path: 'tests/Screenshots' + Date.now() + 'Full Page.png', fullPage: true });
});

test('Element Screenshot', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    await page.locator("//div[@id='HTML1']").screenshot({ path: 'tests/Screenshots' + Date.now() + 'Element.png' })
});

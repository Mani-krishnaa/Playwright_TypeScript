import { test, expect } from "@playwright/test"
import { log } from "console";




test('Home Page', async ({ page }) => {   //here Home page is name for tet case
    await page.goto('https://www.demoblaze.com/index.html');
    const pageTitle = await page.title();
    console.log(pageTitle);
    await expect(page).toHaveTitle('STORE', { timeout: 5000 });
    await expect(page).toHaveURL('https://www.demoblaze.com/index.html');
    await page.close();


})
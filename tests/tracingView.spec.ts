import { test, expect } from "@playwright/test"
/*
In config file we can configure this one with tace property
*/
test('Trace viewer', async ({ page }) => {

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
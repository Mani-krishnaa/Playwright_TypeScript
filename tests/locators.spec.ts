import { test, expect } from "@playwright/test"



test("Locators", async ({ page }) => {
    await page.goto('https://www.demoblaze.com/index.html');
    const pageTitle = await page.title();
    console.log(pageTitle);
    await expect(page).toHaveTitle('STORE', { timeout: 5000 });
    await expect(page).toHaveURL('https://www.demoblaze.com/index.html');

    await page.click('id=login2')
    //provide username
    //await page.locator('id=loginusername').fill('admin')

    await page.fill('id=loginusername', 'admin',)

    await page.fill('id=loginpassword', 'admin')

    await page.click("//button[text()='Log in']")
    // after login need to verify the prsence og logout text
    const logoutlink = await page.locator("//a[text()='Log out']");
    await expect(logoutlink).toBeVisible()



    const Alinks = await page.$$("//h4[@class='card-title']//a")
    console.log("Total links are:" + Alinks.length)
    for (const links of Alinks) {
        console.log(await links.textContent()) // here textContent() means getTest
    }

    await page.waitForTimeout(10000)
    await page.close()
}


)
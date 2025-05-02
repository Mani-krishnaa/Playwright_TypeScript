import { test, expect } from "@playwright/test"

test("Input boxes", async ({ page }) => {

    await page.goto('https://demo.nopcommerce.com/register');
    //clicking an element
    await page.check("//input[@id='gender-male']")

    // 2 methods
    await expect(page.locator("//input[@id='gender-male']")).toBeChecked()



    await expect(page.locator("//input[@id='gender-male']").isChecked()).toBeTruthy()
    // await page.waitForTimeout(5000)

    await expect(await page.locator("//input[@id='gender-female']").isChecked()).toBeFalsy()



})
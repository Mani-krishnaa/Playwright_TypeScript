import { test, expect } from "@playwright/test"

test("Input boxes", async ({ page }) => {

    await page.goto('https://demo.nopcommerce.com/register');

    // await expect(await page.locator("//input[@id='small-searchterms']")).toBeEditable()
    await expect(page.locator("//input[@id='small-searchterms']")).toBeEnabled()
    await expect(page.locator("//input[@id='small-searchterms']")).toBeEditable()
    await expect(page.locator("//input[@id='small-searchterms']")).toBeEnabled()

    // await page.locator('//input[@placeholder="Search store"]').fill("MAni")
    await page.fill('//input[@placeholder="Search store"]', "Mani")

    // await page.waitForTimeout(50000)

})
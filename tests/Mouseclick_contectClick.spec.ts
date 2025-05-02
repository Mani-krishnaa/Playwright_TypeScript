import { test, expect } from "@playwright/test"





test("Mouse Right click", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/")

    //we can provide parametre as button and right or left
    await page.locator("//span[text()='right click me']").click({ button: 'right' })

    await page.waitForTimeout(5000)

})
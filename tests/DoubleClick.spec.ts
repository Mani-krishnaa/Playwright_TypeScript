import { test, expect } from "@playwright/test"





test("Mouse Double Click", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/")

    //direct method is available dbl click
    await page.locator("//button[text()='Copy Text']").dblclick()

    const textafterdblclicking = await page.locator("//input[@id='field2']")
    await expect(textafterdblclicking).toHaveValue('Hello World!')
    await page.waitForTimeout(5000)

})
import { test, expect } from "@playwright/test"





test("Mouse Hover", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/")

    await page.locator("//button[text()='Point Me']").hover()

    await page.waitForTimeout(5000)
})
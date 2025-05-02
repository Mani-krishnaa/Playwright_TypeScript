import { test, expect } from "@playwright/test"

test("Input boxes", async ({ page }) => {

    await page.goto('https://testautomationpractice.blogspot.com/');

    await page.check("//input[@id='monday']")


    await expect(page.locator("//input[@id='monday']")).toBeChecked()

    await expect(page.locator("//input[@id='monday']").isChecked()).toBeTruthy()


    const checkBoxes = [

        "//input[@id='tuesday']", "//input[@id='friday']", "//input[@id='tuesday']"


    ]
    //selecting checkboxes
    for (const checkbox of checkBoxes) {
        await page.locator(checkbox).check()
        await expect(page.locator(checkbox).isChecked()).toBeTruthy()
    }
    //selecting checkboxes
    for (const checkbox of checkBoxes) {
        if (await page.locator(checkbox).isChecked())
            await page.locator(checkbox).uncheck()
        await expect(page.locator(checkbox).isChecked()).toBeTruthy()
    }
    await page.waitForTimeout(5000)
})
import { test, expect } from "@playwright/test"

test("Upload Files", async ({ page }) => {

    await page.goto('https://testautomationpractice.blogspot.com/')

    await page.locator("//input[@id='singleFileInput']").setInputFiles("tests/Files/Cleartrip Flight E-Ticket .pdf")

    await page.locator("//input[@id='multipleFilesInput']").setInputFiles(["tests/Files/Cleartrip Flight E-Ticket .pdf", "tests/Files/Manikrishna_Ch.pdf"])
    await page.click("//button[text() ='Upload Multiple Files']")
    await page.waitForTimeout(5000)

    //Remove files
    await page.locator("//input[@id='multipleFilesInput']").setInputFiles([]) //here in we need to pass empty array
    await page.click("//button[text() ='Upload Multiple Files']")
    await page.waitForTimeout(5000)

})

test.skip('Multiple Files', async ({ page }) => {

})
import { test, expect } from "@playwright/test"


test("Auto suggestion dropdown", async ({ page }) => {
    await page.goto("https://www.redbus.in/")

    // await page.locator("//div[text()='From']").fill("Delhi")
    page.waitForSelector("//input[@id='src']")
    await page.fill("//input[@id='src']", "Delhi")
    await page.waitForSelector("//ul[@class='sc-dnqmqq dZhbJF']//li//text[1]")
    const suggestions = await page.$$("//ul[@class='sc-dnqmqq dZhbJF']//li")
    for (let suggestion of suggestions) {
        var text = await suggestion.textContent()
        console.log(text)
        if (text.includes('Dhaula Kuan Delhi')) {


            await suggestion.click()
            console.log(text)
            break;
        }
    }
    await page.waitForTimeout(5000)
})
import { test, expect } from "@playwright/test"

test('Handle Drop Down', async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/")

    //multiple ways to select drop down

    // await page.locator("#country").selectOption({ label: 'India' })
    // await page.locator("#country").selectOption('India')
    //await page.locator("#country").selectOption({ value: 'uk' })
    // await page.locator('#country').selectOption({ index: 6 })


    // await page.selectOption("#country", 'India')
    // multiple selcetion of dropdown
    await page.selectOption('#colors', ['Blue', 'Red', 'Yellow'])

    //Assetions on dropdown

    const option = await page.$$("//select[@id='country']//option")

    console.log(option.length)

    await expect(option.length).toBe(10)



    const content = await page.locator("//select[@id='country']").textContent()
    await expect(content?.includes('India')).toBeTruthy()


    await page.waitForTimeout(5000)

})
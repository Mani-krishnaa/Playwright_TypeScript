import { test, expect } from "@playwright/test"
const today = new Date()



test("Auto suggestion dropdown", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/")
    // There are some ways

    //1) await page.fill("//input[@id='datepicker']", "29/4/2025")


    /*
    2)
    
    */
    // const currentDate: string = today.getDate().toString(); // e.g., "28"
    // const currentMonth: string = today.toLocaleString('default', { month: 'long' }); // e.g., "April"
    // const currentYear: string = today.getFullYear().toString(); // e.g., "2025"
    // await page.click("//input[@id='datepicker']")
    // while (true) {
    //     const month = await page.locator("//span[@class='ui-datepicker-month']").textContent()
    //     const year = await page.locator("//span[@class='ui-datepicker-year']").textContent()
    //     // console.log(year, month)
    //     if (currentYear == year && currentMonth == month) {

    //         break;

    //     }
    //     await page.locator("//span[text()='Next']").click()
    // }
    // const alldates = await page.$$("//td[@data-handler='selectDay']/a")
    // for (const date of alldates) {
    //     if (await date.textContent() == currentDate) {
    //         await date.click()
    //         break
    //     }
    // }
    /*
    3)   
    */
    const currentDate = today.getDate(); // e.g., "28"
    await page.click("//input[@id='datepicker']")
    // await page.waitForSelector(`//a[contains(@class,'ui-state-default'][text()='${currentDate}']`)
    await page.click(`//a[contains(@class,'ui-state-default')][text()='${currentDate}']`)
    await page.waitForTimeout(5000)



})
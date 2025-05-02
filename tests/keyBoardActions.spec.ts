import { test, expect } from "@playwright/test"
import { it } from "node:test"





test("Keyboard actions", async ({ page }) => {
    await page.goto("https://gotranscript.com/text-compare")

    await page.locator("//textarea[@name='text1']").fill("HE_qaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")


    //here we need to type first and after neeed to predd ctrl + a and tab key for selecting next item and ctrl+ c to copy 

    //we have keyboard class in that we have press down and up with these we can perform
    await page.keyboard.press("Control+A")

    await page.keyboard.press("Control+C")



    await page.keyboard.press('Tab')
    // await page.keyboard.press('Tab')


    await page.keyboard.press("Control+V")

    await page.waitForTimeout(5000)


})
import { test, expect } from "@playwright/test"
import { it } from "node:test"





test("Drag & Drop", async ({ page }) => {
    await page.goto("http://www.dhtmlgoodies.com/scripts/drag-drop-custom/demo-drag-drop-3.html")

    const rome = page.locator("//div[@id='box6']")
    const italy = page.locator("//div[@id='box106']")

    //Approach 1 
    /*
    need to hoverover the Element and then we can drag and drop
    */
    // await rome.hover()
    // await page.mouse.down()

    // await italy.hover()
    // await page.mouse.up()


    /*
    Approach 2 , in single step we can do
    */
    await rome.dragTo(italy)

    await page.waitForTimeout(5000)




})
import { test, expect } from "@playwright/test"

test("Home Page Test", async ({ page }) => {
    await page.goto('https://www.demoblaze.com/index.html')

    await page.click("//a[@id='login2']")

    await page.fill("//input[@id='loginusername']", "Mani")


    await page.fill("//input[@id='loginpassword']", "efomfl")

    await page.click("//button[text()='Log in']")

    await page.waitForTimeout(5000)



})
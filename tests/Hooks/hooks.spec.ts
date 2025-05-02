import { test, expect } from "@playwright/test"

test("Home Page Test", async ({ page }) => {

    //Login

    await page.goto('https://www.demoblaze.com/index.html')

    await page.click("//a[@id='login2']")

    await page.fill("//input[@id='loginusername']", "Kishor")
    await page.fill("//input[@id='loginpassword']", "test@123")

    await page.click("//button[text()='Log in']")

    const links = await page.$$("//div[@class='card h-100']/a")

    await expect(links).toHaveLength(9)


    //Logout
    // const login = await page.locator("//a[@id='login2']").textContent()
    // await expect(login).toBe('Log in')

    await expect(page.locator("//a[@id='login2']")).toHaveText("Log in")


    await page.waitForTimeout(5000)



})


test.only("Add product", async ({ page }) => {

    //Login
    await page.goto('https://www.demoblaze.com/index.html')

    await page.click("//a[@id='login2']")

    await page.fill("//input[@id='loginusername']", "Kishor")
    await page.fill("//input[@id='loginpassword']", "test@123")

    await page.click("//button[text()='Log in']")

    const links = await page.$$("//div[@class='card h-100']/a")

    await expect(links).toHaveLength(9)
    //Add products to cart

    await page.click("//div[@id='tbodyid']//div[1]//div[1]//a[1]//img[1]")

    await page.click("//a[text()='Add to cart']")

    page.on('dialog', async dialog => {
        await expect(dialog.type()).toContain('alert')
        await expect(dialog.message()).toContain('Product added')
        await dialog.accept()

    })
    await page.waitForTimeout(5000)

    //Logout
    await page.click("//a[@id='logout2']")
    // const login = await page.locator("//a[@id='login2']").textContent()
    // await expect(login).toBe('Log in')

    await expect(page.locator("//a[@id='login2']")).toHaveText("Log in")




    await page.waitForTimeout(5000)



})
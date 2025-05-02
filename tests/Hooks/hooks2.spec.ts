import { test, expect } from "@playwright/test"
let page

//beforeAll and after each hooks willexcute only once
// we need to pass browser instead of page because for everytime. if i pass page it will create fixture for page. so will browser and with that i will take page and i will use that one in every test

test.beforeAll(async ({ browser }) => {
    //Login
    page = await browser.newPage()

    await page.goto('https://www.demoblaze.com/index.html')

    await page.click("//a[@id='login2']")

    await page.fill("//input[@id='loginusername']", "Kishor")
    await page.fill("//input[@id='loginpassword']", "test@123")

    await page.click("//button[text()='Log in']")
    const login = await page.locator("//a[@id='logout2']']").textContent()
    await expect(login).toBe('Log out')


    const links = await page.$$("//div[@class='card h-100']/a")
    links

    await expect(links).toHaveLength(9)

}
)

test.afterAll(async ({ }) => {
    await page.click("//a[@id='logout2']")
    // const login = await page.locator("//a[@id='login2']").textContent()
    // await expect(login).toBe('Log in')

    await expect(page.locator("//a[@id='login2']")).toHaveText("Log in")
})
test("Home Page Test", async ({ }) => {



    const links = await page.$$("//div[@class='card h-100']/a")

    await expect(links).toHaveLength(9)




})


test("Add product to card", async ({ }) => {

    //Add products to cart

    await page.click("//div[@id='tbodyid']//div[1]//div[1]//a[1]//img[1]")

    await page.click("//a[text()='Add to cart']")

    page.on('dialog', async dialog => {
        await expect(dialog.type()).toContain('alert')
        await expect(dialog.message()).toContain('Product added')
        await dialog.accept()

    })




})
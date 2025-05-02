import { test, expect } from "@playwright/test"




// By defalut playwright will handle all the alerts but if you want to do some validations we need to enable the dilaog box first before interacting

test("Auto suggestion dropdown", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/")
    //Enabling Dilaog window handler
    // first we need to enable the dialog window after that only we need to perform some actions
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert')
        expect(dialog.message()).toContain('I am an alert box!')
        await dialog.accept()

    })
    await page.click("//button[text()='Simple Alert']")
    await page.waitForTimeout(5000)

})

test("Confrmation alert with ok and cancel", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/")
    //Enabling Dilaog window handler
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('confirm')
        expect(dialog.message()).toContain('Press a button!')
        await dialog.accept() //close by using OK button
        // await dialog.dismiss() // close by using cancel

    })
    await page.click("//button[text()='Confirmation Alert']")
    await page.waitForTimeout(5000)

})
test("Promot dialg", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/")
    //Enabling Dilaog window handler
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('prompt')
        expect(dialog.message()).toContain('Please enter your name:')
        expect(dialog.defaultValue()).toContain('Harry Potter')// here we can validate the text prsent in the input box




        await dialog.accept() //close by using OK button and we can pass text also
        // await dialog.dismiss() // close by using cancel

    })
    await page.click("//button[text()='Prompt Alert']")
    await page.waitForTimeout(5000)

})
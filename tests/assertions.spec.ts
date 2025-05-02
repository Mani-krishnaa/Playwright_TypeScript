import { test, expect } from "@playwright/test"





test('test', async ({ page }) => {
    await page.locator('body').click();
    await page.goto('https://demo.nopcommerce.com/register');
    await expect(page.getByRole('link', { name: 'nopCommerce demo store' })).toBeVisible();
    await expect(page).toHaveURL("https://demo.nopcommerce.com/register")
    //Soft asssetions
    await expect.soft(page).toHaveTitle("nopCommerce demo store. Register")

    // await page.locator("//input[@id='small-searchterms']").isEnabled()
    const checkbox = page.locator('#gender-male')
    await checkbox.click()
    await expect(checkbox).toBeChecked()







});

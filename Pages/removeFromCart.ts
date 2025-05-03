import { test, Page, expect } from
    '@playwright/test'
export class RemoveItemFromCart {
    private page: Page
    shopingCartButtonTopNav: string
    prodNamein: string
    removeItemFromCartButton: string
    emptyCartMessage: string

    constructor(page) {
        this.page = page
        this.shopingCartButtonTopNav = "//span[normalize-space()='Shopping Cart']"
        this.prodNamein = "(//a[text()='Samsung Galaxy Tab 10.1'])[2]"
        this.removeItemFromCartButton = "//i[@class='fa fa-times-circle']"
        this.emptyCartMessage = "//div[@id='content']//p[contains(text(),'Your shopping cart is empty!')]"
    }

    async gotoCart() {
        this.page.click(this.shopingCartButtonTopNav)
    }

    async prodNameIncart() {
        return await this.page.locator(this.prodNamein).textContent()
    }
    async removeItemFromCart() {
        await this.page.click(this.removeItemFromCartButton)
    }
    async NoitemsMessageinCart() {
        await expect(await this.page.locator(this.emptyCartMessage).textContent()).toContain("Your shopping cart is empty!")
    }

}
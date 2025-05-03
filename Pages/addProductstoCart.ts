import { test, Page, expect } from "@playwright/test"

export class addProductToCart {

    private page: Page
    private tablets: string
    private addToCart: string
    private sucesssMessgae: string
    private productName: string

    constructor(page) {
        this.page = page
        this.tablets = "//ul[@class='nav navbar-nav']//a[contains(text(),'Tablets')]"
        this.addToCart = "//span[normalize-space()='Add to Cart']"
        this.productName = "//div[@class='caption']//a[contains(text(),'Samsung Galaxy Tab 10.1')]"
        this.sucesssMessgae = "//div[@class='alert alert-success alert-dismissible']"
    }

    async addTabToCart() {
        await this.page.click(this.tablets)
        await this.page.click(this.addToCart)
        await expect(await this.page.locator(this.sucesssMessgae).textContent()).toContain(" Success: You have added Samsung Galaxy Tab 10.1 to your shopping cart!")

    }
    async returnProdName() {
        return this.page.locator(this.productName).textContent()
    }
}
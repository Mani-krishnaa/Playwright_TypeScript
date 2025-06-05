import { addProductToCart, LoginPage, RemoveItemFromCart } from "../../Pages"
import { test as base } from "@playwright/test"
type myFixtures = {
    loginPage: LoginPage
    addcart: addProductToCart
    cartpage: RemoveItemFromCart
}

export const test = base.extend<myFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page))
    },
    addcart: async ({ page }, use) => {
        await use(new addProductToCart(page))
    },
    cartpage: async({page}, use) => {
        await use(new RemoveItemFromCart(page))
    }
})

export { expect } from "@playwright/test"
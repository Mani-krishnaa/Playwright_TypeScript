import { test, expect } from '@playwright/test';
/*

  retries: 1,
 or
  --retries=1

*/
import { RemoveItemFromCart, LoginPage, addProductToCart } from "../../Pages";
test("Retry Test Cases", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const addcart = new addProductToCart(page)
    const cartpage = new RemoveItemFromCart(page)

    await loginPage.gotoLoginPage()
    await loginPage.login('kishor@gmail.com', 'Kishor@7204')
    await addcart.addTabToCart()
    const prodname = await addcart.returnProdName()
    await cartpage.gotoCart()
    const prodNameInCart = await cartpage.prodNameIncart()
    await expect(prodname).toBe(prodNameInCart)


    await cartpage.removeItemFromCart()
    await cartpage.NoitemsMessageinCart()

})
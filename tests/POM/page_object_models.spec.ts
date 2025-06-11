import { test, expect } from './base';

test("POM", async ({ loginPage, addcart, cartpage }) => {


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
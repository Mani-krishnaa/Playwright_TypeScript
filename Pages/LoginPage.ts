import { Page, test, expect } from "@playwright/test";

export class LoginPage {
    private page: Page;
    private loginButton: string;
    private myaccount: string;
    private email: string;
    private password: string;
    private click: string;
    private MY_ACCOUNT: string;


    constructor(page) {

        this.page = page;
        this.myaccount = "//span[text()='My Account']"
        this.loginButton = "//a[text()='Login']"
        this.email = "#input-email"
        this.password = "#input-password"
        this.click = "//input[@value='Login']"
        this.MY_ACCOUNT = "//span[text()='My Account']"



    }

    async gotoLoginPage() {
        await this.page.goto('https://tutorialsninja.com/demo/index.php?route=common')
    }

    async login(username, password) {
        await this.page.click(this.myaccount)
        await this.page.click(this.loginButton)
        await this.page.fill(this.email, username)
        await this.page.fill(this.password, password)
        await this.page.click(this.click)
        await expect(this.page.locator(this.MY_ACCOUNT)).toContainText("My Account")
    }
}
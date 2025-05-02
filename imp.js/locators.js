

/*
Locating Elements in Playwright
Playwright provides a variety of locator strategies to locate elements on a webpage. The following are the locator strategies supported by Playwright:
property
css
xpath
------------------------------

we can select in 2 ways:
1) await page.locator(selector).click(): This method is used to click on an element that matches the given selector.
2) await page.click(selector): This method is used to click on an element that matches the given selector.


if it is input box then we can use fill() method to enter the data
await page.fill(selector, value): This method is used to enter the value in the input field that matches the given selector.


Locate multiple web elements
const elements = await page.$$(lacator): This method is used to locate multiple elements that match the given selector. It returns an array of ElementHandle instances.
----------------------------------------------------------------------------------------------------------------------

Built-in in Locators
-----------------------------
Locators are the central piece of Playwright's auto-waiting and retry-ability. In a nutshell, locators represent a way to find element(s) on the page at any moment.

Quick Guide​
These are the recommended built-in locators.

page.getByRole() to locate by explicit and implicit accessibility attributes.
page.getByText() to locate by text content.
page.getByLabel() to locate a form control by associated label's text.
page.getByPlaceholder() to locate an input by placeholder.
page.getByAltText() to locate an element, usually image, by its text alternative.
page.getByTitle() to locate an element by its title attribute.
page.getByTestId() to locate an element based on its data-testid attribute (other attributes can be configured).

*/

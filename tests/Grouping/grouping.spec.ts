import { test, expect } from "@playwright/test"
/*
We can use `test.describe` to group related tests together using an arrow function.

✅ If we want to run only one group, we can use `test.describe.only()`.
❌ If we want to skip a group, we can use `test.describe.skip()`.

This structure is useful for organizing tests and controlling which groups run during test execution.

Below is an example with `beforeEach` and `afterEach` hooks inside the group:
*/
let page
test.beforeAll(async ({ browser }) => {
    page = await browser.newPage()
    console.log('This is before all Hook');

})
test.afterAll(async () => {
    console.log('This is After all Hook');

})
test.beforeEach(async () => {
    console.log('This is beforeEach Hook');

})
test.afterEach(async () => {
    console.log('This is afterEach Hook');

})
test.describe.only('Gropu1', () => {


    test('Test1', async () => {
        console.log('This is test 1');
    })

    test('Test2', async () => {
        console.log('This is test 2');
    })
})

test.describe.skip("Group2", () => {

    test('Test3', async () => {
        console.log('This is test 3');

    })

    test('Test4', async () => {
        console.log('This is test 4');

    })
})

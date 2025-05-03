import { test, expect } from "@playwright/test"


test.skip('Annotations', async ({ page }) => {
    console.log('This test is marked with test.only, so only this test will run. And we can use only for multiple test also.');

})

test.skip('Skipped Test', async ({ page }) => {
    console.log('This test is marked with test.skip, so it will be skipped and not executed.');
});

test('Conditionally skipped test', async ({ page, browserName }) => {
    console.log('browserName:', browserName);

    if (browserName === 'firefox') {
        test.skip(true, 'Skipping this test on Firefox.');
        console.log('This test is conditionally skipped based on the broewser type.');
    } else if (browserName === 'chromium') {
        console.log('This test will run because the browser is Chrome.');
    }

});

/*
Fixme
This test is marked with test.fixme, so it will be skipped and not executed.
for ex;
test.fixme(({ browserName }) => browserName === 'webkit', 'Should figure out the issue');

test('to be fixed in Safari 1', async ({ page }) => {
  // ...
});
test('to be fixed in Safari 2', async ({ page }) => {
  // ...
});
*/
test('Fixme Test', async ({ page }) => {
    test.fixme(true, 'Here there are some issues in production regarding this test, so as of now we are skipping it.');

    console.log('This test is marked with test.fixme, so it will be skipped and not executed.');

})

//Fail

test('Fail Test', async ({ page }) => {
    test.fail(true, 'This test is marked with test.fail, so it will be skipped and not executed and it waill explicitly .');

    console.log('This test is marked with test.fail, so it will be skipped and not executed.');

})

test("Fail MY test if my browser is chrome", async ({ page, browserName }) => {
    test.fail(browserName === 'chromium', 'This test is marked with test.fail, so it will be skipped and not executed.');

    console.log('This test is marked with test.fail, so it will be skipped and not executed.');

})

//slow()
 test('Slow Test', async ({ page }) => {
    //it will triple the defalut time execution
    test.slow(true, 'This test is marked with test.slow, so it will be skipped and not executed.');

    console.log('This test is marked with test.slow, so it will be skipped and not executed.');
})
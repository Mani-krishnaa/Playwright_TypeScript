

/*
How to Create and Run Playwright Tests

npx playwright test    runs all test on all browsers in    headless mode
npx playwright test --headed    runs all test on all browsers in    headed mode
npx playwright test --project=firefox    runs all test on firefox in    headless mode
npx playwright test --project=firefox --headed    runs all test on firefox in    headed mode
npx playwright test --project=webkit    runs all test on webkit in    headless mode
npx playwright test --project=webkit --headed    runs all test on webkit in    headed mode
npx playwright test --project=chromium    runs all test on chromium in    headless mode
npx playwright test --project=chromium --headed    runs all test on chromium in    headed mode

npx playwright test tests/Homepagetest.spec.js    runs a specific test file
npx playwright test tests/Homepagetest.spec.js --headed    runs a specific test file in    headed mode
npx playwright test tests/Homepagetest.spec.js --project=firefox    runs a specific test file on firefox in    headless mode


npx playwright test tests/Homepagetest.spec.js --project=chromium  --headed --debug  runs a specific test file on chromium in    headed mode with debug mode enabled

npx playwright test tests/Homepagetest.spec.js --project=chromium  --ui runs a specific test file on chromium in    headed mode with UI enabled

*/
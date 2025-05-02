import { test, expect } from "@playwright/test"

/*
 * ============================
 * Playwright Tagging Example
 * ============================
 *
 * This file demonstrates how to use tagging in Playwright tests and filter them using CLI options.
 *
 * ✅ Tag Syntax:
 * - Tags must start with `@` and should be part of the test name.
 * - Tags can also be added using the `tag` property for better visibility in the HTML report.
 *
 * ✅ Running Specific Tagged Tests:
 * - Run only tests with a specific tag:
 *     npx playwright test tests/Tagging/tags.spec.ts --grep @sanity
 *
 * - Run tests with multiple tags (any matching tag will be included):
 *     npx playwright test tests/Tagging/tags.spec.ts --grep @reg --grep @sanity
 *
 * - Exclude tests with a specific tag:
 *     npx playwright test tests/Tagging/tags.spec.ts --grep @sanity --grep-invert @reg
 *
 * ✅ Report Visibility:
 * - If you use the `tag` property like `{ tag: '@smoke' }`, it appears in HTML reports and helps with searching.
 *
 * Note: Tags in test names and `tag` property do not need to match but using both helps in better organization and filtering.
 */

test('Test1@sanity', { tag: '@Mani' }, async () => {
    console.log('This is test 1');
})

test('Test2@sanity', async () => {
    console.log('This is test 2');
})
test('Test3@reg', async () => {
    console.log('This is test 3');

})

test('Test4@reg', async () => {
    console.log('This is test 4');

})
test('Test5@reg@sanity', async () => {
    console.log('This is test 5');

})
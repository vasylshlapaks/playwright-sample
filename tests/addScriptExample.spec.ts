import { test } from '../fixtures/baseFixture';

test.describe('Checking all functions on the CMD dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript({ path: './helpers/scripts/addScriptToTest.ts' });
  });

  test('Check that the script was added to page', async ({ page, webPage }) => {
      await webPage.waitForOpenPagesNumber(2);
  });
});

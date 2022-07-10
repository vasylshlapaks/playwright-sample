import { expect, test } from '@playwright/test';

test.describe.skip('Check using of storage state', () => {
  // Storage state can be dynamically created before test to avoid expiration
  test.use({storageState: './testData/storageState/loggedInState.json'});

  const storeUrl = 'https://www.demoblaze.com/index.html';

  test(`Check the ability to use storage state`, async ({ page }) => {
    const logoutButton = page.locator('#logout2');

    await page.goto(storeUrl);
    await expect(logoutButton).toBeVisible();
  });
});

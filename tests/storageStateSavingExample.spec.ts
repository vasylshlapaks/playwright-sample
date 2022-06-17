import { expect } from '@playwright/test';
import { test } from '../fixtures/baseFixture';

test.describe('Check connection of wallet', () => {
  test.use({storageState: './testData/storageState/loggedInState.json'});
  const magentoStoreUrl = 'https://magento2-b2b.magebit.com/customer/account/';

  test(`Check the ability to connect Metamask`, async ({ context }) => {
    const storePage = await context.newPage();
    const changePasswordButton = storePage.locator('[class="action change-password"]');

    await storePage.goto(magentoStoreUrl);
    await expect(changePasswordButton).toBeVisible();
  });
});

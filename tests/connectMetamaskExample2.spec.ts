import { expect } from '@playwright/test';
import { test } from '../fixtures/metamaskFixture';

test.describe('Check connection of wallet test', () => {
  test(`Check the ability to connect Metamask test`, async ({ page, connectWalletScreen, topNavigationBar }) => {
    await connectWalletScreen.connectMetaMask();

    await expect(topNavigationBar.farmingLink).toBeVisible();
  });
});

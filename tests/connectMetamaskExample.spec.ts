import { expect } from '@playwright/test';
import { test } from '../fixtures/metamaskFixture';

test.describe('Check connection of wallet', () => {
    test(`Check the ability to connect Metamask`, async ({ page, connectWalletScreen, topNavigationBar }) => {
      await connectWalletScreen.connectMetaMask();

      await expect(connectWalletScreen.connectedStatusButton).toBeVisible();
      await expect(topNavigationBar.farmingLink).toBeVisible();
    });
});

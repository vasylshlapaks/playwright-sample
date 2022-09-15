import { expect } from '@playwright/test';
import { test } from '../fixtures/metamaskFixture';

test.describe('Check connection of wallet', () => {
  test(`Check the ability to connect Metamask`, async ({ metamaskPage, connectWalletScreen, topNavigationBar }) => {
    await connectWalletScreen.connectMetaMask();
    await metamaskPage.changeNetworkTo('Kovan');

    await expect(topNavigationBar.farmingLink).toBeVisible();
  });
});

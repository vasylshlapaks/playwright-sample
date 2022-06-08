import { expect } from '@playwright/test';
import { test } from '../fixtures/metamaskFixture';

test.describe('Check connection of wallet', () => {
    test(`Check the ability to connect Metamask`, async ({ page, metamaskPage, connectWalletPage, webPage }) => {
      await connectWalletPage.connectMetaMask();

      await expect(connectWalletPage.connectedStatusButton).toBeVisible();
      await expect(connectWalletPage.passKycAsIndividualButton).toBeVisible();
    });
});

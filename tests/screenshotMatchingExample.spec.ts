import { test } from '../fixtures/metamaskFixture';

test.describe('Check UI matching of elements', () => {
  test(`Check snapshot of single element`, async ({ connectWalletScreen, webPage }) => {
    await connectWalletScreen.clickConnectWalletButton();

    await webPage.assertElementScreenshotMatchToSnapshot(connectWalletScreen.connectViaMetamaskButton);
  });

  test(`Check snapshot of full page`, async ({ page, connectWalletScreen, webPage }) => {
    await connectWalletScreen.clickConnectWalletButton();

    await webPage.assertPageScreenshotMatchToSnapshot(page);
  });
});

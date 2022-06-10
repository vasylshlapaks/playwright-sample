import { test } from '../fixtures/metamaskFixture';

test.describe('Check UI matching of elements', () => {
  test(`Check snapshot of single element`, async ({ page, connectWalletScreen, webPage }) => {
    await connectWalletScreen.connectWalletButton.click();

    await webPage.assertElementScreenshotMatchToSnapshot(connectWalletScreen.connectViaMetamaskButton);
  });

  test(`Check snapshot of full page`, async ({ page, connectWalletScreen, webPage }) => {
    await connectWalletScreen.connectWalletButton.click();

    await webPage.assertPageScreenshotMatchToSnapshot(page);
  });
});

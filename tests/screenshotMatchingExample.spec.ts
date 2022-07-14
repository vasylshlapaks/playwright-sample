import { test } from '../fixtures/metamaskFixture';

test.describe('Check UI matching of elements', () => {
  test(`Check snapshot of single element`, async ({ connectWalletScreen, webPage }) => {
    await connectWalletScreen.clickConnectWalletButton();

    await webPage.assertElementScreenshotMatchToSnapshot(connectWalletScreen.connectViaMetamaskButton);
  });

  test.only(`Check snapshot of full page`, async ({ page, webPage }) => {
    const sauceDemoUrl = 'https://www.saucedemo.com/';

    await page.goto(sauceDemoUrl);
    await webPage.assertPageScreenshotMatchToSnapshot(page);
  });
});

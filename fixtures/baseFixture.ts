import {test as base, chromium} from '@playwright/test';
import {ConnectWalletPage} from "../page-object/connectWalletPage";

type ixsFixtures = {
  connectWalletPage: ConnectWalletPage;
};

export const test = base.extend<ixsFixtures>({
  browser: async ({ browser }, use) => {
    const pathToExtension = require('path').join(__dirname, '..', 'extensions/metamaskFiles-master');
    const userDataDir = '';

    const browserContext = await chromium.launchPersistentContext(userDataDir,{
      recordVideo: { dir: 'test-results/videos/' },
      headless: false,
      args: [
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`
      ]
    });

    await Promise.all([
      browserContext.waitForEvent('page'),
    ]);

    await use(browserContext);
  },

  page: async ({ browser, baseURL }, use) => {
    const metamaskContextPage = await browser.newPage();

    await metamaskContextPage.goto(baseURL);
    await use(metamaskContextPage);
  },

  connectWalletPage: async ({ page }, use) => {
    await use(new ConnectWalletPage(page));
  }
});

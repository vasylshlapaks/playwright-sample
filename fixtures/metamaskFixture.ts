import {test as base, chromium} from '@playwright/test';
import {ConnectWalletScreen} from "../page-object/connectWalletScreen";
import {KycScreen} from "../page-object/kycScreen"
import {MetamaskPage} from "../page-object/metamaskPage";
import {WebPage} from "../page-object/webPage";

type ixsFixtures = {
  connectWalletScreen: ConnectWalletScreen;
  kycScreen: KycScreen;
  metamaskPage: MetamaskPage,
  webPage: WebPage
};

export const test = base.extend<ixsFixtures>({
  context: [async ({ browser }, use) => {
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
    await browser.close();
  }, { scope: 'test' }],

  // Overwriting of page for using it in the same browser with metamask
  page: async ({ context, baseURL }, use) => {
    const metamaskContextPage = await context.newPage();

    await metamaskContextPage.goto(baseURL);
    await use(metamaskContextPage);
  },

  metamaskPage: async ({ context }, use) => {
    const pageWithMetamask = await context.pages()[1];
    const metamaskPage = new MetamaskPage(pageWithMetamask);

    await metamaskPage.fullyLoginToMetamask(process.env.METAMASK_RECOVERY, process.env.METAMASK_PASSWORD);
    await use(metamaskPage);
  },

  connectWalletScreen: async ({ page, context }, use) => {
    await use(new ConnectWalletScreen(page, context));
  },

  webPage: async ({ page, context }, use) => {
    await use(new WebPage(page, context));
  },

  kycScreen: async ({ connectWalletScreen, metamaskPage, page }, use) => {
    await connectWalletScreen.connectMetaMask();
    await use(new KycScreen(page));
  },
});
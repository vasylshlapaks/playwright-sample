import {test as base} from '@playwright/test';
import {ConnectWalletScreen} from "../page-object/connectWalletScreen";
import {KycScreen} from "../page-object/kycScreen"
import {MetamaskPage} from "../page-object/metamaskPage";
import {WebPage} from "../page-object/webPage";
import {TopNavigationBar} from "../page-object/topNavigationBar";

type ixsFixtures = {
  connectWalletScreen: ConnectWalletScreen;
  kycScreen: KycScreen;
  metamaskPage: MetamaskPage;
  topNavigationBar: TopNavigationBar;
  webPage: WebPage;
};

export const test = base.extend<ixsFixtures>({
  page: async ({ page, baseURL }, use) => {
    await page.goto(baseURL);
    await use(page);
  },

  connectWalletScreen: async ({ page, context }, use) => {
    await use(new ConnectWalletScreen(page, context));
  },

  topNavigationBar: async ({ page, context }, use) => {
    await use(new TopNavigationBar(page, context));
  },

  webPage: async ({ page, context }, use) => {
    await use(new WebPage(page, context));
  },

  kycScreen: async ({ connectWalletScreen, page }, use) => {
    await use(new KycScreen(page));
  },
});

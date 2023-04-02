import {test as base} from '@playwright/test';
import {ConnectWalletScreen} from "../page-object/connectWalletScreen";
import {KycScreen} from "../page-object/kycScreen"
import {MetamaskPage} from "../page-object/actions/metamaskPage";
import {WebPage} from "../page-object/webPage";
import { GMAIL_USERS } from '../helpers/data/userData';
import {TopNavigationBar} from "../page-object/topNavigationBar";
import { GoogleSingIn } from '../page-object/GoogleSingIn';

type GmailAccount = {
  email: string;
  password?: string;
  recoveryEmail: string;
};

type ixsFixtures = {
  connectWalletScreen: ConnectWalletScreen;
  kycScreen: KycScreen;
  metamaskPage: MetamaskPage;
  topNavigationBar: TopNavigationBar;
  webPage: WebPage;
  gmailUser: GmailAccount;
  loggedInState: WebPage;

  googleLoginPage: GoogleSingIn;
};

export const test = base.extend<ixsFixtures>({
  storageState: ({ gmailUser }, use) => use(`setup/${gmailUser.email}.json`),

  page: async ({ page, baseURL }, use) => {
    await page.goto(baseURL);
    await use(page);
  },

  gmailUser: async ({}, use) => {
    // TEST_PARALLEL_INDEX represents worker number, parallel index that is between 0 and workers - 1
    const workerIndex = Number(process.env.TEST_PARALLEL_INDEX);

    const email = GMAIL_USERS[workerIndex].EMAIL;
    const password = GMAIL_USERS[workerIndex].PASSWORD;
    const recoveryEmail = GMAIL_USERS[workerIndex].RECOVERY_EMAIL;

    await use({ email, password, recoveryEmail });
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

  googleLoginPage: async ({ page, context }, use) => {
    await use(new GoogleSingIn(page, context));
  },

  loggedInState: async (
    { page, context, googleLoginPage, gmailUser },
    use
  ) => {
    await googleLoginPage.selectAccount(gmailUser.email);

    await use(new WebPage(page, context));
  },
});

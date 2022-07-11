import {WebPage} from "./webPage";
import {Locator, Page, BrowserContext, expect} from '@playwright/test';
import {MetamaskPage} from "./actions/metamaskPage";
import {timeouts} from "../helpers/timeouts";

export class ConnectWalletScreen extends WebPage {
  readonly connectWalletButton: Locator;
  readonly connectViaMetamaskButton: Locator;
  readonly connectViaMetamaskButtonSelector: string = '[id="connect-METAMASK"]';
  readonly metamaskPage: MetamaskPage;
  readonly connectedStatusButton: Locator;
  readonly helpPopUpButton: Locator;
  readonly loaderIcon: Locator;

  constructor(page: Page, context?: BrowserContext) {
    super(page, context);
    this.metamaskPage = new MetamaskPage(page, context);
    this.connectWalletButton = page.locator('button:text("Connect Wallet")');
    this.connectViaMetamaskButton = page.locator(this.connectViaMetamaskButtonSelector);
    this.connectedStatusButton = page.locator('[id="web3-status-connected"]');
    this.helpPopUpButton = page.locator('[data-testid="launcher"]');
    this.loaderIcon = page.locator('img[alt="Loading..."]')
  }

  async connectAndSignMetamask(openedMetamaskPage: Page) {
    await Promise.all([
      this.context.waitForEvent('page', {timeout: timeouts.shortTimeout})
        .then(async (page) => {
          console.log('then');

          const signPage = this.context.pages()[3];

          await this.metamaskPage.signMetamask(signPage);
        })
        .catch(async () => {
          console.log(this.context.pages().length);
          console.log('catch');

          const signPage = this.context.pages()[3];

          await this.metamaskPage.signMetamask(signPage);
        }),

      openedMetamaskPage.click(this.metamaskPage.metamaskElements.connectMetamaskPopUpButton),
    ]);

    let triesLeft = 5;

    do {
      await this.loaderIcon.waitFor({state: "detached", timeout: timeouts.shortTimeout});
      await this.page.waitForTimeout(5000);

      let pages = this.context.pages().length;

      if (pages > 3) {
        console.log(`try - ${triesLeft}`);

        const signPage = this.context.pages()[3];

        await this.metamaskPage.signMetamask(signPage);
      }
      triesLeft--
    } while (triesLeft);
  }

  async connectAndSignMetamaskOlding(openedMetamaskPage: Page) {
    await Promise.all([
      this.context.waitForEvent('page', {timeout: timeouts.shortTimeout})
        .then(async (page) => {
          console.log('then');

          const signPage = this.context.pages()[3];

          await this.metamaskPage.signMetamask(signPage);
        })
        .catch(async () => {
          console.log(this.context.pages().length);
          console.log('catch');

          const signPage = this.context.pages()[3];

          await this.metamaskPage.signMetamask(signPage);
        }),

      openedMetamaskPage.click(this.metamaskPage.metamaskElements.connectMetamaskPopUpButton),
    ]);


    await this.loaderIcon.waitFor({state: "detached", timeout: timeouts.shortTimeout});
    await this.page.waitForTimeout(3000);

    const pages = this.context.pages().length;

    if (pages > 3) {
      console.log('catch 2');

      const signPage = this.context.pages()[3];

      await this.metamaskPage.signMetamask(signPage);
    }
  }


  async connectAndSignMetamaskOld(openedMetamaskPage: Page) {
    await Promise.all([
      this.context.waitForEvent('page', {timeout: timeouts.shortTimeout})
        .then(async (page) => {
          console.log('then');

          await page.waitForTimeout(6000);
          await page.waitForLoadState();

          await this.metamaskPage.signMetamask(page);
        })
        .catch(async () => {
          await openedMetamaskPage.close();
          console.log('catch');
          const [signPage] = await Promise.all([
            this.context.waitForEvent('page', {timeout: timeouts.shortTimeout}),
            this.page.reload()
          ]);
          await signPage.waitForLoadState();

          await this.metamaskPage.signMetamask(signPage);
        }),

      openedMetamaskPage.click(this.metamaskPage.metamaskElements.connectMetamaskPopUpButton),
    ]);
  }

  async connectMetaMask() {
    await this.connectWalletButton.click();
    const metamaskPopUpPage = await this.openNewPageByClick(this.page, this.connectViaMetamaskButtonSelector);
    await metamaskPopUpPage.click(this.metamaskPage.metamaskElements.nextMetamaskPopUpButton);

  //  const signPage = await this.openNewPageByClick(metamaskPopUpPage, this.metamaskPage.metamaskElements.connectMetamaskPopUpButton);

    await this.connectAndSignMetamask(metamaskPopUpPage);

 //   await signPage.click(this.metamaskPage.metamaskElements.signMetamaskRequestPopUpButton);
    await expect(this.connectedStatusButton).toBeVisible();
  }
}
